export type HollandCode = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
export type DISCCode = 'D' | 'I' | 'S' | 'C';

export interface CareerMatrixItem {
  id: string;
  holland: HollandCode;
  hollandLabel: string;
  disc: DISCCode;
  discLabel: string;
  jobTitle: string;
  universityMajor: string;
  majorCode: string;
  admissionCombinations: string[];
  description: string;
  keySkills: string[];
  suitableRoles: string[];
  topUniversities: string[];
  averageSalaryRange: string;
  growthPotential: 'Rất cao' | 'Cao' | 'Ổn định';
}

export interface UniversityMajor {
  id: string;
  name: string;
  code: string;
  category: string;
  typicalHolland: HollandCode;
  description: string;
  careerOutcomes: string[];
}

export interface QuestionOption {
  id: string;
  text: string;
  discTrait?: DISCCode;
  hollandTrait?: HollandCode;
  weight: number;
}

export interface AssessmentQuestion {
  id: number;
  type: 'DISC' | 'HOLLAND';
  title: string;
  scenario: string;
  options: QuestionOption[];
}

export interface TestAnswers {
  [questionId: number]: string; // option id
}

export interface EvaluationAnalysis {
  title: string;
  codeName: string;
  tagline: string;
  summary: string;
  coreBehavior: string;
  strengths: string[];
  idealWorkEnvironment: string;
  growthAdvice: string[];
  studyTips: string[];
}

export type AssessmentTier = 'short' | 'standard' | 'deep'; // 20, 50, 70 câu
export type AssessmentMode = 'INTEGRATED' | 'DISC' | 'HOLLAND';

export interface HighSchoolSubjectPlan {
  primaryCombination: string;
  name: string;
  mandatorySubjects: string[];
  recommendedElectives: string[];
  backupElectives: string[];
  studyTopics: string[];
  targetMajors: string[];
  rationale: string;
}

export interface EvaluationResult {
  id: string;
  testDate: string;
  studentName: string;
  initialMajorId: string;
  initialMajorName: string;
  finalMajorId: string;
  finalMajorName: string;
  primaryDisc: DISCCode;
  secondaryDisc: DISCCode;
  primaryHolland: HollandCode;
  discScores: Record<DISCCode, number>;
  discPercentages: Record<DISCCode, number>;
  hollandScores: Record<HollandCode, number>;
  analysis: EvaluationAnalysis;
  recommendedCareers: CareerMatrixItem[];
  highSchoolPlan?: HighSchoolSubjectPlan;
  assessmentTier?: AssessmentTier;
  assessmentMode?: AssessmentMode;
  notes?: string;
}

export type AssessmentStatus = 'not_started' | 'in_progress' | 'completed';
