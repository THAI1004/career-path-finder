/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Compass,
  ArrowDown,
  Info,
  BookOpen
} from 'lucide-react';
import { Header } from './components/Header.tsx';
import { MajorSelector } from './components/MajorSelector.tsx';
import { TestStatusCard } from './components/TestStatusCard.tsx';
import { AssessmentModal } from './components/AssessmentModal.tsx';
import { EvaluationSummary } from './components/EvaluationSummary.tsx';
import { CareerRecommendations } from './components/CareerRecommendations.tsx';
import { CareerMatrixTableView } from './components/CareerMatrixTableView.tsx';
import { HistoryView } from './components/HistoryView.tsx';
import { CareerDetailModal } from './components/CareerDetailModal.tsx';
import { PrintReportModal } from './components/PrintReportModal.tsx';
import { DiscHollandGuide } from './components/DiscHollandGuide.tsx';

import { useStudentFlow } from './useStudentFlow.ts';
import { AdminPanel } from './components/AdminPanel.tsx';
import { AuthPanel } from './components/AuthPanel.tsx';
import { useAuth } from './platform.tsx';

export default function App() {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const {
    CAREER_MATRIX_DATA, UNIVERSITY_MAJORS_LIST, activeTab, setActiveTab,
    selectedInitialMajor, selectedRevisedMajor, studentName, setStudentName,
    school, setSchool, className, setClassName, studentId, studentActive,
    profileReady, profileMessage, busy, error,
    answers, assessmentStatus, statusCheckFeedback, evaluationResult,
    assessmentTier, assessmentMode, isTestModalOpen, setIsTestModalOpen,
    selectedCareerDetail, setSelectedCareerDetail, printReportResult,
    setPrintReportResult, history, activeQuestions, answeredCount, totalQuestions,
    handleSelectAnswer, handleQuickFillDemo, handleSubmitTest, handleCheckStatus,
    handleSelectInitialMajor, handleSelectRevisedMajor, handleResetTest,
    handleDeleteHistoryItem, handleClearAllHistory, handleSelectHistoryItem,
    handleSaveProfile, handleOtherStudent, handleOpenTest,
    setAssessmentTier, setAssessmentMode
  } = useStudentFlow();

  if (showProfile && user) return <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800"><Header activeTab={activeTab} setActiveTab={setActiveTab} historyCount={history.length} isAdmin={user.role === 'admin'} userName={user.name} userAvatar={user.coverUrl} onProfile={() => setShowProfile(false)} onLogin={() => setShowProfile(false)}/><main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8"><AuthPanel /></main></div>;
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
        isAdmin={user?.role === 'admin'}
        userName={user?.name}
        userAvatar={user?.coverUrl}
        onProfile={() => setShowProfile(value => !value)}
        onLogin={() => setShowLogin(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {!user && showLogin && <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"><div className="relative w-full max-w-md"><button onClick={()=>setShowLogin(false)} className="absolute right-3 top-3 z-10 text-slate-500 text-xl" aria-label="Đóng đăng nhập">×</button><AuthPanel /></div></div>}
        {!user && <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center shadow-sm"><div className="mx-auto w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl font-black">E</div><h1 className="mt-5 text-3xl sm:text-4xl font-extrabold text-slate-900">Khám phá bản thân cùng EduCareer</h1><p className="mt-3 max-w-2xl mx-auto text-slate-600">Xem ma trận nghề nghiệp, cẩm nang DISC & Holland và đăng nhập khi bạn muốn làm bài test, lưu lịch sử hoặc nhận báo cáo cá nhân.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><button onClick={()=>setShowLogin(true)} className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold">Đăng nhập để làm bài</button><button onClick={()=>setActiveTab('matrix')} className="px-5 py-3 rounded-xl border border-slate-300 font-bold text-slate-700">Xem ma trận nghề nghiệp</button><button onClick={()=>setActiveTab('guide')} className="px-5 py-3 rounded-xl border border-slate-300 font-bold text-slate-700">Đọc cẩm nang</button></div><div className="grid sm:grid-cols-3 gap-4 mt-10 text-left"><div className="p-4 rounded-2xl bg-blue-50"><b>DISC</b><p className="text-sm text-slate-600 mt-1">Nhận diện phong cách hành vi.</p></div><div className="p-4 rounded-2xl bg-emerald-50"><b>Holland RIASEC</b><p className="text-sm text-slate-600 mt-1">Khám phá nhóm sở thích nghề nghiệp.</p></div><div className="p-4 rounded-2xl bg-amber-50"><b>Báo cáo 2026</b><p className="text-sm text-slate-600 mt-1">Gợi ý ngành học, nghề và tổ hợp tham khảo.</p></div></div></section>}
        {/* TAB 1: TƯ VẤN & LÀM BÀI TEST */}
        {activeTab === 'admin' && <AdminPanel />}
        {error && <p role="alert" className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-700">{error}</p>}
        {busy && <p role="status" className="text-sm text-blue-700">Đang lưu dữ liệu…</p>}
        {user && activeTab === 'counseling' && (
          <div className="space-y-8">
            <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
              <h2 className="font-bold text-lg mb-2">Thông tin sinh viên</h2>
              <p className="text-xs text-slate-500 mb-4">Không cần đăng nhập. Thông tin này dùng để lưu bài làm và kết quả tư vấn của bạn.</p>
              <form onSubmit={e => { e.preventDefault(); void handleSaveProfile(); }} className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <label className="text-sm font-semibold">Họ và tên *<input required maxLength={150} value={studentName} onChange={e=>setStudentName(e.target.value)} className="mt-1 w-full px-3 py-2.5 border border-slate-300 rounded-xl" placeholder="Nhập họ và tên"/></label>
                  <label className="text-sm font-semibold">Trường<input maxLength={200} value={school} onChange={e=>setSchool(e.target.value)} className="mt-1 w-full px-3 py-2.5 border border-slate-300 rounded-xl" placeholder="Tên trường"/></label>
                  <label className="text-sm font-semibold">Lớp<input maxLength={200} value={className} onChange={e=>setClassName(e.target.value)} className="mt-1 w-full px-3 py-2.5 border border-slate-300 rounded-xl" placeholder="Ví dụ: 12A1"/></label>
                </div>
                <div className="flex flex-wrap gap-3 items-center"><button disabled={busy||!profileReady||!studentActive} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold disabled:opacity-50">{studentId?'Cập nhật thông tin':'Lưu thông tin'}</button>{studentId&&<button type="button" disabled={busy} onClick={handleOtherStudent} className="px-4 py-2 rounded-xl border text-sm font-semibold">Sinh viên khác</button>}{profileMessage&&<p role="status" className="text-sm text-emerald-700">{profileMessage}</p>}{!studentActive&&<p className="text-sm text-amber-800">Hồ sơ đã ngừng hoạt động.</p>}</div>
              </form>
            </section>
            {!UNIVERSITY_MAJORS_LIST.length&&<p className="p-4 bg-amber-50 rounded-xl text-amber-800">Chưa có ngành đào tạo đang hoạt động. Hãy mở Quản trị để bổ sung hoặc kích hoạt danh mục.</p>}
            {/* Hero Introduction Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  <span>ĐỀ TÀI NCKH KHKT 2026–2027 • PHƯỜNG THÀNH SEN, TỈNH HÀ TĨNH</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                  Mô Hình Hướng Nghiệp Tích Hợp & Lựa Chọn Tổ Hợp Môn Học THPT
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Kết hợp khoa học trắc nghiệm tâm lý hành vi <strong className="text-blue-700">DISC</strong> (4 nhóm),
                  thuyết định hướng <strong className="text-blue-700">Holland RIASEC</strong> (trọng tâm nhóm Kỹ thuật R)
                  để đề xuất <strong className="text-emerald-700">Tổ hợp môn học lựa chọn lớp 10 THPT theo định hướng tuyển sinh 2026</strong>,
                  ngành đào tạo đại học và vị trí việc làm phù hợp nhất.
                </p>

                {/* Quick 3-Step Guide */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">1</span>
                    <div>
                      <strong className="block text-slate-900">Chọn ngành ban đầu</strong>
                      <span className="text-slate-500">Chọn ngành học bạn đang quan tâm hoặc định thi</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">2</span>
                    <div>
                      <strong className="block text-slate-900">Khám phá bản thân</strong>
                      <span className="text-slate-500">Làm test (20/50/70 câu)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">3</span>
                    <div>
                      <strong className="block text-slate-900">Nhận tổ hợp môn & nghề</strong>
                      <span className="text-slate-500">Xem phương án môn THPT, đối chiếu SWOT & Ikigai</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CHỨC NĂNG 1 - PHẦN 1: Ngành lựa chọn (Dropdown box / Tìm kiếm) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-heading font-extrabold text-slate-900">
                    Bước 1: Lựa Chọn Ngành Học Đại Học Quan Tâm Ban Đầu
                  </h3>
                </div>
              </div>

              <MajorSelector
                selectedMajorId={selectedInitialMajor.id}
                onSelectMajor={handleSelectInitialMajor}
                label="Chọn ngành đại học dự kiến:"
              />
            </div>

            {/* CHỨC NĂNG 1 - PHẦN 2: Bài test + Nút kiểm tra tình trạng */}
            <TestStatusCard
              status={assessmentStatus}
              answeredCount={answeredCount}
              totalQuestions={totalQuestions}
              studentName={studentName}
              setStudentName={setStudentName}
              onOpenTestModal={() => void handleOpenTest()}
              onCheckStatus={handleCheckStatus}
              onResetTest={handleResetTest}
              evaluationResult={evaluationResult}
              statusCheckFeedback={statusCheckFeedback}
            />

            {/* CHỨC NĂNG 1 - PHẦN 3: Đưa ra đánh giá + Cho phép chọn lại chuyên ngành */}
            {assessmentStatus === 'completed' && evaluationResult && (
              <div id="evaluation-results-section" className="space-y-8 scroll-mt-24">
                <div className="flex items-center gap-2 px-1">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg sm:text-xl font-heading font-black text-slate-900">
                    Bước 2: Báo Cáo Đánh Giá Hành Vi, Tổ Hợp Môn THPT & Điều Chỉnh Chuyên Ngành
                  </h3>
                </div>

                <EvaluationSummary
                  evaluation={evaluationResult}
                  currentMajorId={selectedRevisedMajor.id}
                  onSelectRevisedMajor={handleSelectRevisedMajor}
                  onViewRecommendations={() => {
                    const el = document.getElementById('career-recommendations-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                {/* CHỨC NĂNG 1 - PHẦN 4: Gợi ý các nghề nghiệp dựa vào tính cách (Dropdown box D, I, S, C) */}
                <CareerRecommendations
                  key={evaluationResult.id}
                  careers={CAREER_MATRIX_DATA}
                  userPrimaryDisc={evaluationResult.primaryDisc}
                  userPrimaryHolland={evaluationResult.primaryHolland}
                  selectedMajorName={selectedRevisedMajor.name}
                  onSelectCareerDetail={(career) => setSelectedCareerDetail(career)}
                />
              </div>
            )}

            {/* Hint if test not yet taken */}
            {assessmentStatus !== 'completed' && (
              <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-blue-600 shrink-0" />
                  <p className="text-xs sm:text-sm text-slate-700">
                    Sau khi hoàn thành bài test và bấm <strong>&ldquo;Kiểm tra tình trạng&rdquo;</strong>, hệ thống sẽ mở khóa bảng phân tích tính cách, đề xuất <strong>phương án tổ hợp môn học THPT theo định hướng tuyển sinh 2026</strong> và gợi ý nghề nghiệp tương thích.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleOpenTest()}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 transition-colors shadow-sm cursor-pointer"
                >
                  Mở bài test
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MA TRẬN NGHỀ NGHIỆP & NGÀNH ĐÀO TẠO ĐẠI HỌC */}
        {activeTab === 'matrix' && (
          <CareerMatrixTableView
            onSelectCareerDetail={(item) => setSelectedCareerDetail(item)}
          />
        )}

        {/* TAB 3: CHỨC NĂNG 2 - LỊCH SỬ CÁC LẦN KIỂM TRA */}
        {activeTab === 'history' && (
          <HistoryView
            history={history}
            onSelectResult={handleSelectHistoryItem}
            onDeleteResult={handleDeleteHistoryItem}
            onClearAllHistory={handleClearAllHistory}
            onStartNewTest={() => { setActiveTab('counseling'); void handleOpenTest(true); }}
            onPrintResult={(res) => setPrintReportResult(res)}
          />
        )}

        {/* TAB 4: CẨM NANG PHƯƠNG PHÁP LUẬN HOLLAND & DISC */}
        {activeTab === 'guide' && <DiscHollandGuide />}
      </main>

      {/* Footer */}
      <footer className="no-print mt-auto bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026–2027 Đề Tài NCKH KHKT • Trường THPT Thành Sen, Tỉnh Hà Tĩnh</p>
          <div className="flex items-center gap-4">
            <span>Chuẩn dữ liệu mã ngành Bộ GD&ĐT</span>
            <span>•</span>
            <span>Định hướng tuyển sinh 2026</span>
            <span>•</span>
            <span>Mô hình tích hợp DISC & Holland RIASEC</span>
          </div>
        </div>
      </footer>

      {/* MODAL: Bài Test Trắc Nghiệm */}
      <AssessmentModal
        busy={busy}
        feedback={error}
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        questions={activeQuestions}
        answers={answers}
        onSelectAnswer={handleSelectAnswer}
        onSubmitTest={handleSubmitTest}
        onQuickFillDemo={handleQuickFillDemo}
        tier={assessmentTier}
        setTier={setAssessmentTier}
        mode={assessmentMode}
        setMode={setAssessmentMode}
      />

      {/* MODAL: Chi Tiết Nghề Nghiệp */}
      <CareerDetailModal
        career={selectedCareerDetail}
        onClose={() => setSelectedCareerDetail(null)}
      />

      {/* MODAL: In Phiếu Hướng Nghiệp */}
      <PrintReportModal
        result={printReportResult}
        onClose={() => setPrintReportResult(null)}
      />
    </div>
  );
}
