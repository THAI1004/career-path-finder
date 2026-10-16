import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  ClipboardList,
  SearchCheck,
  User
} from 'lucide-react';
import type { AssessmentStatus, EvaluationResult } from '../types/career.ts';

interface TestStatusCardProps {
  status: AssessmentStatus;
  answeredCount: number;
  totalQuestions: number;
  studentName: string;
  setStudentName: (name: string) => void;
  onOpenTestModal: () => void;
  onCheckStatus: () => void;
  onResetTest: () => void;
  evaluationResult: EvaluationResult | null;
  statusCheckFeedback: string | null;
}

export const TestStatusCard: React.FC<TestStatusCardProps> = ({
  status,
  answeredCount,
  totalQuestions,
  studentName,
  setStudentName,
  onOpenTestModal,
  onCheckStatus,
  onResetTest,
  evaluationResult,
  statusCheckFeedback
}) => {
  const isCompleted = status === 'completed';
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 transition-all hover:shadow-md">
      {/* Top Banner / Student Name */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
            isCompleted
              ? 'bg-emerald-500 text-white shadow-emerald-500/20'
              : 'bg-blue-600 text-white shadow-blue-500/20'
          }`}>
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6 animate-bounce" />
            ) : (
              <ClipboardList className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-heading font-bold text-slate-900">
                Bài Test Định Hướng Hành Vi & Xu Hướng Nghề Nghiệp
              </h2>
              {/* Dynamic Status Badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs'
                    : answeredCount > 0
                    ? 'bg-amber-50 text-amber-700 border border-amber-300'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ĐÃ HOÀN THÀNH</span>
                  </>
                ) : answeredCount > 0 ? (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>ĐANG LÀM DỞ ({answeredCount}/{totalQuestions})</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>CHƯA LÀM</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Student Name Input */}
        <div className="w-full md:w-72 shrink-0">
          <label htmlFor="student-name-input" className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-400" />
            Họ tên sinh viên / học sinh:
          </label>
          <input
            id="student-name-input"
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Nhập họ và tên..."
            className="w-full px-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Progress & Quick Stats */}
      <div className="my-5">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
          <span>Tiến độ hoàn thành bài test:</span>
          <span className="font-bold text-slate-900">{answeredCount}/{totalQuestions} câu hỏi ({progressPercent}%)</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isCompleted
                ? 'bg-emerald-500'
                : answeredCount > 0
                ? 'bg-amber-500'
                : 'bg-slate-300'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Primary Action Buttons: Mở bài test & Nút kiểm tra tình trạng */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onOpenTestModal}
          className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer ${
            isCompleted
              ? 'bg-slate-800 text-white hover:bg-slate-900'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/20'
          }`}
        >
          {isCompleted ? (
            <>
              <ClipboardList className="w-4 h-4" />
              <span>Xem Lại Câu Trả Lời / Làm Lại</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Mở Bài Test / Bắt Đầu Làm Ngay</span>
            </>
          )}
        </button>

        {/* Nút Kiểm Tra Tình Trạng */}
        <button
          type="button"
          onClick={onCheckStatus}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer shadow-xs"
        >
          <SearchCheck className="w-4 h-4 text-blue-600" />
          <span>Kiểm Tra Tình Trạng Bài Test</span>
        </button>

        {isCompleted && (
          <button
            type="button"
            onClick={onResetTest}
            title="Làm mới toàn bộ câu trả lời"
            className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        )}
      </div>

      {/* Realtime Feedback when Status Button is clicked */}
      {statusCheckFeedback && (
        <div className={`mt-4 p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in-50 duration-200 ${
          isCompleted
            ? 'bg-blue-50/90 text-blue-950 border-blue-200'
            : 'bg-slate-50 text-slate-800 border-slate-200'
        }`}>
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <span className="font-bold">{isCompleted ? 'Trạng thái: ĐÃ LÀM XONG!' : 'Thông báo trạng thái:'} </span>
            {statusCheckFeedback}
          </div>
        </div>
      )}

      {/* Completed summary quick chip */}
      {isCompleted && evaluationResult && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 rounded-b-2xl">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Nhóm nổi trội:</span>
            <span className="font-bold px-2.5 py-1 rounded-md bg-blue-600 text-white shadow-xs">
              {evaluationResult.primaryDisc} - {evaluationResult.analysis.title}
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200">
              Holland: {evaluationResult.primaryHolland} - Kỹ thuật
            </span>
          </div>
          <span className="text-xs text-blue-600 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Đã có đánh giá & gợi ý nghề nghiệp bên dưới
          </span>
        </div>
      )}
    </div>
  );
};
