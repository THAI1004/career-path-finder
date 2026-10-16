import React from 'react';
import { X, Printer, Compass, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import type { EvaluationResult } from '../types/career.ts';
import { useCareerData } from '../platform.tsx';

interface PrintReportModalProps {
  result: EvaluationResult | null;
  onClose: () => void;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({ result, onClose }) => {
  const { DISC_TRAITS_INFO } = useCareerData();
  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  const discInfo = DISC_TRAITS_INFO[result.primaryDisc];
  const highSchoolPlan = result.highSchoolPlan;

  return (
    <div className="report-overlay fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in-50 duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[96vh]">
        {/* Controls - Hidden when printing */}
        <div className="no-print p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-slate-800 text-sm">
              Phiếu Tư Vấn Hướng Nghiệp & Phương Án Môn Học THPT (Khổ A4)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>In Phiếu Ngay (A4)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div id="printable-career-report" className="p-8 sm:p-12 overflow-y-auto bg-white text-slate-900 font-sans">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5 mb-5">
            <div>
              <div className="flex items-center gap-2 text-blue-700 mb-1">
                <Compass className="w-5 h-5" />
                <span className="text-[11px] font-black tracking-widest uppercase">
                  EduCareer • Đề Tài NCKH KHKT 2026–2027 (Thành Sen, Hà Tĩnh)
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                Phiếu Tư Vấn Định Hướng Nghề Nghiệp & Chọn Môn Học THPT
              </h1>
              <p className="text-xs text-slate-500">
                Mô hình tích hợp DISC & Holland RIASEC kết nối định hướng tuyển sinh 2026
              </p>
            </div>

            <div className="text-right text-xs text-slate-500 font-mono">
              <p>Mã hồ sơ: #{result.id.slice(0, 8)}</p>
              <p>Ngày đánh giá: {result.testDate}</p>
              {result.assessmentTier && (
                <p className="font-semibold text-slate-700">
                  {result.assessmentTier === 'short'
                    ? 'Bản Rút Gọn (20 câu)'
                    : result.assessmentTier === 'standard'
                    ? 'Bản Tiêu Chuẩn (50 câu)'
                    : 'Bản Chuyên Sâu (70 câu)'}
                </p>
              )}
            </div>
          </div>

          {/* Student & Major Information */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-5 text-xs">
            <div>
              <p className="text-slate-500">Học sinh / Sinh viên:</p>
              <p className="text-sm font-bold text-slate-900">{result.studentName || 'Học sinh khảo sát'}</p>
            </div>
            <div>
              <p className="text-slate-500">Ngành dự kiến ban đầu:</p>
              <p className="text-sm font-bold text-blue-700">{result.initialMajorName}</p>
            </div>
            <div>
              <p className="text-slate-500">Chuyên ngành sau đánh giá:</p>
              <p className="text-sm font-bold text-emerald-700">{result.finalMajorName || result.initialMajorName}</p>
            </div>
            <div>
              <p className="text-slate-500">Tổ hợp tính cách:</p>
              <p className="text-sm font-bold text-slate-900">
                {result.primaryDisc}{result.secondaryDisc} • Holland {result.primaryHolland}
              </p>
            </div>
          </div>

          {/* DISC Breakdown */}
          <div className="mb-5">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
              1. Tỷ Lệ Điểm Số Hành Vi DISC
            </h3>
            <div className="grid grid-cols-4 gap-2.5">
              {(['D', 'I', 'S', 'C'] as const).map((trait) => {
                const info = DISC_TRAITS_INFO[trait];
                return (
                  <div key={trait} className="p-2.5 rounded-lg border border-slate-200 text-center">
                    <span className="text-[11px] font-bold text-slate-700 block">{info.name}</span>
                    <span className="text-lg font-black font-mono mt-0.5 block" style={{ color: info.color }}>
                      {result.discPercentages[trait]}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TRỌNG TÂM: Phương Án Chọn Môn Học THPT theo định hướng tuyển sinh 2026 */}
          {highSchoolPlan && (
            <div className="mb-5 p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/30 text-xs">
              <h3 className="text-xs font-black text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                2. Khuyến Nghị Phương Án Lựa Chọn Môn Học THPT Lớp 10 (Định Hướng Tuyển Sinh 2026)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white border border-emerald-300">
                  <strong className="text-emerald-800 block mb-1">Phương án 1 (Ưu tiên chính thức):</strong>
                  <p className="text-slate-800 font-bold mb-1">
                    {highSchoolPlan.recommendedElectives.join(' • ')}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Chuyên đề: {highSchoolPlan.studyTopics.join(', ')}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200">
                  <strong className="text-slate-700 block mb-1">Phương án 2 (Dự phòng):</strong>
                  <p className="text-slate-700 font-semibold mb-1">
                    {highSchoolPlan.backupElectives.join(' • ')}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Căn cứ: {highSchoolPlan.rationale}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Suggested Careers Table */}
          <div className="mb-5">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
              3. Danh Mục Nghề Nghiệp & Ngành Đào Tạo Đại Học Gợi Ý
            </h3>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                  <th className="py-1.5 px-2.5">Vị Trí Nghề Nghiệp</th>
                  <th className="py-1.5 px-2.5">Ngành Đào Tạo Đại Học</th>
                  <th className="py-1.5 px-2.5">Mã Ngành</th>
                  <th className="py-1.5 px-2.5">Tổ Hợp Xét Tuyển</th>
                  <th className="py-1.5 px-2.5">Thu Nhập Tham Khảo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {result.recommendedCareers.slice(0, 5).map((c) => (
                  <tr key={c.id}>
                    <td className="py-1.5 px-2.5 font-bold text-slate-900">{c.jobTitle}</td>
                    <td className="py-1.5 px-2.5 text-slate-800">{c.universityMajor}</td>
                    <td className="py-1.5 px-2.5 font-mono">{c.majorCode}</td>
                    <td className="py-1.5 px-2.5 font-mono font-bold text-emerald-700">
                      {c.admissionCombinations.join(', ')}
                    </td>
                    <td className="py-1.5 px-2.5">{c.averageSalaryRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Giai đoạn 3: Nhận xét tư vấn chuyên sâu & Phản tư */}
          <div className="mb-5 p-3.5 rounded-xl border border-slate-200 text-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              4. Nhận Xét & Kết Luận Của Giáo Viên Tư Vấn (Giai Đoạn 3 - SWOT & Ikigai)
            </h3>
            <div className="min-h-[50px] border-b border-dashed border-slate-300 pb-1 text-slate-500 italic">
              {result.notes || '(Ghi chú về năng lực học tập thực tế, điều kiện hoàn cảnh và phương án môn học thống nhất):'}
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-center text-xs">
            <div>
              <p className="font-bold text-slate-700 mb-14">HỌC SINH XÁC NHẬN</p>
              <p className="font-semibold text-slate-900">{result.studentName || '(Ký và ghi rõ họ tên)'}</p>
            </div>
            <div>
              <p className="font-bold text-slate-700 mb-14">Ý KIẾN PHỤ HUYNH</p>
              <p className="font-semibold text-slate-900">(Ký và ghi rõ họ tên)</p>
            </div>
            <div>
              <p className="font-bold text-slate-700 mb-14">GIÁO VIÊN / CHUYÊN VIÊN TƯ VẤN</p>
              <p className="font-semibold text-slate-900">(Ký và xác nhận)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
