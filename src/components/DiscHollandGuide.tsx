import React from 'react';
import { BookOpen, Compass, Zap, Shield, Users, Award } from 'lucide-react';
import { useCareerData, usePlatform } from '../platform.tsx';
import type { DISCCode, HollandCode } from '../types/career.ts';

export const DiscHollandGuide: React.FC = () => {
  const { DISC_TRAITS_INFO, HOLLAND_TRAITS_INFO } = useCareerData();
  const { catalog } = usePlatform();
  const discKeys = catalog.disc.map(g => g.id as DISCCode);
  const hollandKeys = catalog.holland.map(g => g.id as HollandCode);

  return (
    <div className="space-y-8">
      {/* Intro Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              Cẩm Nang Phương Pháp Luận: Mô Hình Hành Vi DISC & Holland
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Khám phá cơ sở khoa học giúp bạn thấu hiểu bản thân và đưa ra quyết định chọn ngành học chính xác nhất
            </p>
          </div>
        </div>

        {/* Section 1: DISC */}
        <div className="my-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-6 bg-blue-600 rounded-full inline-block" />
            <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900">
              1. Mô Hình 4 Nhóm Tính Cách & Hành Vi DISC
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            Mô hình DISC được phát triển bởi tiến sĩ tâm lý học William Moulton Marston tại Đại học Harvard.
            Đây là công cụ tiêu chuẩn toàn cầu được các tập đoàn kỹ thuật, sản xuất và công nghệ áp dụng để bố trí
            đúng người vào đúng vị trí công việc:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {discKeys.map((key) => {
              const info = DISC_TRAITS_INFO[key];
              return (
                <div
                  key={key}
                  className="p-5 rounded-2xl border transition-all hover:shadow-md"
                  style={{
                    backgroundColor: info.bgLight,
                    borderColor: info.borderColor
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-sm font-bold text-white px-3 py-1 rounded-lg shadow-2xs"
                      style={{ backgroundColor: info.color }}
                    >
                      {info.name}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-500">
                      {info.fullName}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                    {info.characteristics}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-slate-600">Từ khóa then chốt:</span>
                    {info.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded bg-white text-slate-800 font-medium shadow-2xs"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Holland */}
        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-6 bg-amber-500 rounded-full inline-block" />
            <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900">
              2. Mô Hình Định Hướng Nghề Nghiệp Holland (RIASEC)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            Thuyết hướng nghiệp của John Holland chia sở thích và môi trường nghề nghiệp thành 6 nhóm. Trong đó,
            nhóm <strong>R – Realistic (Kỹ thuật - Thực tế)</strong> là trọng tâm của hệ thống, kết hợp cùng các
            nhóm I, A, S, E, C để tạo nên lộ trình đào tạo tối ưu:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hollandKeys.map((key) => {
              const hInfo = HOLLAND_TRAITS_INFO[key];
              return (
                <div key={key} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${hInfo.badgeColor}`}>
                      {hInfo.name}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">{hInfo.fullName}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{hInfo.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
