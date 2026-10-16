import React, { useState, useId } from 'react';
import { Table, Search, Filter, Download, ExternalLink, Printer } from 'lucide-react';
import { useCareerData } from '../platform.tsx';
import type { CareerMatrixItem } from '../types/career.ts';

interface CareerMatrixTableViewProps {
  onSelectCareerDetail: (item: CareerMatrixItem) => void;
}

export const CareerMatrixTableView: React.FC<CareerMatrixTableViewProps> = ({
  onSelectCareerDetail
}) => {
  const { CAREER_MATRIX_DATA, DISC_TRAITS_INFO } = useCareerData();
  const [selectedDisc, setSelectedDisc] = useState<string>('all');
  const [selectedHolland, setSelectedHolland] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const searchTableInputId = useId();
  const discTableSelectId = useId();
  const hollandTableSelectId = useId();

  const filteredData = CAREER_MATRIX_DATA.filter((item) => {
    if (selectedDisc !== 'all' && item.disc !== selectedDisc) return false;
    if (selectedHolland !== 'all' && item.holland !== selectedHolland) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const match =
        item.jobTitle.toLowerCase().includes(q) ||
        item.universityMajor.toLowerCase().includes(q) ||
        item.majorCode.toLowerCase().includes(q) ||
        item.admissionCombinations.some((c) => c.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const exportCSV = () => {
    const headers = [
      'STT',
      'ĐẦU VÀO 1 (NHÓM HOLLAND)',
      'ĐẦU VÀO 2 (NHÓM DISC)',
      'ĐẦU RA 1 (NGHỀ NGHIỆP GỢI Ý)',
      'ĐẦU RA 2 (NGÀNH ĐÀO TẠO ĐẠI HỌC)',
      'MÃ NGÀNH',
      'ĐẦU RA 3 (TỔ HỢP XÉT TUYỂN THAM KHẢO)',
      'MỨC LƯƠNG TRUNG BÌNH'
    ];

    const rows = filteredData.map((item, idx) => [
      idx + 1,
      `"${item.hollandLabel}"`,
      `"${item.discLabel}"`,
      `"${item.jobTitle}"`,
      `"${item.universityMajor}"`,
      `"${item.majorCode}"`,
      `"${item.admissionCombinations.join(', ')}"`,
      `"${item.averageSalaryRange}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ma_tran_nghe_nghiep_holland_disc.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Table Header / Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Table className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                Bảng Ma Trận Hướng Nghiệp & Ngành Đào Tạo Đại Học
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Quy chuẩn đối chiếu giữa Nhóm Holland, Tính cách hành vi DISC và Các ngành đào tạo kèm mã ngành & tổ hợp xét tuyển
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Xuất File CSV</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>In Bảng Ma Trận</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <label htmlFor={discTableSelectId} className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              Lọc theo Nhóm DISC:
            </label>
            <select
              id={discTableSelectId}
              value={selectedDisc}
              onChange={(e) => setSelectedDisc(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">Tất cả nhóm DISC (D, I, S, C)</option>
              <option value="D">D – Quyết đoán</option>
              <option value="I">I – Ảnh hưởng</option>
              <option value="S">S – Ổn định</option>
              <option value="C">C – Tuân thủ</option>
            </select>
          </div>

          <div>
            <label htmlFor={hollandTableSelectId} className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amber-600" />
              Lọc theo Nhóm Holland:
            </label>
            <select
              id={hollandTableSelectId}
              value={selectedHolland}
              onChange={(e) => setSelectedHolland}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">Tất cả nhóm Holland</option>
              <option value="R">R – KỸ THUẬT</option>
              <option value="I">I – NGHIÊN CỨU</option>
              <option value="E">E – QUẢN LÝ</option>
              <option value="S">S – XÃ HỘI</option>
              <option value="C">C – NGHIỆP VỤ</option>
            </select>
          </div>

          <div>
            <label htmlFor={searchTableInputId} className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              Tìm kiếm nhanh:
            </label>
            <input
              id={searchTableInputId}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập tên nghề, ngành, tổ hợp..."
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* The Exact Specification Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-xs font-extrabold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">STT</th>
                <th className="py-3.5 px-4">ĐẦU VÀO 1 (NHÓM HOLLAND)</th>
                <th className="py-3.5 px-4">ĐẦU VÀO 2 (NHÓM DISC)</th>
                <th className="py-3.5 px-4">ĐẦU RA 1 (NGHỀ NGHIỆP GỢI Ý)</th>
                <th className="py-3.5 px-4">ĐẦU RA 2 (NGÀNH ĐÀO TẠO ĐẠI HỌC)</th>
                <th className="py-3.5 px-4">ĐẦU RA 3 (TỔ HỢP XÉT TUYỂN THAM KHẢO)</th>
                <th className="py-3.5 px-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    Không tìm thấy bản ghi nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => {
                  const discInfo = DISC_TRAITS_INFO[item.disc];

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                      onClick={() => onSelectCareerDetail(item)}
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-400">
                        {index + 1}
                      </td>

                      {/* ĐẦU VÀO 1 */}
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-semibold text-xs whitespace-nowrap">
                          {item.hollandLabel}
                        </span>
                      </td>

                      {/* ĐẦU VÀO 2 */}
                      <td className="py-3.5 px-4 font-bold">
                        <span
                          className="px-2.5 py-1 rounded-md text-white text-xs font-bold whitespace-nowrap shadow-2xs"
                          style={{ backgroundColor: discInfo.color }}
                        >
                          {item.discLabel}
                        </span>
                      </td>

                      {/* ĐẦU RA 1 */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.jobTitle}
                      </td>

                      {/* ĐẦU RA 2 */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">
                          {item.universityMajor}
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">
                          Mã: {item.majorCode}
                        </span>
                      </td>

                      {/* ĐẦU RA 3 */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {item.admissionCombinations.map((combo) => (
                            <span
                              key={combo}
                              className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono font-bold text-xs border border-emerald-200"
                            >
                              {combo}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Thao tác */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCareerDetail(item);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-100 transition-colors"
                          title="Xem chi tiết nghề nghiệp"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
