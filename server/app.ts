import express from 'express';
import { randomUUID } from 'node:crypto';
import type { Store } from './store.ts';
import { collections, evaluate, HttpError, publicCatalog, questionsFor, requireValue, subjectPlanFor, validateAnswers, validateCatalog } from './domain.ts';
import type { Collection, Student, Attempt } from '../src/types/platform.ts';

export function createApp(store: Store) {
  const app = express();
  app.disable('x-powered-by');
  app.use('/api', (_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
  app.use('/api', (req, _res, next) => {
    // No login by request. Still reject cross-origin writes from other websites.
    if (!['GET','HEAD','OPTIONS'].includes(req.method) && req.headers.origin) {
      try { requireValue(new URL(req.headers.origin).host === req.headers.host, 'Không chấp nhận yêu cầu từ website khác.', 403); }
      catch (error) { return next(error); }
    }
    next();
  });
  app.use(express.json({ limit: '2mb' }));
  app.use('/api', (req,_res,next) => {
    if (['POST','PUT'].includes(req.method) && (!req.body || typeof req.body !== 'object' || Array.isArray(req.body))) return next(new HttpError(400,'Nội dung yêu cầu không hợp lệ.'));
    next();
  });
  app.get('/api/catalog', (_req, res) => res.json(publicCatalog(store.data.catalog, store.data.revision)));
  app.get('/api/admin/catalog', (_req, res) => res.json({ ...store.data.catalog, revision: store.data.revision }));
  function updateCatalog(req: express.Request, res: express.Response, deleting = false) {
    const key = req.params.collection as Collection;
    requireValue(collections.includes(key), 'Danh mục không tồn tại.', 404);
    requireValue(Number(req.headers['if-match']) === store.data.revision, 'Dữ liệu đã thay đổi. Hãy tải lại trước khi lưu.', 409);
    const catalog = structuredClone(store.data.catalog);
    const rows = catalog[key] as any[];
    const id = req.params.id ?? req.body.id;
    requireValue(typeof id === 'string' && /^[\w-]{1,100}$/.test(id), 'Mã chỉ gồm chữ không dấu, số, gạch dưới hoặc gạch ngang.');
    const index = rows.findIndex(row => row.id === id);
    if (req.method === 'POST') requireValue(index < 0, 'Mã bản ghi đã tồn tại.', 409);
    else requireValue(index >= 0, 'Bản ghi không tồn tại.', 404);
    if (deleting) rows.splice(index, 1);
    else {
      const row = { ...req.body, id };
      delete row.revision;
      if (index < 0) rows.push(row); else rows[index] = row;
    }
    try { validateCatalog(catalog); }
    catch (error) { if (deleting) throw new HttpError(409, 'Bản ghi đang được tham chiếu. Hãy ngừng hoạt động hoặc xóa liên kết trước.'); throw error; }
    store.data.catalog = catalog; store.data.revision++; store.save();
    res.json({ ...catalog, revision: store.data.revision });
  }
  app.post('/api/admin/catalog/:collection', (req,res) => updateCatalog(req,res));
  app.put('/api/admin/catalog/:collection/:id', (req,res) => updateCatalog(req,res));
  app.delete('/api/admin/catalog/:collection/:id', (req,res) => updateCatalog(req,res,true));

  app.get('/api/students', (_req, res) => res.json(store.data.students.map(s => ({ ...s,
    resultCount: store.data.results.filter(r => r.userId === s.id).length,
    attempts: store.data.attempts.filter(a => a.userId === s.id).map(a => ({ id: a.id, status: a.status, answered: Object.keys(a.answers).length, total: a.questions.length, mode: a.mode, tier: a.tier, updatedAt: a.updatedAt }))
  }))));
  const studentFields = (body: any) => {
    requireValue(body && typeof body.name === 'string' && body.name.trim().length > 0 && body.name.trim().length <= 150, 'Họ tên cần từ 1–150 ký tự.');
    for (const key of ['school','className']) requireValue(typeof body[key] === 'string' && body[key].length <= 200, 'Trường/lớp không hợp lệ.');
    requireValue(typeof body.active === 'boolean', 'Trạng thái sinh viên không hợp lệ.');
    return { name: body.name.trim(), school: body.school.trim(), className: body.className.trim(), active: body.active };
  };
  app.post('/api/students', (req,res) => {
    const student: Student = { ...studentFields(req.body), id: randomUUID(), createdAt: new Date().toISOString() };
    store.data.students.push(student); store.save(); res.status(201).json(student);
  });
  app.put('/api/students/:id', (req,res) => {
    const student = store.data.students.find(s => s.id === req.params.id);
    requireValue(student, 'Sinh viên không tồn tại.',404);
    Object.assign(student, studentFields(req.body)); store.save(); res.json(student);
  });
  app.put('/api/students/:id/profile', (req,res) => {
    const student = store.data.students.find(s => s.id === req.params.id);
    requireValue(student, 'Sinh viên không tồn tại.',404);
    requireValue(student.active,'Hồ sơ đã ngừng hoạt động. Vui lòng liên hệ quản trị viên.',409);
    Object.assign(student,studentFields({...req.body,active:student.active}));store.save();res.json(student);
  });
  app.delete('/api/students/:id', (req,res) => {
    requireValue(store.data.students.some(s => s.id === req.params.id), 'Sinh viên không tồn tại.',404);
    requireValue(!store.data.attempts.some(a => a.userId === req.params.id) && !store.data.results.some(r => r.userId === req.params.id), 'Sinh viên đã có bài làm/kết quả. Hãy ngừng hoạt động để giữ lịch sử.',409);
    store.data.students = store.data.students.filter(s => s.id !== req.params.id); store.save(); res.json({ ok: true });
  });
  app.post('/api/attempts', (req,res) => {
    const { studentId, initialMajorId, mode, tier, fresh } = req.body;
    const student = store.data.students.find(s => s.id === studentId && s.active);
    requireValue(student, 'Hãy lưu thông tin sinh viên đang hoạt động trước khi làm bài.');
    const catalog = publicCatalog(store.data.catalog,store.data.revision);
    requireValue(catalog.majors.some(m => m.id === initialMajorId), 'Ngành không còn hoạt động.');
    const existing = !fresh && store.data.attempts.find(a => a.userId === studentId && a.mode === mode && a.tier === tier && a.initialMajorId === initialMajorId && a.status === 'in_progress');
    if (existing) return res.json(existing);
    const questions = questionsFor(catalog,mode,tier);
    const now = new Date().toISOString();
    const attempt: Attempt = { id: randomUUID(), userId: studentId, initialMajorId, finalMajorId: initialMajorId, mode, tier, questions: structuredClone(questions), answers: {}, status: 'in_progress', createdAt: now, updatedAt: now };
    store.data.attempts.unshift(attempt); store.save(); res.status(201).json(attempt);
  });
  app.get('/api/attempts', (req,res) => res.json(store.data.attempts.filter(a => !req.query.studentId || a.userId === req.query.studentId)));
  const findAttempt = (id: string) => {
    const attempt = store.data.attempts.find(a => a.id === id);
    requireValue(attempt, 'Bài làm không tồn tại.',404);
    requireValue(store.data.students.some(s => s.id === attempt.userId && s.active), 'Sinh viên đã ngừng hoạt động.',409);
    return attempt;
  };
  app.put('/api/attempts/:id', (req,res) => {
    const attempt = findAttempt(req.params.id);
    requireValue(attempt.status !== 'completed','Bài đã nộp không thể sửa đáp án.',409);
    validateAnswers(attempt,req.body.answers);
    attempt.answers = req.body.answers; attempt.updatedAt = new Date().toISOString(); store.save(); res.json(attempt);
  });
  app.post('/api/attempts/:id/submit', (req,res) => {
    const attempt = findAttempt(req.params.id);
    const existing = store.data.results.find(r => r.attemptId === attempt.id);
    if (existing) return res.json(existing);
    requireValue(attempt.status !== 'completed','Bài đã nộp.',409);
    validateAnswers(attempt,req.body.answers,true);
    const snapshot = { ...attempt, answers: req.body.answers };
    const result = evaluate(snapshot, store.data.students.find(s => s.id === attempt.userId)!,publicCatalog(store.data.catalog,store.data.revision));
    attempt.answers = req.body.answers; attempt.status = 'completed'; attempt.updatedAt = result.createdAt;
    store.data.results.unshift(result); store.save(); res.status(201).json(result);
  });
  app.get('/api/results', (req,res) => res.json(store.data.results.filter(r => !req.query.studentId || r.userId === req.query.studentId)));
  app.put('/api/results/:id', (req,res) => {
    const existing = store.data.results.find(r => r.id === req.params.id);
    requireValue(existing, 'Kết quả không tồn tại.',404);
    const result = structuredClone(existing);
    const { notes, reviewed, finalMajorId } = req.body;
    if (notes !== undefined) { requireValue(typeof notes === 'string' && notes.length <= 5000,'Ghi chú tối đa 5000 ký tự.'); result.notes = notes; }
    if (reviewed !== undefined) { requireValue(typeof reviewed === 'boolean','Trạng thái duyệt không hợp lệ.'); result.reviewed = reviewed; }
    if (finalMajorId !== undefined) {
      const major = publicCatalog(store.data.catalog,store.data.revision).majors.find(m => m.id === finalMajorId);
      requireValue(major,'Ngành không còn hoạt động.');
      result.finalMajorId = major.id; result.finalMajorName = major.name;
      const career = result.recommendedCareers.find(c => c.majorCode === major.code);
      result.highSchoolPlan = career ? subjectPlanFor(career.admissionCombinations,publicCatalog(store.data.catalog,store.data.revision)) : undefined;
    }
    store.data.results = store.data.results.map(r => r.id === result.id ? result : r);
    store.save(); res.json(result);
  });
  app.delete('/api/results/:id', (req,res) => {
    requireValue(store.data.results.some(r => r.id === req.params.id),'Kết quả không tồn tại.',404);
    store.data.results = store.data.results.filter(r => r.id !== req.params.id); store.save(); res.json({ ok:true });
  });
  app.use('/api', (_req,res) => res.status(404).json({ error:'Không tìm thấy chức năng.' }));
  app.use((error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = error instanceof HttpError ? error.status : error.type === 'entity.parse.failed' ? 400 : 500;
    if (status === 500) console.error(error);
    res.status(status).json({ error: status === 500 ? 'Không thể lưu hoặc đọc dữ liệu. Vui lòng thử lại.' : error.message });
  });
  return app;
}
