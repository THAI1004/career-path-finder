import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { PublicCatalog } from './types/platform.ts';
import { DISC_TRAITS_INFO, HOLLAND_TRAITS_INFO } from './data/careerMatrix.ts';
import type { DISCCode, HollandCode } from './types/career.ts';

export async function api<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Không thể thực hiện yêu cầu.');
  return data;
}
const PlatformContext = createContext<{ catalog: PublicCatalog; refresh: () => Promise<void> } | null>(null);
export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [catalog,setCatalog] = useState<PublicCatalog | null>(null);
  const [error,setError] = useState('');
  const refresh = useCallback(async () => { const data = await api<PublicCatalog>('/api/catalog'); setCatalog(data); setError(''); }, []);
  useEffect(() => { refresh().catch(e => setError(e.message)); }, [refresh]);
  if (!catalog) return <div className="max-w-xl mx-auto p-8 mt-16 bg-white rounded-2xl border border-slate-200"><h1 className="text-xl font-bold">EduCareer</h1><p className="my-4" role="status">{error || 'Đang tải dữ liệu…'}</p>{error && <button className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={() => refresh().catch(e => setError(e.message))}>Thử lại</button>}</div>;
  return <PlatformContext.Provider value={{ catalog, refresh }}>{children}</PlatformContext.Provider>;
}
export function usePlatform() { const value = useContext(PlatformContext); if (!value) throw new Error('Thiếu dữ liệu nền tảng'); return value; }
export function useCareerData() {
  const { catalog } = usePlatform();
  const disc = structuredClone(DISC_TRAITS_INFO), holland = structuredClone(HOLLAND_TRAITS_INFO);
  for (const g of catalog.disc) { const code=g.id as DISCCode; if (disc[code]) { disc[code].name = g.name; disc[code].characteristics = g.description; } }
  for (const g of catalog.holland) { const code=g.id as HollandCode; if (holland[code]) { holland[code].name = g.name; holland[code].description = g.description; } }
  return { UNIVERSITY_MAJORS_LIST: catalog.majors, CAREER_MATRIX_DATA: catalog.careers, DISC_TRAITS_INFO: disc, HOLLAND_TRAITS_INFO: holland };
}
