import { randomUUID } from 'node:crypto';
import { CAREER_MATRIX_DATA, UNIVERSITY_MAJORS_LIST, DISC_TRAITS_INFO, HOLLAND_TRAITS_INFO } from '../src/data/careerMatrix.ts';
import { getQuestionsByConfig } from '../src/data/questionBank.ts';
import { calculateAssessmentScores, generateEvaluationAnalysis, filterCareers } from '../src/utils/scoring.ts';
import { getHighSchoolSubjectPlan } from '../src/data/highSchoolSubjects.ts';
import type { Catalog, Collection, PublicCatalog, StoredResult, Attempt, Student } from '../src/types/platform.ts';
import type { CareerMatrixItem } from '../src/types/career.ts';

export class HttpError extends Error { constructor(public status: number, message: string) { super(message); } }
export function requireValue(ok: unknown, message: string, status = 400): asserts ok { if (!ok) throw new HttpError(status, message); }
const subjects: Record<string, string[]> = { A00: ['Toán', 'Vật lý', 'Hóa học'], A01: ['Toán', 'Vật lý', 'Tiếng Anh'], B00: ['Toán', 'Hóa học', 'Sinh học'], D01: ['Toán', 'Ngữ văn', 'Tiếng Anh'], D07: ['Toán', 'Hóa học', 'Tiếng Anh'] };
export function subjectPlanFor(ids: string[], catalog: PublicCatalog) {
  const supported = ids.filter(id => subjects[id] && catalog.combinations.some(c => c.id === id && c.subjects.length === 3 && c.subjects.every(s => subjects[id].includes(s))));
  return supported.length ? getHighSchoolSubjectPlan(supported) : undefined;
}
export function seedCatalog(): Catalog {
  const majors = UNIVERSITY_MAJORS_LIST.map(m => ({ ...m, active: true }));
  for (const row of CAREER_MATRIX_DATA) if (!majors.some(m => m.name === row.universityMajor && m.code === row.majorCode)) majors.push({ id: `major-${majors.length}`, name: row.universityMajor, code: row.majorCode, category: 'Ngành tham khảo', typicalHolland: row.holland, description: '', careerOutcomes: [], active: true });
  const combinationIds = [...new Set(CAREER_MATRIX_DATA.flatMap(c => c.admissionCombinations))];
  return {
    holland: Object.entries(HOLLAND_TRAITS_INFO).map(([id, g]) => ({ id, name: g.name, description: g.description, active: true })),
    disc: Object.entries(DISC_TRAITS_INFO).map(([id, g]) => ({ id, name: g.name, description: g.characteristics, active: true })),
    jobs: CAREER_MATRIX_DATA.map(c => ({ id: c.id, name: c.jobTitle, description: c.description, keySkills: c.keySkills, suitableRoles: c.suitableRoles, topUniversities: c.topUniversities, averageSalaryRange: c.averageSalaryRange, growthPotential: c.growthPotential, active: true })),
    majors,
    combinations: combinationIds.map(id => ({ id, name: id, subjects: subjects[id] || [], active: true })),
    outputs: CAREER_MATRIX_DATA.map(c => ({ id: c.id, holland: c.holland, disc: c.disc, jobId: c.id, majorId: majors.find(m => m.name === c.universityMajor && m.code === c.majorCode)!.id, combinationIds: c.admissionCombinations, active: true }))
  };
}
export function publicCatalog(c: Catalog, revision: number): PublicCatalog {
  const active = Object.fromEntries(Object.entries(c).map(([key, items]) => [key, items.filter((x: any) => x.active)])) as unknown as Catalog;
  active.majors = active.majors.filter(m => active.holland.some(g => g.id === m.typicalHolland));
  const careers: CareerMatrixItem[] = [];
  active.outputs = active.outputs.filter(o => {
    const job = active.jobs.find(j => j.id === o.jobId), major = active.majors.find(m => m.id === o.majorId);
    const holland = active.holland.find(g => g.id === o.holland), disc = active.disc.find(g => g.id === o.disc);
    if (!job || !major || !holland || !disc || !o.combinationIds.every(id => active.combinations.some(c => c.id === id))) return false;
    careers.push({ ...job, id: o.id, jobTitle: job.name, universityMajor: major.name, majorCode: major.code, holland: o.holland as any, hollandLabel: holland.name, disc: o.disc as any, discLabel: disc.name, admissionCombinations: o.combinationIds });
    return true;
  });
  return { ...active, careers, revision };
}
export const collections: Collection[] = ['holland', 'disc', 'jobs', 'majors', 'outputs', 'combinations'];
export function validateCatalog(c: Catalog) {
  for (const key of collections) {
    const ids = new Set();
    for (const item of c[key]) {
      requireValue(item && typeof item.id === 'string', 'Mã bản ghi không hợp lệ.');
      requireValue(!ids.has(item.id), `Trùng mã trong danh mục ${key}.`); ids.add(item.id);
      requireValue(typeof item.active === 'boolean', 'Trạng thái không hợp lệ.');
    }
  }
  const text = (v: unknown, label: string, required = false) => requireValue(typeof v === 'string' && v.length <= 10000 && (!required || v.trim().length > 0), `${label} không hợp lệ.`);
  const list = (v: unknown, label: string) => requireValue(Array.isArray(v) && v.length <= 100 && v.every(s => typeof s === 'string' && s.length <= 1000), `${label} phải là danh sách văn bản.`);
  for (const key of ['holland', 'disc'] as const) for (const g of c[key]) {
    requireValue((key === 'holland' ? ['R','I','A','S','E','C'] : ['D','I','S','C']).includes(g.id), 'Chỉ hỗ trợ các mã nhóm thuộc mô hình Holland/DISC.');
    text(g.name, 'Tên nhóm', true); text(g.description, 'Mô tả');
  }
  for (const j of c.jobs) {
    text(j.name, 'Tên nghề', true); text(j.description, 'Mô tả'); text(j.averageSalaryRange, 'Thu nhập');
    list(j.keySkills, 'Kỹ năng'); list(j.suitableRoles, 'Vị trí'); list(j.topUniversities, 'Trường đào tạo');
    requireValue(['Rất cao','Cao','Ổn định'].includes(j.growthPotential), 'Tiềm năng không hợp lệ.');
  }
  for (const m of c.majors) {
    text(m.name, 'Tên ngành', true); text(m.code, 'Mã ngành', true); text(m.category, 'Nhóm ngành', true); text(m.description, 'Mô tả'); list(m.careerOutcomes, 'Đầu ra ngành');
    requireValue(c.holland.some(g => g.id === m.typicalHolland), 'Nhóm Holland của ngành không tồn tại.');
  }
  for (const a of c.combinations) { text(a.id, 'Mã tổ hợp', true); text(a.name, 'Tên tổ hợp', true); list(a.subjects, 'Môn học'); requireValue(a.subjects.length === 3, 'Tổ hợp phải có 3 môn.'); }
  for (const o of c.outputs) {
    for (const [key, id] of [['holland',o.holland],['disc',o.disc],['jobs',o.jobId],['majors',o.majorId]] as const) requireValue(c[key].some(x => x.id === id), 'Đầu ra tham chiếu danh mục không tồn tại.');
    list(o.combinationIds, 'Tổ hợp'); requireValue(o.combinationIds.length && o.combinationIds.every(id => c.combinations.some(x => x.id === id)), 'Tổ hợp của đầu ra không tồn tại.');
  }
}
export function questionsFor(_c: PublicCatalog, mode: Attempt['mode'], tier: Attempt['tier'], banks?: { DISC: any[]; HOLLAND: any[] }) {
  requireValue(['INTEGRATED','DISC','HOLLAND'].includes(mode) && ['short','standard','deep'].includes(tier), 'Cấu hình bài test không hợp lệ.');
  if (!banks) return getQuestionsByConfig(mode,tier);
  const count = tier === 'short' ? 20 : tier === 'standard' ? 50 : 70;
  if (mode === 'DISC') return structuredClone(banks.DISC.slice(0, count));
  if (mode === 'HOLLAND') return structuredClone(banks.HOLLAND.slice(0, count));
  const half = Math.floor(count / 2); return structuredClone([...banks.DISC.slice(0, half), ...banks.HOLLAND.slice(0, half)]);
}

