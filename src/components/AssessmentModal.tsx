import React, { useEffect, useState } from 'react';
import {
  X,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Save,
  Check,
} from 'lucide-react';
import type {
  TestAnswers,
  AssessmentQuestion,
  AssessmentTier,
  AssessmentMode
} from '../types/career.ts';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: AssessmentQuestion[];
  answers: TestAnswers;
  onSelectAnswer: (questionId: number, optionId: string) => void;
  onSubmitTest: () => Promise<void>;
  busy?: boolean;
  feedback?: string;
  onQuickFillDemo?: () => void;
  tier: AssessmentTier;
  setTier: (tier: AssessmentTier) => void;
  mode: AssessmentMode;
  setMode: (mode: AssessmentMode) => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  questions,
  answers,
  onSelectAnswer,
  onSubmitTest,
  onQuickFillDemo,
  tier,
  setTier,
  mode,
  setMode,
  busy = false,
  feedback = ''
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitError,setSubmitError] = useState('');

  useEffect(() => {
    setCurrentStep(0);
    setSubmitError('');
  }, [questions]);

  if (!isOpen) return null;

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep] || questions[0];
  const answeredCount = Object.keys(answers).filter(id => questions.some(q => q.id === Number(id))).length;
  const isAllAnswered = answeredCount >= totalQuestions && totalQuestions > 0;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTierChange = (newTier: AssessmentTier) => {
    setTier(newTier);
    setCurrentStep(0);
  };

  const handleModeChange = (newMode: AssessmentMode) => {
    setMode(newMode);
    setCurrentStep(0);
  };


  return (
    <div lang="vi" translate="no" className="notranslate fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in-50 duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        <fieldset disabled={busy} className="contents">
        {/* Modal Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">
              DISC
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-heading font-extrabold text-slate-900">
                Khám Phá Bản Thân (DISC & Holland RIASEC)
              </h3>
              <p className="text-xs text-slate-500 hidden sm:block">
                Chọn cấp độ và hình thức bài trắc nghiệm DISC, Holland
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onQuickFillDemo && (
              <button
                type="button"
                onClick={onQuickFillDemo}
                title="Điền nhanh bộ câu trả lời mẫu để kiểm tra kết quả ngay"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Điền Mẫu Nhanh</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng bài test"
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cấp độ trắc nghiệm */}
        <div className="px-5 py-3 sm:px-6 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-500 hidden md:inline">Cấp độ:</span>
              <button
                type="button"
                onClick={() => handleTierChange('short')}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  tier === 'short'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-400 ring-1 ring-emerald-400'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                🟢 Rút Gọn (20 câu)
              </button>
              <button
                type="button"
                onClick={() => handleTierChange('standard')}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  tier === 'standard'
                    ? 'bg-amber-50 text-amber-800 border-amber-400 ring-1 ring-amber-400'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                🟡 Tiêu Chuẩn (50 câu)
              </button>
              <button
                type="button"
                onClick={() => handleTierChange('deep')}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  tier === 'deep'
                    ? 'bg-red-50 text-red-800 border-red-400 ring-1 ring-red-400'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                🔴 Chuyên Sâu (70 câu)
              </button>
            </div>
        </div>

        {(feedback || submitError) && <p role="alert" className="px-5 py-3 bg-red-50 text-red-700 text-sm">{feedback || submitError}</p>}
        {busy && <p role="status" className="px-5 py-2 text-sm text-blue-700">Đang lưu bài làm…</p>}
        {/* Bài trắc nghiệm dùng bộ câu hỏi cố định */}
          <>
            {/* Sub-bar: Chọn Chế độ Test (Tích hợp, DISC, Holland) + Tiến độ */}
            <div className="px-5 py-3 sm:px-6 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold">Hình thức:</span>
                <select
                  aria-label="Hình thức bài test"
                  value={mode}
                  onChange={(e) => handleModeChange(e.target.value as AssessmentMode)}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700 cursor-pointer text-xs"
                >
                  <option value="INTEGRATED">Tích Hợp Cả Hai (DISC + Holland - Khuyên dùng)</option>
                  <option value="DISC">Chuyên Biệt: Hành Vi DISC</option>
                  <option value="HOLLAND">Chuyên Biệt: Sở Thích HOLLAND</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span>
                  <span>Câu hỏi </span><strong className="text-slate-900">{currentStep + 1}</strong><span> trên {totalQuestions}</span>
                </span>
                <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  <span>{`${answeredCount}/${totalQuestions} câu (${progressPercent}%)`}</span>
                </span>
              </div>
            </div>

            {/* Stepper Pills */}
            <div className="px-5 py-2 sm:px-6 bg-slate-50 border-b border-slate-100 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1 sm:gap-1.5 py-1 min-w-max">
                {questions.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  const isCurrent = idx === currentStep;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentStep(idx)}
                      className={`w-7 sm:w-8 h-7 sm:h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                        isCurrent
                          ? 'bg-blue-600 text-white ring-2 ring-blue-600/30 shadow-xs'
                          : isAnswered
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                      title={`Câu hỏi ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Body */}
            {currentQuestion && (
              <div className="p-5 sm:p-7 overflow-y-auto flex-1 bg-slate-50/40">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs mb-5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-2 bg-blue-50 text-blue-700">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>
                      {currentQuestion.type === 'DISC'
                        ? 'Đánh giá Phong cách Hành vi (DISC)'
                        : 'Đánh giá Xu hướng Sở thích (Holland)'}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-heading font-extrabold text-slate-900 leading-snug">
                    {currentQuestion.scenario}
                  </h4>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = answers[currentQuestion.id] === option.id;
                    const optionLetters = ['A', 'B', 'C', 'D'];

                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => onSelectAnswer(currentQuestion.id, option.id)}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          translate="no"
                          className={`notranslate w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <span>{optionLetters[idx]}</span>
                        </div>
                        {isSelected && <Check aria-hidden="true" className="w-5 h-5 text-blue-600 shrink-0 mt-1" />}

                        <div className="flex-1">
                          <p
                            className={`text-xs sm:text-sm leading-relaxed ${
                              isSelected ? 'text-slate-900 font-bold' : 'text-slate-700'
                            }`}
                          >
                            {option.text}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Modal Footer Controls */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  disabled={currentStep === 0}
                  onClick={handlePrev}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors ${
                    currentStep === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Câu trước</span>
                </button>

                {currentStep < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    <span>Câu tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : null}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4 text-slate-400" />
                  <span>Lưu tạm & đóng</span>
                </button>

                <button
                  type="button"
                  disabled={!isAllAnswered}
                  onClick={async () => {
                    setSubmitError('');
                    try { await onSubmitTest(); onClose(); }
                    catch(e) { setSubmitError((e as Error).message); }
                  }}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                    isAllAnswered
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Hoàn Thành & Xem Đánh Giá</span>
                </button>
              </div>
            </div>
          </>
        </fieldset>
      </div>
    </div>
  );
};
