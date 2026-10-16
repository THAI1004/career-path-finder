import React, { useState, useId } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  GraduationCap,
  Building2,
  DollarSign,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  BookmarkCheck
} from 'lucide-react';
import type { CareerMatrixItem, DISCCode, HollandCode } from '../types/career.ts';
import { useCareerData } from '../platform.tsx';

interface CareerRecommendationsProps {
  careers: CareerMatrixItem[];
  userPrimaryDisc?: DISCCode;
  userPrimaryHolland?: HollandCode;
  selectedMajorName?: string;
  onSelectCareerDetail: (career: CareerMatrixItem) => void;
}

export const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({
  careers,
  userPrimaryDisc,
  userPrimaryHolland,
  selectedMajorName,
  onSelectCareerDetail
}) => {
  const { DISC_TRAITS_INFO } = useCareerData();
  const [selectedDiscFilter, setSelectedDiscFilter] = useState<string>(userPrimaryDisc || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHollandFilter, setSelectedHollandFilter] = useState<string>(userPrimaryHolland || 'all');
  const searchInputId = useId();
  const discSelectId = useId();
  const hollandSelectId = useId();

  const clearFilters = () => {
    setSelectedDiscFilter('all');
    setSelectedHollandFilter('all');
    setSearchQuery('');
  };

  // Filter career matrix items
  const filteredCareers = careers.filter(item => {
    // DISC filter
    if (selectedDiscFilter !== 'all' && item.disc !== selectedDiscFilter) {
      return false;
    }
    // Holland filter
    if (selectedHollandFilter !== 'all' && item.holland !== selectedHollandFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchJob = item.jobTitle.toLowerCase().includes(q);
      const matchMajor = item.universityMajor.toLowerCase().includes(q);
      const matchCode = item.majorCode.toLowerCase().includes(q);
      const matchCombo = item.admissionCombinations.some(c => c.toLowerCase().includes(q));
      const matchSkill = item.keySkills.some(s => s.toLowerCase().includes(q));
      if (!matchJob && !matchMajor && !matchCode && !matchCombo && !matchSkill) {
        return false;
      }
    }
    return true;
  });

  return (
    <div id="career-recommendations-section" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-7">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
                Gợi Ý Nghề Nghiệp & Ngành Đào Tạo Đại Học Tương Ứng
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Phối hợp giữa ĐẦU VÀO 1 (Holland), ĐẦU VÀO 2 (Tính cách DISC) để xuất ra Nghề nghiệp, Ngành đào tạo và Tổ hợp xét tuyển
              </p>
            </div>
          </div>
        </div>

        {/* Selected Major Badge Indicator */}
        {selectedMajorName && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs">
            <span className="text-slate-500">Chuyên ngành ưu tiên:</span>
            <strong className="text-blue-700">{selectedMajorName}</strong>
          </div>
        )}
      </div>

      {/* Filter Toolbar: Dropdown Box tính cách (D, I, S, C), Tìm kiếm */}
      <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* YÊU CẦU: Gợi ý các nghề nghiệp dựa vào tính cách ( Quyết đoán - Ảnh Hưởng - Ổn Định - Tuân thủ )- dropdown box */}
          <div>
            <label htmlFor={discSelectId} className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              Lọc theo Tính Cách DISC (Dropdown box):
            </label>
            <select
              id={discSelectId}
              value={selectedDiscFilter}
              onChange={(e) => setSelectedDiscFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
            >
              <option value="all">Tất cả các nhóm tính cách (D, I, S, C)</option>
              <option value="D">D – Quyết đoán (Dominance - Thống trị, chỉ huy)</option>
              <option value="I">I – Ảnh hưởng (Influence - Thuyết phục, truyền cảm hứng)</option>
              <option value="S">S – Ổn định (Steadiness - Kiên định, tin cậy, chu đáo)</option>
              <option value="C">C – Tuân thủ (Conscientiousness - Kỷ luật, chuẩn xác)</option>
            </select>
          </div>

          {/* Tìm kiếm nghề hoặc ngành đào tạo */}
          <div>
            <label htmlFor={searchInputId} className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              Tìm kiếm nghề nghiệp / ngành học / tổ hợp:
            </label>
            <div className="relative">
              <input
                id={searchInputId}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập tên nghề, ngành, A00, D07, 7520103..."
                className="w-full pl-3 pr-8 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Lọc theo Nhóm Holland */}
          <div>
            <label htmlFor={hollandSelectId} className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
              Lọc theo Nhóm Holland RIASEC:
            </label>
            <select
              id={hollandSelectId}
              value={selectedHollandFilter}
              onChange={(e) => setSelectedHollandFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
            >
              <option value="all">Tất cả nhóm Holland</option>
              <option value="R">R – KỸ THUẬT (Realistic - Trọng tâm theo chuẩn)</option>
              <option value="I">I – NGHIÊN CỨU (Investigative)</option>
              <option value="E">E – QUẢN LÝ (Enterprising)</option>
              <option value="S">S – XÃ HỘI (Social)</option>
              <option value="C">C – NGHIỆP VỤ (Conventional)</option>
            </select>
          </div>
        </div>

        {/* Quick select buttons for the 4 DISC traits */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-200/60">
          <span className="text-xs text-slate-500 font-semibold">Chọn nhanh theo tính cách:</span>
          {(['all', 'D', 'I', 'S', 'C'] as const).map((trait) => {
            const isSelected = selectedDiscFilter === trait;
            if (trait === 'all') {
              return (
                <button
                  key="all"
                  type="button"
                  onClick={clearFilters}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                    isSelected
                      ? 'bg-slate-800 text-white border-slate-800 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Tất cả ({careers.length})
                </button>
              );
            }

            const info = DISC_TRAITS_INFO[trait];
            return (
              <button
                key={trait}
                type="button"
                onClick={() => setSelectedDiscFilter(trait)}
                className={`text-xs px-3 py-1 rounded-lg border font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'text-white shadow-xs scale-105'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
                style={{
                  backgroundColor: isSelected ? info.color : undefined,
                  borderColor: isSelected ? info.color : undefined
                }}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: isSelected ? 'white' : info.color }}
                />
                <span>{info.name}</span>
                {userPrimaryDisc === trait && (
                  <span className="text-[10px] px-1 py-0.2 rounded bg-white/30 text-white font-extrabold uppercase">
                    Bạn
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Total match counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
        <span>
          Tìm thấy <strong className="text-slate-900 font-bold">{filteredCareers.length}</strong>
          {filteredCareers.length !== careers.length && (
            <span> / {careers.length}</span>
          )}{' '}
          nghề nghiệp & ngành đào tạo phù hợp
        </span>
        {userPrimaryDisc && selectedDiscFilter === userPrimaryDisc && (
          <span className="text-blue-600 font-semibold flex items-center gap-1">
            <BookmarkCheck className="w-3.5 h-3.5" />
            Đang hiển thị nhóm phù hợp với kết quả trắc nghiệm của bạn
          </span>
        )}
      </div>

      {/* Grid of Career & University Training Cards */}
      {filteredCareers.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-600 text-sm font-medium">
            Không tìm thấy kết quả nào phù hợp với bộ lọc hiện tại.
          </p>
          <button
            type="button"
            onClick={() => {
              clearFilters();
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            Xóa bộ lọc & Xem tất cả
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCareers.map((item) => {
            const discInfo = DISC_TRAITS_INFO[item.disc];
            const isUserTraitMatch = userPrimaryDisc === item.disc;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group relative ${
                  isUserTraitMatch
                    ? 'border-blue-300 ring-1 ring-blue-400/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Top Badges: HOLLAND & DISC */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      {item.hollandLabel}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-bold text-white shadow-2xs"
                      style={{ backgroundColor: discInfo.color }}
                    >
                      {item.discLabel}
                    </span>
                  </div>

                  {/* ĐẦU RA 1: NGHỀ NGHIỆP GỢI Ý */}
                  <h4 className="text-base sm:text-lg font-heading font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.jobTitle}
                  </h4>

                  {/* ĐẦU RA 2: NGÀNH ĐÀO TẠO ĐẠI HỌC + MÃ NGÀNH */}
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                      Ngành Đào Tạo Đại Học
                    </div>
                    <div className="text-sm font-bold text-slate-800 flex items-center justify-between gap-1">
                      <span>{item.universityMajor}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-100/70 text-blue-800 font-mono font-semibold shrink-0">
                        Mã: {item.majorCode}
                      </span>
                    </div>
                  </div>

                  {/* ĐẦU RA 3: TỔ HỢP XÉT TUYỂN THAM KHẢO */}
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-slate-500">Tổ hợp xét tuyển:</span>
                    {item.admissionCombinations.map((combo) => (
                      <span
                        key={combo}
                        className="text-xs px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 font-mono"
                      >
                        {combo}
                      </span>
                    ))}
                  </div>

                  {/* Mô tả công việc ngắn */}
                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Meta & Action Button */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      Thu nhập:
                    </span>
                    <span className="font-bold text-slate-800">{item.averageSalaryRange}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      Trường tiêu biểu:
                    </span>
                    <span className="text-slate-700 font-medium truncate max-w-[170px]" title={item.topUniversities.join(', ')}>
                      {item.topUniversities[0]}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectCareerDetail(item)}
                    className="w-full mt-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all cursor-pointer group-hover:bg-blue-600 group-hover:text-white"
                  >
                    <span>Xem Chi Tiết Ngành & Lộ Trình</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
