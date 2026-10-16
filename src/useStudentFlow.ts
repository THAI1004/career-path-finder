import { useEffect, useRef, useState } from 'react';
import { api, useCareerData } from './platform.tsx';
import { getQuestionsByConfig } from './data/questionBank.ts';
import type { AssessmentMode, AssessmentTier, AssessmentStatus, CareerMatrixItem, EvaluationResult, TestAnswers, UniversityMajor } from './types/career.ts';
import type { Attempt, StoredResult, Student } from './types/platform.ts';

const profileKey = 'educareer_student_id';
function readProfileId() { try { return localStorage.getItem(profileKey) || ''; } catch { return ''; } }
const emptyMajor: UniversityMajor = {id:'',name:'',code:'',category:'',typicalHolland:'R',description:'',careerOutcomes:[]};
export function useStudentFlow() {
  const { UNIVERSITY_MAJORS_LIST, CAREER_MATRIX_DATA } = useCareerData();
  const [activeTab,setActiveTab]=useState<'counseling'|'matrix'|'history'|'guide'|'admin'>('counseling');
  const [selectedInitialMajor,setSelectedInitialMajor]=useState<UniversityMajor>(UNIVERSITY_MAJORS_LIST[0]||emptyMajor);
  const [selectedRevisedMajor,setSelectedRevisedMajor]=useState<UniversityMajor>(UNIVERSITY_MAJORS_LIST[0]||emptyMajor);
  const [studentId,setStudentId]=useState(readProfileId);
  const [studentName,setStudentName]=useState(''); const [school,setSchool]=useState(''); const [className,setClassName]=useState('');
  const [studentActive,setStudentActive]=useState(true);
  const [profileReady,setProfileReady]=useState(false);
  const [answers,setAnswers]=useState<TestAnswers>({});
  const [assessmentStatus,setAssessmentStatus]=useState<AssessmentStatus>('not_started');
  const [statusCheckFeedback,setStatusCheckFeedback]=useState<string|null>(null);
  const [evaluationResult,setEvaluationResult]=useState<EvaluationResult|null>(null);
  const [assessmentTier,setAssessmentTier]=useState<AssessmentTier>('short');
  const [assessmentMode,setAssessmentMode]=useState<AssessmentMode>('INTEGRATED');
  const [isTestModalOpen,setIsTestModalOpen]=useState(false);
  const [selectedCareerDetail,setSelectedCareerDetail]=useState<CareerMatrixItem|null>(null);
  const [printReportResult,setPrintReportResult]=useState<EvaluationResult|null>(null);
  const [history,setHistory]=useState<StoredResult[]>([]);
  const [attempt,setAttempt]=useState<Attempt|null>(null);
  const [error,setError]=useState(''); const [busy,setBusy]=useState(false); const [profileMessage,setProfileMessage]=useState('');
  const queue=useRef<Promise<unknown>>(Promise.resolve());
  const activeQuestions=attempt?.questions || getQuestionsByConfig(assessmentMode,assessmentTier);
  useEffect(()=>{
    let cancelled=false;
    api<Student[]>('/api/students').then(students=>{
      if(cancelled)return;
      const student=students.find(s=>s.id===readProfileId());
      if(student){setStudentId(student.id);setStudentName(student.name);setSchool(student.school);setClassName(student.className);setStudentActive(student.active);}
      else {setStudentId('');try{localStorage.removeItem(profileKey);}catch{}}
    }).catch(e=>{if(!cancelled)setError(e.message);}).finally(()=>{if(!cancelled)setProfileReady(true);});
    return()=>{cancelled=true;};
  },[]);
  useEffect(()=>{
    if(!studentId){setHistory([]);return;}
    let cancelled=false;
    api<StoredResult[]>(`/api/results?studentId=${encodeURIComponent(studentId)}`).then(data=>{if(!cancelled)setHistory(data);}).catch(e=>{if(!cancelled)setError(e.message);});
    return()=>{cancelled=true;};
  },[studentId,activeTab]);
  useEffect(()=>{
    if(evaluationResult)return;
    if(!UNIVERSITY_MAJORS_LIST.some(m=>m.id===selectedInitialMajor.id)) {setSelectedInitialMajor(UNIVERSITY_MAJORS_LIST[0]||emptyMajor);setAttempt(null);setAnswers({});setAssessmentStatus('not_started');}
    if(!UNIVERSITY_MAJORS_LIST.some(m=>m.id===selectedRevisedMajor.id))setSelectedRevisedMajor(UNIVERSITY_MAJORS_LIST[0]||emptyMajor);
  },[UNIVERSITY_MAJORS_LIST,evaluationResult]);
  const saveProfile=async()=>{
    if(!profileReady)throw new Error('Đang tải hồ sơ sinh viên.');
    if(!studentActive)throw new Error('Hồ sơ này đã ngừng hoạt động. Hãy liên hệ quản trị viên hoặc tạo hồ sơ khác.');
    const profile=await api<Student>(`/api/students${studentId?`/${studentId}/profile`:''}`,{method:studentId?'PUT':'POST',body:JSON.stringify({name:studentName,school,className,active:studentActive})});
    setStudentId(profile.id);setStudentName(profile.name);
    try{localStorage.setItem(profileKey,profile.id);}catch{}
    return profile;
  };
  const handleSaveProfile=async()=>{setBusy(true);setError('');setProfileMessage('');try{await saveProfile();setProfileMessage('Đã lưu thông tin sinh viên.');}catch(e){setError((e as Error).message);}finally{setBusy(false);}};
  const queueAnswers=(next:TestAnswers)=>{
    if(!attempt || attempt.status==='completed')return;
    const id=attempt.id;
    queue.current=queue.current.catch(()=>{}).then(()=>api(`/api/attempts/${id}`,{method:'PUT',body:JSON.stringify({answers:next})}));
    queue.current.catch(e=>setError(`Chưa lưu được tiến độ: ${e.message}`));
  };
  const loadAttempt=async(profileId:string,mode:AssessmentMode,tier:AssessmentTier,fresh=false)=>{
    await queue.current.catch(()=>{});
    const next=await api<Attempt>('/api/attempts',{method:'POST',body:JSON.stringify({studentId:profileId,initialMajorId:selectedInitialMajor.id,mode,tier,fresh})});
    setAttempt(next);setAnswers(next.answers);setAssessmentMode(next.mode);setAssessmentTier(next.tier);setAssessmentStatus(Object.keys(next.answers).length?'in_progress':'not_started');setEvaluationResult(null);setStatusCheckFeedback(null);
  };
  const handleOpenTest=async(fresh=false)=>{
    if(busy)return;
    setBusy(true);setError('');
    try{const profile=await saveProfile();await loadAttempt(profile.id,assessmentMode,assessmentTier,fresh);setIsTestModalOpen(true);}catch(e){setError((e as Error).message);}finally{setBusy(false);}
  };
  const changeConfig=async(mode:AssessmentMode,tier:AssessmentTier)=>{
    if(busy || !studentId)return;
    setBusy(true);setError('');try{await loadAttempt(studentId,mode,tier);}catch(e){setError((e as Error).message);}finally{setBusy(false);}
  };
  const handleSelectAnswer=(questionId:number,optionId:string)=>{
    if(busy)return;
    const next={...answers,[questionId]:optionId};setAnswers(next);setAssessmentStatus('in_progress');queueAnswers(next);
  };
  const handleQuickFillDemo=()=>{
    const next=Object.fromEntries(activeQuestions.map(q=>[q.id,q.options[0].id]));setAnswers(next);setAssessmentStatus('in_progress');queueAnswers(next);
  };
  const handleSubmitTest=async()=>{
    if(!attempt)throw new Error('Chưa mở bài test.');
    setBusy(true);setError('');
    try{
      await queue.current.catch(()=>{});
      const result=await api<StoredResult>(`/api/attempts/${attempt.id}/submit`,{method:'POST',body:JSON.stringify({answers})});
      setEvaluationResult(result);setAssessmentStatus('completed');setAttempt({...attempt,status:'completed'});setSelectedRevisedMajor(selectedInitialMajor);
      setHistory(prev=>[result,...prev.filter(r=>r.id!==result.id)]);setStatusCheckFeedback(`Đã hoàn thành. Holland ${result.primaryHolland} · DISC ${result.primaryDisc}. Xem báo cáo đánh giá bên dưới.`);
    }catch(e){setError((e as Error).message);throw e;}finally{setBusy(false);}
  };
  const handleCheckStatus=()=>{
    if(assessmentStatus==='completed'&&evaluationResult){setStatusCheckFeedback('Bài test đã hoàn thành. Kết quả đã được lưu vào hồ sơ sinh viên.');document.getElementById('evaluation-results-section')?.scrollIntoView({behavior:'smooth'});}
    else setStatusCheckFeedback(`Đã trả lời ${Object.keys(answers).length}/${activeQuestions.length} câu. Mở bài test để tiếp tục.`);
  };
  const handleSelectInitialMajor=(major:UniversityMajor)=>{if(busy)return;setSelectedInitialMajor(major);setSelectedRevisedMajor(major);setAttempt(null);setAnswers({});setAssessmentStatus('not_started');setEvaluationResult(null);setStatusCheckFeedback(null);};
  const handleSelectRevisedMajor=async(major:UniversityMajor)=>{
    if(!evaluationResult||busy)return;setBusy(true);setError('');try{
      const result=await api<StoredResult>(`/api/results/${evaluationResult.id}`,{method:'PUT',body:JSON.stringify({finalMajorId:major.id})});setSelectedRevisedMajor(major);setEvaluationResult(result);setHistory(prev=>prev.map(r=>r.id===result.id?result:r));
    }catch(e){setError((e as Error).message);}finally{setBusy(false);}
  };
  const handleResetTest=()=>{if(!busy&&window.confirm('Bắt đầu bài test mới? Bài làm trước vẫn được giữ trong hệ thống quản trị.'))handleOpenTest(true);};
  const handleDeleteHistoryItem=async(id:string)=>{if(busy||!window.confirm('Xóa kết quả này khỏi hệ thống?'))return;setBusy(true);setError('');try{await api(`/api/results/${id}`,{method:'DELETE'});setHistory(prev=>prev.filter(r=>r.id!==id));if(evaluationResult?.id===id){setEvaluationResult(null);setAssessmentStatus('not_started');}}catch(e){setError((e as Error).message);}finally{setBusy(false);}};
  const handleClearAllHistory=async()=>{
    if(busy||!window.confirm('Xóa tất cả kết quả của sinh viên hiện tại khỏi hệ thống?'))return;
    setBusy(true);setError('');try{for(const item of history)await api(`/api/results/${item.id}`,{method:'DELETE'});setHistory([]);setEvaluationResult(null);setAssessmentStatus('not_started');}catch(e){setError((e as Error).message);setHistory(await api<StoredResult[]>(`/api/results?studentId=${studentId}`));}finally{setBusy(false);}
  };
  const handleSelectHistoryItem=(item:EvaluationResult)=>{
    setEvaluationResult(item);setAssessmentStatus('completed');setSelectedInitialMajor(UNIVERSITY_MAJORS_LIST.find(m=>m.id===item.initialMajorId)||{...emptyMajor,id:item.initialMajorId,name:item.initialMajorName});setSelectedRevisedMajor(UNIVERSITY_MAJORS_LIST.find(m=>m.id===item.finalMajorId)||{...emptyMajor,id:item.finalMajorId,name:item.finalMajorName});setAttempt(null);setAnswers({});setActiveTab('counseling');setStatusCheckFeedback(`Đang xem kết quả ngày ${item.testDate}.`);
  };
  const handleOtherStudent=()=>{
    if(busy)return;
    setStudentId('');setStudentName('');setSchool('');setClassName('');setStudentActive(true);setAnswers({});setAttempt(null);setEvaluationResult(null);setHistory([]);setAssessmentStatus('not_started');setProfileMessage('');setStatusCheckFeedback(null);setError('');try{localStorage.removeItem(profileKey);}catch{}
  };
  return { CAREER_MATRIX_DATA, UNIVERSITY_MAJORS_LIST, activeTab,setActiveTab,selectedInitialMajor,selectedRevisedMajor,studentName,setStudentName,school,setSchool,className,setClassName,studentId,studentActive,profileReady,profileMessage,busy,error,setError,
    answers,assessmentStatus,statusCheckFeedback,evaluationResult,assessmentTier,assessmentMode,isTestModalOpen,setIsTestModalOpen,selectedCareerDetail,setSelectedCareerDetail,printReportResult,setPrintReportResult,history,
    activeQuestions,answeredCount:Object.keys(answers).length,totalQuestions:activeQuestions.length,
    handleSelectAnswer,handleQuickFillDemo,handleSubmitTest,handleCheckStatus,handleSelectInitialMajor,handleSelectRevisedMajor,handleResetTest,handleDeleteHistoryItem,handleClearAllHistory,handleSelectHistoryItem,handleSaveProfile,handleOtherStudent,handleOpenTest,
    setAssessmentTier:(tier:AssessmentTier)=>{void changeConfig(assessmentMode,tier);},setAssessmentMode:(mode:AssessmentMode)=>{void changeConfig(mode,assessmentTier);}
  };
}
