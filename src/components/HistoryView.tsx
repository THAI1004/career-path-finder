import React, { useState } from 'react';
import {
  History,
  Calendar,
  User,
  Trash2,
  Eye,
  FileText,
  RotateCcw,
  Sparkles,
  ArrowRight,
  PlusCircle,
  GraduationCap
} from 'lucide-react';
import type { EvaluationResult } from '../types/career.ts';
import { useCareerData } from '../platform.tsx';

interface HistoryViewProps {
  history: EvaluationResult[];
  onSelectResult: (result: EvaluationResult) => void;
  onDeleteResult: (id: string) => void;
  onClearAllHistory: () => void;
  onStartNewTest: () => void;
  onPrintResult: (result: EvaluationResult) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectResult,
  onDeleteResult,
  onClearAllHistory,
  onStartNewTest,
  onPrintResult
}) => {
  const { DISC_TRAITS_INFO } = useCareerData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter((item) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      (item.studentName && item.studentName.toLowerCase().includes(q)) ||
      item.initialMajorName.toLowerCase().includes(q) ||
      (item.finalMajorName && item.finalMajorName.toLowerCase().includes(q)) ||
      item.primaryDisc.toLowerCase().includes(q) ||
      item.analysis.title.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                Lịch Sử Các Lần Kiểm Tra Hướng Nghiệp
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Theo dõi tiến trình đánh giá hành vi, các chuyên ngành đã lựa chọn và so sánh kết quả qua các đợt khảo sát
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onStartNewTest}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Làm Bài Test Mới</span>
            </button>

            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearAllHistory}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
                title="Xóa toàn bộ lịch sử lưu trữ"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Xóa tất cả</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Bar & Sample Data Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 my-5">
          <div className="w-full sm:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên học sinh, ngành học, nhóm DISC..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">Chưa có bản ghi lịch sử kiểm tra</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
              Sinh viên hãy hoàn thành bài trắc nghiệm hành vi để hệ thống tự động lưu kết quả phân tích và lộ trình ngành học tại đây.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={onStartNewTest}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-sm"
              >
                Bắt đầu làm bài test ngay
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item, index) => {
              const discInfo = DISC_TRAITS_INFO[item.primaryDisc];

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
                >
                  {/* Left: Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        #{index + 1}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {item.testDate}
                      </span>
                      {item.studentName && (
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          <User className="w-3.5 h-3.5 text-blue-600" />
                          {item.studentName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-heading font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.analysis.title}
                      </h4>
                      <span
                        className="px-2.5 py-0.5 rounded-md text-white text-xs font-bold"
                        style={{ backgroundColor: discInfo.color }}
                      >
                        Nhóm {item.primaryDisc}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        Holland {item.primaryHolland} – Kỹ thuật
                      </span>
                    </div>

                    {/* Majors: Initial vs Revised */}
                    <div className="flex items-center gap-2 text-xs text-slate-600 flex-wrap">
                      <span className="flex items-center gap-1 font-medium">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        Ngành ban đầu: <strong>{item.initialMajorName}</strong>
                      </span>
                      {item.finalMajorName && item.finalMajorName !== item.initialMajorName && (
                        <>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                          <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Chuyên ngành sau đánh giá: {item.finalMajorName}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Mini DISC Percentages bar */}
                    <div className="flex items-center gap-3 pt-1">
                      {(['D', 'I', 'S', 'C'] as const).map((trait) => (
                        <div key={trait} className="flex items-center gap-1 text-[11px] font-mono">
                          <span className="font-bold text-slate-500">{trait}:</span>
                          <span className="font-extrabold text-slate-800">{item.discPercentages[trait]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                    <button
                      type="button"
                      onClick={() => onSelectResult(item)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Xem Lại Báo Cáo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onPrintResult(item)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold text-xs transition-all cursor-pointer"
                      title="In phiếu hướng nghiệp"
                    >
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span className="hidden sm:inline">In Phiếu</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteResult(item.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                      title="Xóa bản ghi này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
