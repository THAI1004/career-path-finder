import express from 'express';
import { randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import type { Store } from './store.ts';
import { collections, evaluate, HttpError, publicCatalog, questionsFor, requireValue, subjectPlanFor, validateAnswers, validateCatalog } from './domain.ts';
import type { Collection, Student, Attempt, User } from '../src/types/platform.ts';

type StoredUser = User & { passwordHash: string };
const sessions = new Map<string, string>();
const hashPassword = (password: string) => scryptSync(password, 'educareer-v1', 32).toString('hex');
const passwordMatches = (password: string, hash: string) => { try { return timingSafeEqual(Buffer.from(hash, 'hex'), scryptSync(password, 'educareer-v1', 32)); } catch { return false; } };
const safeUser = (user: StoredUser): User => { const { passwordHash: _passwordHash, ...publicUser } = user; return publicUser; };

export function createApp(store: Store) {
  const app = express();
  if (!store.data.users.length) {
    const now = new Date().toISOString();
    store.data.users.push({ id: randomUUID(), email: 'admin@educareer.local', passwordHash: hashPassword('Admin@123'), role: 'admin', name: 'Quản trị viên', phone: '', coverUrl: '', active: true, createdAt: now });
    store.save();
  }
  const currentUser = (req: express.Request) => {
    const header = req.headers.authorization || ''; const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    const id = token ? sessions.get(token) : ''; return id ? (store.data.users as StoredUser[]).find(user => user.id === id && user.active) : undefined;
  };
  const requireAuth = (req: express.Request) => { const user = currentUser(req); requireValue(user, 'Vui lòng đăng nhập để tiếp tục.', 401); return user as StoredUser; };
  const requireAdmin = (req: express.Request) => { const user = requireAuth(req); requireValue(user.role === 'admin', 'Bạn không có quyền quản trị.', 403); return user; };
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
  app.post('/api/auth/register', (req,res) => {
    const email = String(req.body?.email || '').trim().toLowerCase(); const password = String(req.body?.password || ''); const name = String(req.body?.name || '').trim();
    requireValue(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email), 'Email không hợp lệ.'); requireValue(password.length >= 8, 'Mật khẩu cần ít nhất 8 ký tự.'); requireValue(name.length > 0 && name.length <= 150, 'Họ tên không hợp lệ.');
    requireValue(!(store.data.users as StoredUser[]).some(user => user.email === email), 'Email đã được sử dụng.', 409);
    const now = new Date().toISOString(); const id = randomUUID(); const user: StoredUser = { id, email, passwordHash: hashPassword(password), role: 'user', name, phone: '', coverUrl: '', active: true, createdAt: now };
    store.data.users.push(user); store.data.students.push({ id, name, school: '', className: '', active: true, createdAt: now }); store.save(); const token = randomUUID(); sessions.set(token, id); res.status(201).json({ token, user: safeUser(user) });
  });
  app.post('/api/auth/login', (req,res) => {
    const email = String(req.body?.email || '').trim().toLowerCase(); const password = String(req.body?.password || ''); const user = (store.data.users as StoredUser[]).find(item => item.email === email);
    requireValue(user && user.active && passwordMatches(password, user.passwordHash), 'Email hoặc mật khẩu không đúng.', 401); user.lastLoginAt = new Date().toISOString(); store.save(); const token = randomUUID(); sessions.set(token, user.id); res.json({ token, user: safeUser(user) });
  });
  app.get('/api/auth/me', (req,res) => { const user = currentUser(req); if (!user) return res.status(401).json({ error: 'Chưa đăng nhập.' }); res.json(safeUser(user)); });
  app.post('/api/auth/logout', (req,res) => { const token = String(req.headers.authorization || '').replace(/^Bearer /, ''); if (token) sessions.delete(token); res.json({ ok: true }); });
  app.put('/api/auth/profile', (req,res) => { const user = requireAuth(req); const body = req.body || {}; if (body.name !== undefined) requireValue(typeof body.name === 'string' && body.name.trim().length > 0 && body.name.length <= 150, 'Họ tên không hợp lệ.'); if (body.phone !== undefined) requireValue(typeof body.phone === 'string' && body.phone.length <= 50, 'Số điện thoại không hợp lệ.'); if (body.coverUrl !== undefined) requireValue(typeof body.coverUrl === 'string' && body.coverUrl.length <= 2200000, 'Ảnh bìa không hợp lệ hoặc quá lớn.'); Object.assign(user, { name: body.name?.trim() ?? user.name, phone: body.phone ?? user.phone, coverUrl: body.coverUrl ?? user.coverUrl }); const student = store.data.students.find(item => item.id === user.id); if (student) student.name = user.name; store.save(); res.json(safeUser(user)); });
  app.use('/api/admin', (req,_res,next) => { try { requireAdmin(req); next(); } catch (error) { next(error); } });
  app.get('/api/admin/users', (req,res) => { requireAdmin(req); res.json((store.data.users as StoredUser[]).map(safeUser)); });
  app.put('/api/admin/users/:id', (req,res) => { requireAdmin(req); const user = (store.data.users as StoredUser[]).find(item => item.id === req.params.id); requireValue(user, 'Tài khoản không tồn tại.', 404); if (req.body.role !== undefined) requireValue(req.body.role === 'user' || req.body.role === 'admin', 'Quyền không hợp lệ.'); if (req.body.active !== undefined) requireValue(typeof req.body.active === 'boolean', 'Trạng thái không hợp lệ.'); Object.assign(user, { role: req.body.role ?? user.role, active: req.body.active ?? user.active }); store.save(); res.json(safeUser(user)); });
  app.delete('/api/admin/users/:id', (req,res) => { const admin = requireAdmin(req); requireValue(req.params.id !== admin.id, 'Không thể xóa tài khoản quản trị đang đăng nhập.', 409); requireValue((store.data.users as StoredUser[]).some(item => item.id === req.params.id), 'Tài khoản không tồn tại.', 404); store.data.users = store.data.users.filter(item => item.id !== req.params.id); store.data.students = store.data.students.filter(item => item.id !== req.params.id); store.save(); res.json({ ok: true }); });
  app.get('/api/admin/questions/:type', (req,res) => { requireAdmin(req); const type = req.params.type === 'DISC' ? 'DISC' : 'HOLLAND'; res.json({ type, questions: store.data.questionBanks[type], revision: store.data.revision }); });
  app.post('/api/admin/questions/:type/import', (req,res) => { requireAdmin(req); const type = req.params.type === 'DISC' ? 'DISC' : 'HOLLAND'; const questions = req.body?.questions; requireValue(Array.isArray(questions) && questions.length > 0 && questions.length <= 500, 'Bộ câu hỏi không hợp lệ.'); requireValue(questions.every((q:any) => q && Number.isInteger(q.id) && typeof q.scenario === 'string' && Array.isArray(q.options) && q.options.length >= 2), 'Mỗi câu hỏi cần ID, nội dung và đáp án.'); store.data.questionBanks[type] = questions; store.data.revision++; store.save(); res.json({ type, questions, revision: store.data.revision }); });
  app.put('/api/admin/questions/:type/:id', (req,res) => { requireAdmin(req); const type = req.params.type === 'DISC' ? 'DISC' : 'HOLLAND'; const questions = store.data.questionBanks[type]; const index = questions.findIndex(q => String(q.id) === req.params.id); requireValue(index >= 0, 'Câu hỏi không tồn tại.', 404); questions[index] = { ...questions[index], ...req.body, id: questions[index].id }; store.data.revision++; store.save(); res.json(questions[index]); });
  app.delete('/api/admin/questions/:type/:id', (req,res) => { requireAdmin(req); const type = req.params.type === 'DISC' ? 'DISC' : 'HOLLAND'; const questions = store.data.questionBanks[type]; const index = questions.findIndex(q => String(q.id) === req.params.id); requireValue(index >= 0, 'Câu hỏi không tồn tại.', 404); questions.splice(index, 1); store.data.revision++; store.save(); res.json({ ok: true }); });
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

  app.get('/api/students', (req, res) => { requireAdmin(req); res.json(store.data.students.map(s => ({ ...s,
    resultCount: store.data.results.filter(r => r.userId === s.id).length,
    attempts: store.data.attempts.filter(a => a.userId === s.id).map(a => ({ id: a.id, status: a.status, answered: Object.keys(a.answers).length, total: a.questions.length, mode: a.mode, tier: a.tier, updatedAt: a.updatedAt }))
  }))); });
  const studentFields = (body: any) => {
    requireValue(body && typeof body.name === 'string' && body.name.trim().length > 0 && body.name.trim().length <= 150, 'Họ tên cần từ 1–150 ký tự.');
    for (const key of ['school','className']) requireValue(typeof body[key] === 'string' && body[key].length <= 200, 'Trường/lớp không hợp lệ.');
    requireValue(typeof body.active === 'boolean', 'Trạng thái sinh viên không hợp lệ.');
    return { name: body.name.trim(), school: body.school.trim(), className: body.className.trim(), active: body.active };
  };
  app.post('/api/students', (req,res) => {
    requireAdmin(req);
    const student: Student = { ...studentFields(req.body), id: randomUUID(), createdAt: new Date().toISOString() };
    store.data.students.push(student); store.save(); res.status(201).json(student);
  });
  app.put('/api/students/:id', (req,res) => {
    const actor = requireAuth(req); requireValue(actor.role === 'admin' || actor.id === req.params.id, 'Không có quyền sửa hồ sơ này.', 403);
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
    requireAdmin(req);
    requireValue(store.data.students.some(s => s.id === req.params.id), 'Sinh viên không tồn tại.',404);
    requireValue(!store.data.attempts.some(a => a.userId === req.params.id) && !store.data.results.some(r => r.userId === req.params.id), 'Sinh viên đã có bài làm/kết quả. Hãy ngừng hoạt động để giữ lịch sử.',409);
    store.data.students = store.data.students.filter(s => s.id !== req.params.id); store.save(); res.json({ ok: true });
  });
  app.post('/api/attempts', (req,res) => {
    const { studentId, initialMajorId, mode, tier, fresh } = req.body;
    const actor = requireAuth(req); requireValue(actor.role === 'admin' || actor.id === studentId, 'Không có quyền tạo bài làm cho tài khoản khác.', 403);
    const student = store.data.students.find(s => s.id === studentId && s.active);
    requireValue(student, 'Hãy lưu thông tin sinh viên đang hoạt động trước khi làm bài.');
    const catalog = publicCatalog(store.data.catalog,store.data.revision);
    requireValue(catalog.majors.some(m => m.id === initialMajorId), 'Ngành không còn hoạt động.');
    const existing = !fresh && store.data.attempts.find(a => a.userId === studentId && a.mode === mode && a.tier === tier && a.initialMajorId === initialMajorId && a.status === 'in_progress');
    if (existing) return res.json(existing);
    const questions = questionsFor(catalog,mode,tier,store.data.questionBanks);
    const now = new Date().toISOString();
    const attempt: Attempt = { id: randomUUID(), userId: studentId, initialMajorId, finalMajorId: initialMajorId, mode, tier, questions: structuredClone(questions), answers: {}, status: 'in_progress', createdAt: now, updatedAt: now };
    store.data.attempts.unshift(attempt); store.save(); res.status(201).json(attempt);
  });
  app.get('/api/attempts', (req,res) => { const actor = requireAuth(req); const studentId = actor.role === 'admin' ? String(req.query.studentId || '') : actor.id; res.json(store.data.attempts.filter(a => !studentId || a.userId === studentId)); });
  const findAttempt = (id: string) => {
    const attempt = store.data.attempts.find(a => a.id === id);
    requireValue(attempt, 'Bài làm không tồn tại.',404);
    requireValue(store.data.students.some(s => s.id === attempt.userId && s.active), 'Sinh viên đã ngừng hoạt động.',409);
    return attempt;
  };
  app.put('/api/attempts/:id', (req,res) => {
    const attempt = findAttempt(req.params.id);
    const actor = requireAuth(req); requireValue(actor.role === 'admin' || actor.id === attempt.userId, 'Không có quyền sửa bài làm này.', 403);
    requireValue(attempt.status !== 'completed','Bài đã nộp không thể sửa đáp án.',409);
    validateAnswers(attempt,req.body.answers);
    attempt.answers = req.body.answers; attempt.updatedAt = new Date().toISOString(); store.save(); res.json(attempt);
  });
  app.post('/api/attempts/:id/submit', (req,res) => {
    const attempt = findAttempt(req.params.id);
    const actor = requireAuth(req); requireValue(actor.role === 'admin' || actor.id === attempt.userId, 'Không có quyền nộp bài làm này.', 403);
    const existing = store.data.results.find(r => r.attemptId === attempt.id);
    if (existing) return res.json(existing);
    requireValue(attempt.status !== 'completed','Bài đã nộp.',409);
    validateAnswers(attempt,req.body.answers,true);
    const snapshot = { ...attempt, answers: req.body.answers };
    const result = evaluate(snapshot, store.data.students.find(s => s.id === attempt.userId)!,publicCatalog(store.data.catalog,store.data.revision));
    attempt.answers = req.body.answers; attempt.status = 'completed'; attempt.updatedAt = result.createdAt;
    store.data.results.unshift(result); store.save(); res.status(201).json(result);
  });
  app.get('/api/results', (req,res) => { const actor = requireAuth(req); const studentId = actor.role === 'admin' ? String(req.query.studentId || '') : actor.id; res.json(store.data.results.filter(r => !studentId || r.userId === studentId)); });
  app.put('/api/results/:id', (req,res) => {
    const existing = store.data.results.find(r => r.id === req.params.id);
    const actor = requireAuth(req); requireValue(actor.role === 'admin' || actor.id === existing?.userId, 'Không có quyền sửa kết quả này.', 403);
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
    const actor = requireAuth(req); const existing = store.data.results.find(r => r.id === req.params.id); requireValue(actor.role === 'admin' || actor.id === existing?.userId, 'Không có quyền xóa kết quả này.', 403);
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
