import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs';
import path from 'node:path';
import type { Student, Attempt, Catalog, StoredResult, User } from '../src/types/platform.ts';
import { seedCatalog } from './domain.ts';
import { DISC_QUESTIONS_BANK, HOLLAND_QUESTIONS_BANK } from '../src/data/questionBank.ts';
import type { AssessmentQuestion } from '../src/types/career.ts';

export interface Database {
  catalog: Catalog;
  revision: number;
  students: Student[];
  attempts: Attempt[];
  results: StoredResult[];
  users: User[];
  questionBanks: { DISC: AssessmentQuestion[]; HOLLAND: AssessmentQuestion[] };
}
// One server process owns this file. Write to a sibling then rename to avoid partial JSON.
export class Store {
  data: Database;
  private committed: Database;
  constructor(public file: string) {
    this.data = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {
      catalog: seedCatalog(), revision: 1, students: [], attempts: [], results: [], users: [], questionBanks: { DISC: structuredClone(DISC_QUESTIONS_BANK), HOLLAND: structuredClone(HOLLAND_QUESTIONS_BANK) }
    };
    if (!this.data.users) this.data.users = [];
    if (!this.data.questionBanks) this.data.questionBanks = { DISC: structuredClone(DISC_QUESTIONS_BANK), HOLLAND: structuredClone(HOLLAND_QUESTIONS_BANK) };
    this.committed = structuredClone(this.data);
  }
  save() {
    try {
      mkdirSync(path.dirname(this.file), { recursive: true });
      writeFileSync(this.file + '.tmp', JSON.stringify(this.data, null, 2), { mode: 0o600 });
      renameSync(this.file + '.tmp', this.file);
      this.committed = structuredClone(this.data);
    } catch(error) {
      this.data = structuredClone(this.committed);
      throw error;
    }
  }
}
