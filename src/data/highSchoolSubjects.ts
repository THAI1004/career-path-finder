// Dữ liệu và logic quy đổi từ Tổ hợp xét tuyển Đại học sang Tổ hợp Môn học lựa chọn THPT
// Phục vụ đúng mục tiêu đề tài: Hỗ trợ lựa chọn tổ hợp môn học cho học sinh THPT theo định hướng tuyển sinh 2026

export interface HighSchoolSubjectPlan {
  primaryCombination: string; // VD: 'A00'
  name: string;
  mandatorySubjects: string[];
  recommendedElectives: string[]; // 4 môn lựa chọn tối ưu
  backupElectives: string[]; // 4 môn lựa chọn dự phòng
  studyTopics: string[]; // 3 cụm chuyên đề học tập
  targetMajors: string[];
  rationale: string; // Căn cứ sư phạm giải thích
}

export const HIGH_SCHOOL_SUBJECT_PLANS: Record<string, HighSchoolSubjectPlan> = {
  A00: {
    primaryCombination: 'A00 (Toán, Vật lý, Hóa học)',
    name: 'Tổ hợp Khoa học Tự nhiên & Kỹ thuật Công nghệ (Toán - Lý - Hóa)',
    mandatorySubjects: ['Toán', 'Ngữ văn', 'Tiếng Anh', 'Lịch sử'],
    recommendedElectives: ['Vật lý', 'Hóa học', 'Tin học', 'Công nghệ (Công nghiệp)'],
    backupElectives: ['Vật lý', 'Hóa học', 'Sinh học', 'Địa lý'],
    studyTopics: ['Chuyên đề Toán học', 'Chuyên đề Vật lý', 'Chuyên đề Tin học'],
    targetMajors: ['Kỹ thuật xây dựng', 'Kỹ thuật cơ khí', 'Kỹ thuật điện', 'Tự động hóa', 'Cơ điện tử'],
    rationale: 'Học sinh tập trung sâu vào Vật lý và Hóa học để nắm vững cơ học, nhiệt, điện và vật liệu kỹ thuật; kết hợp Tin học và Công nghệ công nghiệp để sẵn sàng cho môi trường đại học kỹ thuật thời kỳ 4.0.'
  },
  A01: {
    primaryCombination: 'A01 (Toán, Vật lý, Tiếng Anh)',
    name: 'Tổ hợp Công nghệ Kỹ thuật & Hội nhập Quốc tế (Toán - Lý - Anh)',
    mandatorySubjects: ['Toán', 'Ngữ văn', 'Tiếng Anh', 'Lịch sử'],
    recommendedElectives: ['Vật lý', 'Tin học', 'Công nghệ (Công nghiệp)', 'Địa lý'],
    backupElectives: ['Vật lý', 'Hóa học', 'Tin học', 'Giáo dục kinh tế & pháp luật'],
    studyTopics: ['Chuyên đề Toán học', 'Chuyên đề Vật lý', 'Chuyên đề Tin học'],
    targetMajors: ['Kỹ thuật điều khiển & Tự động hóa', 'Kỹ thuật điện tử - viễn thông', 'Logistics', 'Kỹ thuật ô tô'],
    rationale: 'Vật lý là nền tảng cốt lõi của máy móc thiết bị, kết hợp năng lực Tin học và Tiếng Anh giúp học sinh dễ dàng tiếp cận công nghệ mới, phần mềm thiết kế và tài liệu kỹ thuật quốc tế.'
  },
  D07: {
    primaryCombination: 'D07 (Toán, Hóa học, Tiếng Anh)',
    name: 'Tổ hợp Hóa học Công nghệ & Kỹ thuật Năng lượng (Toán - Hóa - Anh)',
    mandatorySubjects: ['Toán', 'Ngữ văn', 'Tiếng Anh', 'Lịch sử'],
    recommendedElectives: ['Hóa học', 'Vật lý', 'Tin học', 'Sinh học'],
    backupElectives: ['Hóa học', 'Sinh học', 'Địa lý', 'Giáo dục kinh tế & pháp luật'],
    studyTopics: ['Chuyên đề Toán học', 'Chuyên đề Hóa học', 'Chuyên đề Vật lý'],
    targetMajors: ['Kỹ thuật năng lượng', 'Công nghệ kỹ thuật môi trường', 'Kỹ thuật y sinh', 'Nông nghiệp công nghệ cao'],
    rationale: 'Tập trung chuyên sâu Hóa học phục vụ các ngành xử lý năng lượng, vật liệu mới, hóa dược và môi trường, đồng thời mở rộng xét tuyển với nhiều ngành công nghệ cao.'
  },
  B00: {
    primaryCombination: 'B00 (Toán, Hóa học, Sinh học)',
    name: 'Tổ hợp Nông nghiệp Công nghệ cao & Y sinh học (Toán - Hóa - Sinh)',
    mandatorySubjects: ['Toán', 'Ngữ văn', 'Tiếng Anh', 'Lịch sử'],
    recommendedElectives: ['Hóa học', 'Sinh học', 'Công nghệ (Nông nghiệp)', 'Tin học'],
    backupElectives: ['Hóa học', 'Sinh học', 'Vật lý', 'Địa lý'],
    studyTopics: ['Chuyên đề Sinh học', 'Chuyên đề Hóa học', 'Chuyên đề Toán học'],
    targetMajors: ['Nông nghiệp công nghệ cao', 'Chăn nuôi', 'Nuôi trồng thủy sản', 'Kỹ thuật y sinh', 'Môi trường'],
    rationale: 'Nền tảng sinh học và hóa học thực nghiệm giúp học sinh chuẩn bị tốt cho các lĩnh vực chuyển giao công nghệ nông sinh học, canh tác chính xác và bảo tồn sinh thái.'
  },
  D01: {
    primaryCombination: 'D01 (Toán, Ngữ văn, Tiếng Anh)',
    name: 'Tổ hợp Quản trị & Điều phối Chuỗi cung ứng (Toán - Văn - Anh)',
    mandatorySubjects: ['Toán', 'Ngữ văn', 'Tiếng Anh', 'Lịch sử'],
    recommendedElectives: ['Tin học', 'Địa lý', 'Giáo dục kinh tế và pháp luật', 'Công nghệ'],
    backupElectives: ['Tin học', 'Vật lý', 'Địa lý', 'Giáo dục kinh tế và pháp luật'],
    studyTopics: ['Chuyên đề Toán học', 'Chuyên đề Tin học', 'Chuyên đề Địa lý'],
    targetMajors: ['Logistics và quản lý chuỗi cung ứng', 'Quản lý dự án', 'Kinh doanh công nghiệp'],
    rationale: 'Địa lý kinh tế và Giáo dục kinh tế & pháp luật cung cấp kiến thức về luồng hàng hóa, cảng biển, mạng lưới phân phối; Tin học hỗ trợ quản lý hệ thống ERP/WMS.'
  }
};

/**
 * Trả về phương án môn học THPT tương ứng dựa trên danh sách tổ hợp xét tuyển đại học của nghề/ngành
 */
export function getHighSchoolSubjectPlan(admissionCombinations: string[]): HighSchoolSubjectPlan {
  // Ưu tiên theo tổ hợp đầu tiên trong danh sách
  for (const combo of admissionCombinations) {
    if (HIGH_SCHOOL_SUBJECT_PLANS[combo]) {
      return HIGH_SCHOOL_SUBJECT_PLANS[combo];
    }
  }
  // Mặc định A00 cho khối kỹ thuật
  return HIGH_SCHOOL_SUBJECT_PLANS['A00'];
}
