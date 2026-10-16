import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs';
import path from 'node:path';
import type { Student, Attempt, Catalog, StoredResult } from '../src/types/platform.ts';
import { seedCatalog } from './domain.ts';

export interface Database {
  catalog: Catalog;
  revision: number;
  students: Student[];
  attempts: Attempt[];
  results: StoredResult[];
}
// One server process owns this file. Write to a sibling then rename to avoid partial JSON.
export class Store {
  data: Database;
  private committed: Database;
  constructor(public file: string) {
    this.data = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {
      catalog: seedCatalog(), revision: 1, students: [], attempts: [], results: []
    };
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
