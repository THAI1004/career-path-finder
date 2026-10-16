import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs';
import path from 'node:path';
import type { Student, Attempt, Catalog, StoredResult, User } from '../src/types/platform.ts';
import { seedCatalog } from './domain.ts';
import { DISC_QUESTIONS_BANK, HOLLAND_QUESTIONS_BANK } from '../src/data/questionBank.ts';
import type { AssessmentQuestion } from '../src/types/career.ts';
import pg from 'pg';
const { Pool } = pg;

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
  private pool: pg.Pool | null = null;
  readonly ready: Promise<void>;
  constructor(public file: string) {
    this.data = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {
      catalog: seedCatalog(), revision: 1, students: [], attempts: [], results: [], users: [], questionBanks: { DISC: structuredClone(DISC_QUESTIONS_BANK), HOLLAND: structuredClone(HOLLAND_QUESTIONS_BANK) }
    };
    if (!this.data.users) this.data.users = [];
    if (!this.data.questionBanks) this.data.questionBanks = { DISC: structuredClone(DISC_QUESTIONS_BANK), HOLLAND: structuredClone(HOLLAND_QUESTIONS_BANK) };
    this.committed = structuredClone(this.data);
    this.ready = this.initDatabase();
  }
  private async initDatabase() {
    const url = process.env.DATABASE_URL;
    if (!url) return;
    try {
      this.pool = new Pool({ connectionString: url, connectionTimeoutMillis: 5000, ssl: url.includes('localhost') ? false : { rejectUnauthorized: false } });
      await this.pool.query('CREATE TABLE IF NOT EXISTS educareer_state (id INTEGER PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())');
      const found = await this.pool.query('SELECT data FROM educareer_state WHERE id=1');
      if (found.rows[0]?.data) { this.data = found.rows[0].data as Database; this.committed = structuredClone(this.data); }
      else await this.pool.query('INSERT INTO educareer_state (id,data) VALUES (1,$1) ON CONFLICT (id) DO NOTHING', [this.data]);
    } catch (error) {
      console.warn('EduCareer: không kết nối được PostgreSQL, dùng dữ liệu local tạm thời.', (error as Error).message);
      await this.pool?.end().catch(() => {}); this.pool = null;
    }
  }
  save() {
    try {
      mkdirSync(path.dirname(this.file), { recursive: true });
      writeFileSync(this.file + '.tmp', JSON.stringify(this.data, null, 2), { mode: 0o600 });
      renameSync(this.file + '.tmp', this.file);
      this.committed = structuredClone(this.data);
      if (this.pool) void this.pool.query('INSERT INTO educareer_state (id,data,updated_at) VALUES (1,$1,NOW()) ON CONFLICT (id) DO UPDATE SET data=EXCLUDED.data, updated_at=NOW()', [this.data]).catch(() => {});
    } catch(error) {
      this.data = structuredClone(this.committed);
      throw error;
    }
  }
}
