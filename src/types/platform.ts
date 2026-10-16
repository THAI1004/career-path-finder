import type { AssessmentQuestion, CareerMatrixItem, UniversityMajor, EvaluationResult } from './career.ts';

export interface Student {
  id: string;
  name: string;
  active: boolean;
  school: string;
  className: string;
  createdAt: string;
}
export type UserRole = 'user' | 'admin';
export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  phone: string;
  coverUrl: string;
  active: boolean;
  createdAt: string;
  lastLoginAt?: string;
  /** Server-only credential hash; never returned by the API. */
  passwordHash?: string;
}
export interface AuthUser extends User {}
export interface QuestionBankRecord {
  id: number;
  type: 'DISC' | 'HOLLAND';
  title: string;
  scenario: string;
  options: Array<{ id: string; text: string; trait: string; weight: number }>;
}
export interface Group { id: string; name: string; description: string; active: boolean }
export interface Job { id: string; name: string; description: string; keySkills: string[]; suitableRoles: string[]; topUniversities: string[]; averageSalaryRange: string; growthPotential: CareerMatrixItem['growthPotential']; active: boolean }
export interface Major extends UniversityMajor { active: boolean }
export interface Output { id: string; holland: string; disc: string; jobId: string; majorId: string; combinationIds: string[]; active: boolean }
export interface Combination { id: string; name: string; subjects: string[]; active: boolean }
export interface Catalog {
  holland: Group[];
  disc: Group[];
  jobs: Job[];
  majors: Major[];
  outputs: Output[];
  combinations: Combination[];
}
export type Collection = keyof Catalog;
export interface PublicCatalog extends Catalog { careers: CareerMatrixItem[]; revision: number }
export interface StoredResult extends EvaluationResult { userId: string; attemptId: string; createdAt: string; reviewed: boolean }
export interface Attempt {
  id: string; userId: string; mode: 'INTEGRATED' | 'DISC' | 'HOLLAND'; tier: 'short' | 'standard' | 'deep';
  initialMajorId: string; finalMajorId: string; questions: AssessmentQuestion[];
  answers: Record<number, string>; status: 'in_progress' | 'completed'; createdAt: string; updatedAt: string;
}
