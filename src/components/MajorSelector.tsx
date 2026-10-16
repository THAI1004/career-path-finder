import React, { useState, useId } from 'react';
import { Search, ChevronDown, Check, Sparkles, BookOpen } from 'lucide-react';
import { useCareerData } from '../platform.tsx';
import type { UniversityMajor } from '../types/career.ts';

interface MajorSelectorProps {
  selectedMajorId: string;
  onSelectMajor: (major: UniversityMajor) => void;
  label?: string;
  sublabel?: string;
  isRevisedSelection?: boolean;
}

export const MajorSelector: React.FC<MajorSelectorProps> = ({
  selectedMajorId,
  onSelectMajor,
  label = 'Ngành học quan tâm:',
  sublabel,
  isRevisedSelection = false
}) => {
  const { UNIVERSITY_MAJORS_LIST } = useCareerData();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const searchInputId = useId();

  const currentMajor = UNIVERSITY_MAJORS_LIST.find(m => m.id === selectedMajorId) || (UNIVERSITY_MAJORS_LIST.length ? { name:'Ngành đã ngừng hoạt động — vui lòng chọn lại', code:'—', category:'', description:'' } : null);

  const categories = ['all', ...Array.from(new Set(UNIVERSITY_MAJORS_LIST.map(m => m.category)))];

  const filteredMajors = UNIVERSITY_MAJORS_LIST.filter(major => {
    const matchesSearch =
      major.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      major.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      major.careerOutcomes.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || major.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (!currentMajor) return <p className="text-sm text-slate-500">Chưa có ngành đang hoạt động.</p>;

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
        <div>
          <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            {isRevisedSelection && <Sparkles className="w-4 h-4 text-blue-600 inline" />}
            {label}
            {isRevisedSelection && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Cho phép chọn lại chuyên ngành
              </span>
            )}
          </label>
          {sublabel && <p className="text-xs text-slate-500 mt-0.5">{sublabel}</p>}
        </div>
      </div>

      {/* Dropdown Trigger Box */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={`w-full flex items-center justify-between px-4 py-3 bg-white border rounded-xl text-left shadow-xs transition-all ${
            isOpen
              ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
              : 'border-slate-300 hover:border-slate-400'
          } ${isRevisedSelection ? 'ring-1 ring-blue-400/40 bg-blue-50/20' : ''}`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 truncate">
                  {currentMajor.name}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-mono font-medium">
                  Mã: {currentMajor.code}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {currentMajor.category} • {currentMajor.description}
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
              isOpen ? 'rotate-180 text-blue-600' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu Overlay */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-40 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
              {/* Search Bar inside Dropdown */}
              <div className="p-3 border-b border-slate-100 bg-slate-50/70">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <label htmlFor={searchInputId} className="sr-only">Tìm kiếm ngành học hoặc mã ngành</label>
                  <input
                    id={searchInputId}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo tên ngành, mã ngành (ví dụ: 7520103, Xây dựng, Cơ khí...)"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    autoFocus
                  />
                </div>

                {/* Categories quick filter */}
                <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                  <span className="text-slate-400 text-xs shrink-0 font-medium">Lọc:</span>
                  {categories.slice(0, 5).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-slate-200/60 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat === 'all' ? 'Tất cả' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Major Items List */}
              <div className="max-h-72 overflow-y-auto p-2 divide-y divide-slate-100">
                {filteredMajors.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-xs sm:text-sm">
                    Không tìm thấy ngành học phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;.
                  </div>
                ) : (
                  filteredMajors.map((major) => {
                    const isSelected = major.id === selectedMajorId;
                    return (
                      <button
                        key={major.id}
                        type="button"
                        onClick={() => {
                          onSelectMajor(major);
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-blue-50/80 border border-blue-200'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                              {major.name}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                              {major.code}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                            {major.category} • {major.description}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs text-slate-400">Đầu ra tiêu biểu:</span>
                            <span className="text-xs text-slate-600 font-medium truncate">
                              {major.careerOutcomes.slice(0, 3).join(', ')}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick Select Popular Engineering/Technical Majors */}
      <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-slate-500 font-medium">Chọn nhanh:</span>
        {UNIVERSITY_MAJORS_LIST.slice(0, 4).map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelectMajor(m)}
            className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
              m.id === selectedMajorId
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>
    </div>
  );
};
