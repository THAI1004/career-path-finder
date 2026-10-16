import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { once } from 'node:events';
import { createApp } from './app.ts';
import { Store } from './store.ts';
import { getQuestionsByConfig } from '../src/data/questionBank.ts';
import { publicCatalog, seedCatalog, subjectPlanFor } from './domain.ts';

async function fixture(run: (f:any)=>Promise<void>) {
  const directory=mkdtempSync(path.join(tmpdir(),'educareer-test-'));
  const store=new Store(path.join(directory,'store.json'));
  const server=createApp(store).listen(0,'127.0.0.1');
  await once(server,'listening');
  const address=server.address() as {port:number};
  const request=async(url:string,method='GET',body?:unknown,headers={})=>{
    const response=await fetch(`http://127.0.0.1:${address.port}${url}`,{method,headers:{'Content-Type':'application/json',...headers},body:body===undefined?undefined:JSON.stringify(body)});
    return {status:response.status,data:await response.json()};
  };
  const student=async(name='Sinh viên kiểm thử')=>(await request('/api/students','POST',{name,school:'THPT',className:'12A1',active:true})).data;
  const attempt=async(s:any,extra={})=>(await request('/api/attempts','POST',{studentId:s.id,initialMajorId:store.data.catalog.majors[0].id,mode:'INTEGRATED',tier:'short',...extra})).data;
  const write=async(key:string,method:string,row:any)=>request(`/api/admin/catalog/${key}${method==='POST'?'':`/${row.id}`}`,method,row,{'If-Match':String(store.data.revision)});
  try { await run({store,request,student,attempt,write}); }
  finally { server.closeAllConnections();await new Promise<void>(resolve=>server.close(()=>resolve()));rmSync(directory,{recursive:true,force:true}); }
}
test('no login endpoints or editable question collection; fixed bank supports all configurations',async()=>fixture(async({request,store})=>{
  assert.equal((await request('/api/catalog')).status,200);
  assert.equal((await request('/api/auth/login','POST',{})).status,404);
  for(const method of ['POST','PUT','DELETE'])assert.equal((await request(`/api/admin/catalog/questions${method==='POST'?'':'/1'}`,method,{id:1},{'If-Match':'1'})).status,404);
  assert.equal('questions' in store.data.catalog,false);
  for(const mode of ['INTEGRATED','DISC','HOLLAND'] as const)for(const tier of ['short','standard','deep'] as const)assert.equal(getQuestionsByConfig(mode,tier).length,tier==='short'?20:tier==='standard'?50:70);
}));
test('catalog CRUD joins real counseling data, deactivation cascades, references protect deletion',async()=>fixture(async({request,store,write})=>{
  const major={...store.data.catalog.majors[0],id:'major-test',code:'9999999',name:'Ngành thử nghiệm'};
  const job={...store.data.catalog.jobs[0],id:'job-test',name:'Nghề thử nghiệm'};
  const combination={id:'X01',name:'Tổ hợp thử nghiệm',subjects:['Toán','Vật lý','Tiếng Anh'],active:true};
  for(const [key,row] of [['majors',major],['jobs',job],['combinations',combination]])assert.equal((await write(key,'POST',row)).status,200);
  const output={id:'output-test',holland:'R',disc:'D',jobId:job.id,majorId:major.id,combinationIds:[combination.id],active:true};
  assert.equal((await write('outputs','POST',output)).status,200);
  const publicRows=(await request('/api/catalog')).data.careers;
  assert.equal(publicRows.find((r:any)=>r.id===output.id).jobTitle,job.name);
  assert.equal(publicRows.find((r:any)=>r.id===output.id).majorCode,major.code);
  assert.equal((await write('jobs','DELETE',job)).status,409);
  assert.equal((await write('jobs','PUT',{...job,active:false})).status,200);
  assert.equal((await request('/api/catalog')).data.careers.some((r:any)=>r.id===output.id),false);
  assert.equal((await write('jobs','PUT',{...job,name:'Nghề đã sửa'})).status,200);
  assert.equal((await request('/api/catalog')).data.careers.find((r:any)=>r.id===output.id).jobTitle,'Nghề đã sửa');
  for(const [key,row] of [['outputs',output],['jobs',job],['majors',major],['combinations',combination]])assert.equal((await write(key,'DELETE',row)).status,200);
}));
test('Holland and DISC edits persist; supported codes can be removed and recreated when unreferenced',async()=>fixture(async({store,write,request})=>{
  const holland=store.data.catalog.holland[0];
  assert.equal((await write('holland','PUT',{...holland,name:'R – Tên mới'})).status,200);
  assert.equal((await request('/api/catalog')).data.holland[0].name,'R – Tên mới');
  assert.equal((await write('holland','DELETE',holland)).status,409);
  const group=store.data.catalog.disc.find((g:any)=>g.id==='I');
  for(const output of store.data.catalog.outputs.filter((o:any)=>o.disc==='I'))assert.equal((await write('outputs','DELETE',output)).status,200);
  assert.equal((await write('disc','DELETE',group)).status,200);
  assert.equal((await write('disc','POST',group)).status,200);
  assert.equal((await write('disc','POST',{...group,id:'Z'})).status,400);
}));
test('validation and revision checks prevent bad links, duplicates and stale overwrites',async()=>fixture(async({store,write,request})=>{
  const job=store.data.catalog.jobs[0], revision=store.data.revision;
  assert.equal((await write('jobs','POST',job)).status,409);
  assert.equal((await write('outputs','POST',{...store.data.catalog.outputs[0],id:'bad',majorId:'missing'})).status,400);
  assert.equal(store.data.revision,revision);
  await write('jobs','PUT',{...job,name:'Đã sửa'});
  assert.equal((await request(`/api/admin/catalog/jobs/${job.id}`,'PUT',job,{'If-Match':String(revision)})).status,409);
  assert.equal(store.data.catalog.jobs[0].name,'Đã sửa');
  assert.equal((await request('/api/students','POST',null)).status,400);
}));
test('drafts resume with fixed questions; answer validation rejects forged choices',async()=>fixture(async({student,attempt,request,store})=>{
  const s=await student(),a=await attempt(s);
  assert.deepEqual(a.questions,getQuestionsByConfig('INTEGRATED','short'));
  assert.equal((await attempt(s)).id,a.id);
  const q=a.questions[0],answers={[q.id]:q.options[0].id};
  assert.equal((await request(`/api/attempts/${a.id}`,'PUT',{answers})).status,200);
  assert.deepEqual((await attempt(s)).answers,answers);
  assert.equal((await request(`/api/attempts/${a.id}`,'PUT',{answers:{[q.id]:'forged'}})).status,400);
  assert.equal(Object.keys(store.data.attempts[0].answers).length,1);
  assert.notEqual((await attempt(s,{fresh:true})).id,a.id);
}));
test('server calculates scores, rejects incomplete submissions and makes duplicate submission idempotent',async()=>fixture(async({student,attempt,request,store})=>{
  const s=await student(),a=await attempt(s);
  assert.equal((await request(`/api/attempts/${a.id}/submit`,'POST',{answers:{}})).status,400);
  const answers=Object.fromEntries(a.questions.map((q:any)=>[q.id,q.options[0].id]));
  const result=await request(`/api/attempts/${a.id}/submit`,'POST',{answers,discPercentages:{D:9999},userId:'forged'});
  assert.equal(result.status,201);assert.equal(result.data.userId,s.id);assert.notEqual(result.data.discPercentages.D,9999);
  const duplicate=await request(`/api/attempts/${a.id}/submit`,'POST',{answers});
  assert.equal(duplicate.data.id,result.data.id);assert.equal(store.data.results.length,1);
  assert.equal((await request(`/api/attempts/${a.id}`,'PUT',{answers:{}})).status,409);
}));
test('result review, major revision and persistence retain historical report snapshots',async()=>fixture(async({student,attempt,request,store,write})=>{
  const s=await student(),a=await attempt(s),answers=Object.fromEntries(a.questions.map((q:any)=>[q.id,q.options[0].id]));
  const {data:r}=await request(`/api/attempts/${a.id}/submit`,'POST',{answers});
  const update=await request(`/api/results/${r.id}`,'PUT',{notes:'Đã tư vấn',reviewed:true,finalMajorId:store.data.catalog.majors[1].id,primaryDisc:'X'});
  assert.equal(update.status,200);assert.equal(update.data.notes,'Đã tư vấn');assert.equal(update.data.primaryDisc,r.primaryDisc);
  assert.equal((await request(`/api/results/${r.id}`,'PUT',{notes:'Không lưu',finalMajorId:'missing'})).status,400);
  assert.equal(store.data.results[0].notes,'Đã tư vấn');
  await write('jobs','PUT',{...store.data.catalog.jobs[0],name:'Tên mới'});
  assert.deepEqual(store.data.results[0].recommendedCareers,r.recommendedCareers);
  const reopened=new Store(store.file);assert.equal(reopened.data.results[0].notes,'Đã tư vấn');assert.equal(reopened.data.attempts[0].status,'completed');
  assert.equal((await request(`/api/results?studentId=${s.id}`)).data.length,1);
  assert.equal((await request('/api/results?studentId=other')).data.length,0);
  assert.equal((await request(`/api/results/${r.id}`,'DELETE')).status,200);
  assert.equal((await request(`/api/attempts/${a.id}/submit`,'POST',{answers})).status,409);
}));
test('student administration retains referenced profiles and blocks attempts for inactive students',async()=>fixture(async({student,attempt,request})=>{
  const s=await student(),a=await attempt(s);
  assert.equal((await request(`/api/students/${s.id}`,'DELETE')).status,409);
  assert.equal((await request(`/api/students/${s.id}`,'PUT',{...s,name:'Đã sửa',active:false})).status,200);
  assert.equal((await request(`/api/students/${s.id}/profile`,'PUT',{...s,active:true})).status,409);
  assert.equal((await request('/api/attempts','POST',{studentId:s.id,initialMajorId:a.initialMajorId,mode:'DISC',tier:'short'})).status,400);
  assert.equal((await request(`/api/attempts/${a.id}`,'PUT',{answers:{}})).status,409);
  const unused=await student('Hồ sơ chưa làm bài');assert.equal((await request(`/api/students/${unused.id}`,'DELETE')).status,200);
}));
test('cross-origin writes are rejected without introducing login',async()=>fixture(async({request})=>{
  assert.equal((await request('/api/students','POST',{name:'A',school:'',className:'',active:true},{Origin:'https://other.example'})).status,403);
  assert.equal((await request('/api/students','POST',{name:'A',school:'',className:'',active:true})).status,201);
}));
test('new or modified admission combinations do not silently produce the unrelated A00 subject plan',()=>{
  const c=publicCatalog(seedCatalog(),1);
  c.combinations.push({id:'X01',name:'Mới',subjects:['Toán','Ngữ văn','Địa lý'],active:true});
  assert.equal(subjectPlanFor(['X01'],c),undefined);
  assert.equal(subjectPlanFor(['A01'],c)?.primaryCombination.startsWith('A01'),true);
  c.combinations.find(x=>x.id==='A01')!.subjects=['Toán','Ngữ văn','Địa lý'];
  assert.equal(subjectPlanFor(['A01'],c),undefined);
});
