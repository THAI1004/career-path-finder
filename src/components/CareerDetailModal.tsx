import React from 'react';
import {
  X,
  Briefcase,
  GraduationCap,
  Building2,
  CheckCircle2,
  TrendingUp,
  FileBadge
} from 'lucide-react';
import type { CareerMatrixItem } from '../types/career.ts';
import { useCareerData } from '../platform.tsx';

interface CareerDetailModalProps {
  career: CareerMatrixItem | null;
  onClose: () => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  career,
  onClose
}) => {
  const { DISC_TRAITS_INFO } = useCareerData();
  if (!career) return null;

  const discInfo = DISC_TRAITS_INFO[career.disc];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50 duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                {career.hollandLabel}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-md text-xs font-bold text-white shadow-2xs"
                style={{ backgroundColor: discInfo.color }}
              >
                {career.discLabel}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              {career.jobTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Vị trí việc làm định hướng kỹ thuật theo hành vi
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Major & Admission Combo Box */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Ngành Đào Tạo Đại Học Tương Ứng</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-base font-extrabold text-slate-900">
                  {career.universityMajor}
                </span>
                <span className="ml-2 text-xs font-mono font-bold px-2 py-0.5 rounded bg-white text-blue-700 border border-blue-200">
                  Mã ngành: {career.majorCode}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-500">Tổ hợp xét tuyển:</span>
                {career.admissionCombinations.map((combo) => (
                  <span
                    key={combo}
                    className="text-xs px-2.5 py-1 rounded-md bg-emerald-600 text-white font-mono font-bold"
                  >
                    {combo}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Mô Tả Vai Trò & Nhiệm Vụ Thực Tế
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {career.description}
            </p>
          </div>

          {/* Key Skills */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileBadge className="w-4 h-4 text-blue-600" />
              Kỹ Năng & Năng Lực Cần Tích Lũy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {career.keySkills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Meta: Salary & Growth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-xs text-slate-500 block mb-1">Mức thu nhập ước tính:</span>
              <span className="text-sm sm:text-base font-extrabold text-emerald-600">
                {career.averageSalaryRange}
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-xs text-slate-500 block mb-1">Tiềm năng tăng trưởng:</span>
              <span className="text-sm sm:text-base font-extrabold text-blue-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {career.growthPotential}
              </span>
            </div>
          </div>

          {/* Top Universities in Vietnam */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-indigo-600" />
              Các Trường Đại Học Đào Tạo Uy Tín Tại Việt Nam
            </h4>
            <div className="flex flex-wrap gap-2">
              {career.topUniversities.map((uni, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50/80 text-indigo-900 border border-indigo-200/80 text-xs font-semibold"
                >
                  {uni}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
