import React from 'react';
import { Compass, History, Table, BookOpen, GraduationCap, UserCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: 'counseling' | 'matrix' | 'history' | 'guide' | 'admin';
  setActiveTab: (tab: 'counseling' | 'matrix' | 'history' | 'guide' | 'admin') => void;
  historyCount: number;
  isAdmin?: boolean;
  userName?: string;
  onProfile?: () => void;
  onLogin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, historyCount, isAdmin, userName, onProfile, onLogin }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-heading font-extrabold text-base sm:text-xl text-slate-900 tracking-tight">
                  EduCareer
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  DISC & Holland
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Tư vấn chọn ngành nghề theo hành vi & trắc nghiệm Holland
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
            <button
              onClick={() => setActiveTab('counseling')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'counseling'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Tư Vấn</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'matrix'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Table className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Ma Trận</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`relative flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Lịch Sử</span>
              {historyCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === 'history' ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                }`}>
                  {historyCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'guide'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Cẩm Nang</span>
            </button>
            {isAdmin && <button onClick={() => setActiveTab('admin')} className={`shrink-0 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold ${activeTab==='admin'?'bg-blue-600 text-white':'text-slate-600 hover:bg-slate-100'}`}>Quản trị</button>}
            {userName && <button onClick={onProfile} className="shrink-0 flex items-center gap-1 px-2 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100" title="Tài khoản"><UserCircle size={18}/><span className="hidden lg:inline max-w-28 truncate">{userName}</span></button>}
            {!userName && <button onClick={onLogin} className="shrink-0 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 text-white">Đăng nhập</button>}
          </nav>
        </div>
      </div>
    </header>
  );
};
