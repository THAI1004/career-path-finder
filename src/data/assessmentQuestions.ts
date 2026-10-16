import type { AssessmentQuestion } from '../types/career.ts';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    type: 'DISC',
    title: 'Cách bạn xử lý công việc và bài tập nhóm',
    scenario: 'Khi được giao một đề tài lớn ở trường với hạn chót rất gấp, phản ứng tự nhiên của bạn là gì?',
    options: [
      {
        id: '1-d',
        text: 'Nhanh chóng nhận vai trò trưởng nhóm, phân chia công việc quyết đoán và yêu cầu mọi người tập trung vào kết quả đúng hạn.',
        discTrait: 'D',
        weight: 3
      },
      {
        id: '1-i',
        text: 'Khởi xướng buổi thảo luận đầy hứng khởi, gắn kết mọi người và đưa ra những ý tưởng sáng tạo độc đáo để tạo ấn tượng mạnh.',
        discTrait: 'I',
        weight: 3
      },
      {
        id: '1-s',
        text: 'Lắng nghe ý kiến của tất cả thành viên, chọn phần việc sở trường để làm chu đáo, giữ không khí hòa thuận và hỗ trợ đồng đội khi cần.',
        discTrait: 'S',
        weight: 3
      },
      {
        id: '1-c',
        text: 'Lập dàn ý chi tiết, tra cứu tài liệu tiêu chuẩn, thiết lập quy chuẩn trình bày rõ ràng để đảm bảo bài làm không có sai sót nào.',
        discTrait: 'C',
        weight: 3
      }
    ]
  },
  {
    id: 2,
    type: 'DISC',
    title: 'Phản ứng khi đối mặt với sự cố bất ngờ',
    scenario: 'Đang chuẩn bị cho buổi nghiệm thu hoặc báo cáo thì hệ thống/thiết bị gặp trục trặc kỹ thuật, bạn sẽ:',
    options: [
      {
        id: '2-d',
        text: 'Bình tĩnh ra quyết định ngay lập tức, chuyển sang phương án B mà không do dự để không làm gián đoạn tiến độ.',
        discTrait: 'D',
        weight: 3
      },
      {
        id: '2-i',
        text: 'Động viên tinh thần cả nhóm, linh hoạt giải thích và pha trò nhẹ nhàng để giảm bớt căng thẳng với người tham dự.',
        discTrait: 'I',
        weight: 3
      },
      {
        id: '2-s',
        text: 'Kiên nhẫn kiểm tra từng bước theo kinh nghiệm sẵn có, giữ nhịp độ ổn định và giúp đỡ từng người hoàn thành nhiệm vụ.',
        discTrait: 'S',
        weight: 3
      },
      {
        id: '2-c',
        text: 'Mở sơ đồ tài liệu kỹ thuật, phân tích nguyên nhân gốc rễ (Root Cause), kiểm tra các thông số log cẩn thận trước khi sửa chữa.',
        discTrait: 'C',
        weight: 3
      }
    ]
  },
  {
    id: 3,
    type: 'DISC',
    title: 'Phong cách giao tiếp và kết nối xã hội',
    scenario: 'Trong một buổi hội thảo nghề nghiệp hoặc ngày hội việc làm, phong thái quen thuộc của bạn là:',
    options: [
      {
        id: '3-d',
        text: 'Đi thẳng đến các gian hàng doanh nghiệp lớn, đặt câu hỏi trực tiếp về cơ hội thăng tiến và tiêu chí ứng tuyển.',
        discTrait: 'D',
        weight: 3
      },
      {
        id: '3-i',
        text: 'Hào hứng làm quen, mở rộng vòng kết nối (networking), xin liên hệ với nhiều diễn giả và bạn bè mới.',
        discTrait: 'I',
        weight: 3
      },
      {
        id: '3-s',
        text: 'Đi cùng một vài người bạn thân quen, chăm chú lắng nghe các bài chia sẻ và tìm hiểu môi trường làm việc ổn định, lâu dài.',
        discTrait: 'S',
        weight: 3
      },
      {
        id: '3-c',
        text: 'Đọc kỹ tài liệu giới thiệu, ghi chép số liệu, đối chiếu bảng lương và yêu cầu công việc một cách bài bản.',
        discTrait: 'C',
        weight: 3
      }
    ]
  },
  {
    id: 4,
    type: 'DISC',
    title: 'Cách bạn đưa ra lựa chọn và quyết định',
    scenario: 'Khi cần quyết định lựa chọn giữa 2 phương án thực tập hoặc dự án quan trọng:',
    options: [
      {
        id: '4-d',
        text: 'Chọn phương án có cơ hội đột phá cao nhất, thách thức nhiều nhất và mang lại vị thế dẫn đầu.',
        discTrait: 'D',
        weight: 3
      },
      {
        id: '4-i',
        text: 'Chọn nơi có văn hóa sôi nổi, được tương tác với nhiều người, được thể hiện cá tính và tự do sáng tạo.',
        discTrait: 'I',
        weight: 3
      },
      {
        id: '4-s',
        text: 'Chọn nơi có lộ trình đào tạo rõ ràng, đồng nghiệp thân thiện, công việc ổn định và ít biến động tiêu cực.',
        discTrait: 'S',
        weight: 3
      },
      {
        id: '4-c',
        text: 'Lập bảng so sánh Excel đánh giá các tiêu chí định lượng, rủi ro, chính sách và dữ liệu cụ thể trước khi chọn.',
        discTrait: 'C',
        weight: 3
      }
    ]
  },
  {
    id: 5,
    type: 'HOLLAND',
    title: 'Sở thích hoạt động thực tế và môi trường làm việc',
    scenario: 'Nếu được chọn một ngày trải nghiệm thực tế công việc lý tưởng, bạn muốn làm gì nhất?',
    options: [
      {
        id: '5-r',
        text: 'Đến xưởng cơ khí, công trường xây dựng hoặc phòng vận hành máy móc để trực tiếp sử dụng công cụ, thiết bị và giải quyết vấn đề kỹ thuật.',
        hollandTrait: 'R',
        weight: 4
      },
      {
        id: '5-i',
        text: 'Làm việc trong phòng nghiên cứu, phân tích dữ liệu, tìm tòi nguyên lý khoa học và thử nghiệm các thuật toán mới.',
        hollandTrait: 'I',
        weight: 4
      },
      {
        id: '5-e',
        text: 'Tham gia cuộc họp chiến lược kinh doanh, thuyết phục khách hàng ký kết hợp đồng và điều hành hoạt động dự án.',
        hollandTrait: 'E',
        weight: 4
      },
      {
        id: '5-c',
        text: 'Rà soát quy trình tiêu chuẩn chất lượng (QA/QC), quản lý hệ thống dữ liệu, hồ sơ kỹ thuật hoặc sổ sách kế toán kiểm toán.',
        hollandTrait: 'C',
        weight: 4
      }
    ]
  },
  {
    id: 6,
    type: 'DISC',
    title: 'Mục tiêu thúc đẩy bạn nỗ lực mỗi ngày',
    scenario: 'Điều gì mang lại cho bạn cảm giác thỏa mãn và tự hào nhất sau một ngày làm việc/học tập?',
    options: [
      {
        id: '6-d',
        text: 'Chinh phục được mục tiêu khó, hoàn thành xuất sắc trước hạn và khẳng định năng lực vượt trội.',
        discTrait: 'D',
        weight: 3
      },
      {
        id: '6-i',
        text: 'Nhận được sự công nhận, lời khen ngợi nhiệt tình từ mọi người và truyền được cảm hứng tích cực cho tập thể.',
        discTrait: 'I',
        weight: 3
      },
      {
        id: '6-s',
        text: 'Mọi việc diễn ra suôn sẻ êm đẹp, đã giúp đỡ được đồng đội hoàn thành nhiệm vụ và duy trì sự hòa thuận.',
        discTrait: 'S',
        weight: 3
      },
      {
        id: '6-c',
        text: 'Tạo ra sản phẩm chuẩn xác, không có bất kỳ lỗi sót nào, quy trình vận hành hoàn hảo đến từng chi tiết.',
        discTrait: 'C',
        weight: 3
      }
    ]
  },
  {
    id: 7,
    type: 'HOLLAND',
    title: 'Xu hướng giải quyết vấn đề thực tiễn',
    scenario: 'Khi đối mặt với một vật dụng gia đình hoặc máy móc bị hỏng:',
    options: [
      {
        id: '7-r',
        text: 'Lấy ngay tuốc-nơ-vít, kìm, đồng hồ đo để tháo rời kiểm tra mạch, cơ cấu chuyển động và tự tay sửa chữa thay thế linh kiện.',
        hollandTrait: 'R',
        weight: 4
      },
      {
        id: '7-i',
        text: 'Lên mạng đọc sơ đồ mạch điện lý thuyết, so sánh các nghiên cứu và phương pháp xử lý tối ưu trước khi can thiệp.',
        hollandTrait: 'I',
        weight: 4
      },
      {
        id: '7-s',
        text: 'Hỏi thăm ý kiến người xung quanh, cùng mọi người tìm dịch vụ hỗ trợ chu đáo và quan tâm tới an toàn của cả nhà.',
        hollandTrait: 'S',
        weight: 4
      },
      {
        id: '7-a',
        text: 'Suy nghĩ cách tái chế hoặc cải tiến thẩm mỹ, làm cho món đồ vừa hoạt động được vừa có diện mạo độc đáo mới lạ.',
        hollandTrait: 'A',
        weight: 4
      }
    ]
  },
  {
    id: 8,
    type: 'DISC',
    title: 'Cách bạn tiếp nhận phản hồi và phê bình',
    scenario: 'Khi giáo viên hướng dẫn hoặc người quản lý góp ý về bài tập hoặc bản vẽ của bạn:',
    options: [
      {
        id: '8-d',
        text: 'Nghe ngắn gọn trọng tâm vấn đề, sẵn sàng bảo vệ lập luận nếu mình đúng, sau đó lập tức hành động để sửa nhanh.',
        discTrait: 'D',
        weight: 3
      },
      {
        id: '8-i',
        text: 'Cởi mở trao đổi, thể hiện thái độ tích cực cầu thị và mong muốn được hướng dẫn thêm cách cải thiện tốt hơn.',
        discTrait: 'I',
        weight: 3
      },
      {
        id: '8-s',
        text: 'Lặng lẽ lắng nghe cẩn thận, không thích tranh cãi gay gắt, sau đó từ tốn chỉnh sửa từng phần theo đúng chỉ dẫn.',
        discTrait: 'S',
        weight: 3
      },
      {
        id: '8-c',
        text: 'Yêu cầu chỉ rõ tiêu chuẩn và căn cứ kỹ thuật của lời góp ý, ghi chú chi tiết để đối chiếu lại với quy chuẩn.',
        discTrait: 'C',
        weight: 3
      }
    ]
  }
];