export function validateAnswers(attempt: Attempt, answers: any, complete = false) {
  requireValue(answers && typeof answers === 'object' && !Array.isArray(answers), 'Câu trả lời không hợp lệ.');
  for (const [id, option] of Object.entries(answers)) requireValue(attempt.questions.some(q => String(q.id) === id && q.options.some(o => o.id === option)), 'Đáp án không thuộc bài test.');
  if (complete) requireValue(Object.keys(answers).length === attempt.questions.length, 'Vui lòng trả lời tất cả câu hỏi.');
}
export function evaluate(attempt: Attempt, user: Student, catalog: PublicCatalog): StoredResult {
  const initial = catalog.majors.find(m => m.id === attempt.initialMajorId), final = catalog.majors.find(m => m.id === attempt.finalMajorId);
  requireValue(initial && final, 'Ngành đã ngừng hoạt động. Vui lòng chọn lại ngành.', 409);
  const scores = calculateAssessmentScores(attempt.answers, attempt.questions);
  const recommended = filterCareers(catalog.careers, { disc: scores.primaryDisc, holland: scores.primaryHolland });
  const now = new Date().toISOString();
  return { id: randomUUID(), userId: user.id, attemptId: attempt.id, createdAt: now, reviewed: false, testDate: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }), studentName: user.name,
    initialMajorId: initial.id, initialMajorName: initial.name, finalMajorId: final.id, finalMajorName: final.name, ...scores,
    analysis: generateEvaluationAnalysis(scores.primaryDisc,scores.secondaryDisc,scores.primaryHolland), recommendedCareers: recommended,
    highSchoolPlan: recommended.length ? subjectPlanFor(recommended[0].admissionCombinations,catalog) : undefined,
    assessmentMode: attempt.mode, assessmentTier: attempt.tier };
}
