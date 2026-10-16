import React from 'react';
import {
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  Compass,
  ArrowRight,
  TrendingUp,
  Briefcase,
  BookOpen,
  CheckCircle2,
  FileCheck,
  Target,
  Heart,
  Globe,
  DollarSign
} from 'lucide-react';
import type { EvaluationResult, UniversityMajor, DISCCode } from '../types/career.ts';
import { useCareerData } from '../platform.tsx';
import { MajorSelector } from './MajorSelector.tsx';

interface EvaluationSummaryProps {
  evaluation: EvaluationResult;
  currentMajorId: string;
  onSelectRevisedMajor: (major: UniversityMajor) => void;
  onViewRecommendations: () => void;
}

export const EvaluationSummary: React.FC<EvaluationSummaryProps> = ({
  evaluation,
  currentMajorId,
  onSelectRevisedMajor,
  onViewRecommendations
}) => {
  const { DISC_TRAITS_INFO, HOLLAND_TRAITS_INFO } = useCareerData();
  const { analysis, discPercentages, primaryDisc, primaryHolland, highSchoolPlan } = evaluation;

  const discKeys: DISCCode[] = ['D', 'I', 'S', 'C'];

  return (
    <div className="space-y-6">
      {evaluation.notes && <section className="p-5 bg-blue-50 border border-blue-200 rounded-2xl"><h3 className="font-bold mb-2">Nhận xét của tư vấn viên</h3><p className="text-sm whitespace-pre-wrap">{evaluation.notes}</p></section>}
      {/* Clean White-Blue Result Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-xs">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                KẾT QUẢ ĐÁNH GIÁ HÀNH VI SINH VIÊN
              </span>
              <span className="text-xs text-slate-500">
                Thực hiện: {evaluation.testDate}
              </span>
              {evaluation.assessmentTier && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {evaluation.assessmentTier === 'short'
                    ? 'Bản Rút Gọn (20 câu)'
                    : evaluation.assessmentTier === 'standard'
                    ? 'Bản Tiêu Chuẩn (50 câu)'
                    : 'Bản Chuyên Sâu (70 câu)'}
                </span>
              )}
            </div>

            {evaluation.studentName && (
              <span className="text-xs sm:text-sm font-semibold bg-slate-100 px-3 py-1 rounded-full text-slate-800 border border-slate-200">
                Sinh viên: <strong>{evaluation.studentName}</strong>
              </span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
                  {analysis.title}
                </h3>
                <span className="px-3 py-1 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 text-white shadow-xs">
                  Nhóm {primaryDisc}
                </span>
                <span className="px-3 py-1 rounded-xl text-xs sm:text-sm font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Holland: {HOLLAND_TRAITS_INFO[primaryHolland].name}
                </span>
              </div>
              <p className="text-sm sm:text-base text-blue-700 font-semibold max-w-2xl">
                &ldquo;{analysis.tagline}&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                {analysis.summary}
              </p>
            </div>

            {/* Quick action button to scroll down to recommendations */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={onViewRecommendations}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>Xem Ngay Gợi Ý Nghề Nghiệp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 DISC Progress Bars - Clean White-Blue Theme */}
          <div className="mt-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              Tỷ Lệ Phân Bổ 4 Nhóm Hành Vi DISC Của Bạn
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {discKeys.map((key) => {
                const info = DISC_TRAITS_INFO[key];
                const percentage = discPercentages[key] || 0;
                const isDominant = key === primaryDisc;

                return (
                  <div
                    key={key}
                    className={`p-4 rounded-2xl border transition-all ${
                      isDominant
                        ? 'bg-blue-50/60 border-blue-300 ring-1 ring-blue-400/40'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: info.color }}
                        />
                        {info.name}
                      </span>
                      <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                        {percentage}%
                      </span>
                    </div>

                    {/* Bar */}
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: info.color
                        }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-tight">
                      {info.characteristics}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ĐẶC BIỆT: Khung Định Hướng Tổ Hợp Môn Học THPT theo định hướng tuyển sinh 2026 */}
      {highSchoolPlan && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>TRỌNG TÂM ĐỀ TÀI: LỰA CHỌN TỔ HỢP MÔN HỌC THPT THEO ĐỊNH HƯỚNG TUYỂN SINH 2026</span>
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
                Gợi Ý Phương Án Tổ Hợp Môn Học Lớp 10 THPT Phù Hợp Nhất
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Phương án 1: Chính thức */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-600 text-white uppercase tracking-wider">
                  Phương án 1 (Ưu tiên số 1)
                </span>
                <span className="text-xs font-mono font-bold text-emerald-800">
                  {highSchoolPlan.primaryCombination}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-3">
                {highSchoolPlan.name}
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-slate-600 block mb-1">4 môn học lựa chọn tối ưu:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {highSchoolPlan.recommendedElectives.map((sub, i) => (
                      <span key={i} className="px-3 py-1 rounded-xl bg-white border border-emerald-300 font-bold text-emerald-900 shadow-2xs">
                        ✓ {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-slate-600 block mb-1">3 cụm chuyên đề học tập:</span>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {highSchoolPlan.studyTopics.map((top, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-lg bg-emerald-100/70 text-emerald-800 font-medium">
                        • {top}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phương án 2: Dự phòng */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-700 text-white uppercase tracking-wider">
                  Phương án 2 (Dự phòng)
                </span>
                <span className="text-xs text-slate-500 font-medium">Trường hợp lớp chuyên bị đầy</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 mb-3">
                Phương án mở rộng liên ngành
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-slate-600 block mb-1">4 môn học lựa chọn dự phòng:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {highSchoolPlan.backupElectives.map((sub, i) => (
                      <span key={i} className="px-3 py-1 rounded-xl bg-white border border-slate-300 font-bold text-slate-800 shadow-2xs">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                  <strong className="text-slate-900">Căn cứ sư phạm:</strong> {highSchoolPlan.rationale}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trait Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Điểm mạnh cốt lõi */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-heading font-bold text-slate-900">
                Điểm Mạnh Cốt Lõi Trong Môi Trường Kỹ Thuật
              </h4>
              <p className="text-xs text-slate-500">Phát huy trong quá trình học và làm việc thực tế</p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {analysis.strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lời khuyên phát triển & Môi trường lý tưởng */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-heading font-bold text-slate-900">
                  Môi Trường Làm Việc Phù Hợp & Lời Khuyên
                </h4>
                <p className="text-xs text-slate-500">Giúp bạn phát triển sự nghiệp bền vững</p>
              </div>
            </div>

            <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
              <strong className="text-slate-900">Môi trường lý tưởng:</strong> {analysis.idealWorkEnvironment}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Khuyến nghị rèn luyện:</span>
              {analysis.growthAdvice.map((adv, i) => (
                <div key={i} className="text-xs text-slate-600 flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KHUNG PHẢN TƯ TÍCH HỢP SWOT & IKIGAI (Giai Đoạn 3: Tư Vấn Chuyên Sâu) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-heading font-bold text-slate-900">
              Giai Đoạn 3: Khung Phản Tư Tích Hợp SWOT & IKIGAI
            </h4>
            <p className="text-xs text-slate-500">
              Hỗ trợ học sinh và giáo viên đối chiếu năng lực, sở thích với điều kiện thực tế của gia đình và xã hội
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* SWOT Overview */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
            <span className="font-bold text-slate-800 uppercase tracking-wider block border-b pb-2">
              Khung Phân Tích SWOT Cá Nhân (Định Hướng)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <strong className="text-emerald-700 block mb-1">S - Điểm mạnh:</strong>
                <p className="text-slate-600">Hành vi {primaryDisc} nổi trội, tư duy logic kỹ thuật.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <strong className="text-amber-700 block mb-1">W - Điểm cần cải thiện:</strong>
                <p className="text-slate-600">Rèn luyện thêm ngoại ngữ và kỹ năng lắng nghe đồng đội.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <strong className="text-blue-700 block mb-1">O - Cơ hội:</strong>
                <p className="text-slate-600">Nhu cầu kỹ sư kỹ thuật & công nghệ tại Hà Tĩnh và cả nước tăng cao.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <strong className="text-red-700 block mb-1">T - Thách thức:</strong>
                <p className="text-slate-600">Áp lực điểm chuẩn tuyển sinh và biến động yêu cầu thị trường.</p>
              </div>
            </div>
          </div>

          {/* IKIGAI 4 Circles */}
          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 text-xs space-y-3">
            <span className="font-bold text-indigo-900 uppercase tracking-wider block border-b border-indigo-200 pb-2">
              Giao Thoa Mô Hình IKIGAI Định Hướng Nghề
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-indigo-100 flex items-start gap-2">
                <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Điều bạn yêu thích:</strong>
                  <span className="text-slate-600">Trải nghiệm kỹ thuật & công nghệ mới.</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-indigo-100 flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Điều bạn giỏi:</strong>
                  <span className="text-slate-600">Tố chất {analysis.title}.</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-indigo-100 flex items-start gap-2">
                <Globe className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Điều xã hội cần:</strong>
                  <span className="text-slate-600">Lực lượng kỹ thuật hạ tầng & sản xuất.</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-indigo-100 flex items-start gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Điều mang lại thu nhập:</strong>
                  <span className="text-slate-600">Mức lương hấp dẫn 15 - 40 triệu VNĐ.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YÊU CẦU: Lựa chọn lại chuyên ngành sau khi có đánh giá */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-blue-200 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              Lựa Chọn & Điều Chỉnh Chuyên Ngành Đại Học Sau Đánh Giá
            </h4>
            <p className="text-xs text-slate-500">
              Mặc định là chuyên ngành bạn đã chọn từ trước. Bạn hoàn toàn có thể chọn lại chuyên ngành khác tại đây để xem gợi ý nghề tương ứng.
            </p>
          </div>
        </div>

        {/* Dropdown Box để chọn lại chuyên ngành */}
        <div className="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200">
          <MajorSelector
            selectedMajorId={currentMajorId}
            onSelectMajor={onSelectRevisedMajor}
            label="Chuyên ngành đại học của bạn:"
            isRevisedSelection={true}
          />

          <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="font-semibold text-slate-800">Chuyên ngành hiện tại:</span>
              <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 font-bold border border-blue-200">
                {evaluation.finalMajorName || evaluation.initialMajorName}
              </span>
            </div>
            <span className="text-blue-700 font-medium flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Đã đồng bộ hóa với hệ thống gợi ý nghề nghiệp & tổ hợp môn học
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
