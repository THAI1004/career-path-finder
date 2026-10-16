// Ngân hàng câu hỏi trắc nghiệm tâm lý học hướng nghiệp trích xuất từ dữ liệu chuẩn
// Phục vụ Đề tài NCKH KHKT: Xây dựng mô hình hướng nghiệp tích hợp (DISC & Holland)

import type { AssessmentQuestion, QuestionOption, DISCCode, HollandCode } from '../types/career.ts';

export type AssessmentTier = 'short' | 'standard' | 'deep'; // 20, 50, 70 câu
export type AssessmentMode = 'INTEGRATED' | 'DISC' | 'HOLLAND';

export const DISC_QUESTIONS_BANK: AssessmentQuestion[] = [
  {
    id: 1,
    type: 'DISC',
    title: 'Câu hỏi 1',
    scenario: "Bạn xem một ngày làm việc là thành công khi?",
    options: [
      {
        id: '1-a',
        text: "Không có sai sót nào xảy ra",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '1-b',
        text: "Hoàn thành được mục tiêu lớn đã đặt",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '1-c',
        text: "Mọi việc trôi chảy, không ai gặp khó",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '1-d',
        text: "Có nhiều cuộc trò chuyện ý nghĩa",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 2,
    type: 'DISC',
    title: 'Câu hỏi 2',
    scenario: "Khi bắt đầu một dự án mới, việc đầu tiên bạn làm là gì?",
    options: [
      {
        id: '2-a',
        text: "Lập bảng kế hoạch và danh sách rủi ro",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '2-b',
        text: "Chốt mục tiêu và các mốc thời gian",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '2-c',
        text: "Rủ mọi người họp brainstorm cho hào hứng",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '2-d',
        text: "Xem ai làm gì để phối hợp cho ăn khớp",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 3,
    type: 'DISC',
    title: 'Câu hỏi 3',
    scenario: "Bạn phản ứng ra sao khi đồng nghiệp làm sai gây ảnh hưởng đến bạn?",
    options: [
      {
        id: '3-a',
        text: "Nói thẳng ngay để sửa cho nhanh",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '3-b',
        text: "Ghi nhận lại và đề xuất sửa quy trình",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '3-c',
        text: "Góp ý nhẹ nhàng, tránh làm họ mất mặt",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '3-d',
        text: "Tự khắc phục rồi nhắc khéo sau",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 4,
    type: 'DISC',
    title: 'Câu hỏi 4',
    scenario: "Bạn phản ứng thế nào khi ý tưởng của mình bị bác bỏ?",
    options: [
      {
        id: '4-a',
        text: "Yêu cầu lý do cụ thể để đánh giá lại",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '4-b',
        text: "Tìm cách trình bày lại hấp dẫn hơn",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '4-c',
        text: "Chấp nhận và ủng hộ phương án chung",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '4-d',
        text: "Bảo vệ tới cùng nếu tôi tin là đúng",
        discTrait: 'D' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 5,
    type: 'DISC',
    title: 'Câu hỏi 5',
    scenario: "Bạn muốn được đánh giá năng lực dựa trên điều gì?",
    options: [
      {
        id: '5-a',
        text: "Mức độ chính xác và tuân thủ chuẩn",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '5-b',
        text: "Kết quả đạt được",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '5-c',
        text: "Ảnh hưởng và mối quan hệ tạo dựng",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '5-d',
        text: "Sự đóng góp bền bỉ theo thời gian",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 6,
    type: 'DISC',
    title: 'Câu hỏi 6',
    scenario: "Bạn làm việc tốt nhất trong môi trường nào?",
    options: [
      {
        id: '6-a',
        text: "Cạnh tranh, mục tiêu rõ và nhiều thử thách",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '6-b',
        text: "Sôi động, nhiều tương tác và ý tưởng mới",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '6-c',
        text: "Ổn định, ít xáo trộn và mọi người tin nhau",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '6-d',
        text: "Có quy chuẩn rõ, dữ liệu đầy đủ, ít rủi ro",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 7,
    type: 'DISC',
    title: 'Câu hỏi 7',
    scenario: "Bạn thích được ghi nhận theo cách nào nhất?",
    options: [
      {
        id: '7-a',
        text: "Được trao thêm quyền và việc lớn hơn",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '7-b',
        text: "Được khen công khai trước mọi người",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '7-c',
        text: "Được đánh giá đúng theo tiêu chí đã đặt ra",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '7-d',
        text: "Được cảm ơn chân thành, riêng tư cũng được",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 8,
    type: 'DISC',
    title: 'Câu hỏi 8',
    scenario: "Khi cuộc họp kéo dài quá giờ, bạn thường?",
    options: [
      {
        id: '8-a',
        text: "Pha trò để mọi người đỡ mệt",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '8-b',
        text: "Đề nghị chốt và kết thúc",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '8-c',
        text: "Ngồi lại tới cuối vì tôn trọng mọi người",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '8-d',
        text: "Nhắc lại agenda để quay về trọng tâm",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 9,
    type: 'DISC',
    title: 'Câu hỏi 9',
    scenario: "Bạn chọn đồng đội dựa trên tiêu chí nào?",
    options: [
      {
        id: '9-a',
        text: "Bền bỉ, đáng tin trong dài hạn",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '9-b',
        text: "Hợp tính, giao tiếp tốt",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '9-c',
        text: "Dám nhận việc khó và chịu trách nhiệm",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '9-d',
        text: "Làm việc chuẩn xác, ít sai sót",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 10,
    type: 'DISC',
    title: 'Câu hỏi 10',
    scenario: "Bạn nghĩ gì về rủi ro trong công việc?",
    options: [
      {
        id: '10-a',
        text: "Rủi ro cũng thú vị nếu có người cùng gánh",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '10-b',
        text: "Có rủi ro mới có cơ hội lớn",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '10-c',
        text: "Nên tránh nếu còn lựa chọn an toàn hơn",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '10-d',
        text: "Phải đo lường được và có phương án dự phòng",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 11,
    type: 'DISC',
    title: 'Câu hỏi 11',
    scenario: "Khi được giao việc ngoài chuyên môn, bạn sẽ?",
    options: [
      {
        id: '11-a',
        text: "Làm chậm mà chắc, hỏi kỹ trước khi bắt tay",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '11-b',
        text: "Nhận và vừa làm vừa học",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '11-c',
        text: "Nhờ người có kinh nghiệm hướng dẫn",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '11-d',
        text: "Nghiên cứu tài liệu cho nắm rõ rồi mới làm",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 12,
    type: 'DISC',
    title: 'Câu hỏi 12',
    scenario: "Trong nhóm, bạn hay đóng vai người?",
    options: [
      {
        id: '12-a',
        text: "Bắt lỗi và nâng chuẩn chất lượng",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '12-b',
        text: "Giữ tinh thần và gắn kết mọi người",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '12-c',
        text: "Giữ cho mọi thứ chạy đều và ổn định",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '12-d',
        text: "Đưa ra quyết định cuối cùng",
        discTrait: 'D' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 13,
    type: 'DISC',
    title: 'Câu hỏi 13',
    scenario: "Bạn thích nhận phản hồi theo hình thức nào?",
    options: [
      {
        id: '13-a',
        text: "Thẳng thắn, ngắn gọn, đúng trọng tâm",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '13-b',
        text: "Nhẹ nhàng, riêng tư và mang tính xây dựng",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '13-c',
        text: "Trao đổi cởi mở, có khích lệ",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '13-d',
        text: "Cụ thể, có ví dụ và tiêu chí rõ ràng",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 14,
    type: 'DISC',
    title: 'Câu hỏi 14',
    scenario: "Bạn nghĩ một người lãnh đạo giỏi cần nhất điều gì?",
    options: [
      {
        id: '14-a',
        text: "Khả năng truyền cảm hứng",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '14-b',
        text: "Tư duy hệ thống và công tâm",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '14-c',
        text: "Sự lắng nghe và kiên nhẫn",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '14-d',
        text: "Sự quyết đoán",
        discTrait: 'D' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 15,
    type: 'DISC',
    title: 'Câu hỏi 15',
    scenario: "Điều gì khiến bạn gắn bó lâu dài với một nơi làm việc?",
    options: [
      {
        id: '15-a',
        text: "Đồng nghiệp vui vẻ, văn hóa cởi mở",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '15-b',
        text: "Hệ thống rõ ràng và công bằng",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '15-c',
        text: "Sự ổn định và cảm giác được tin tưởng",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '15-d',
        text: "Được trao quyền và có lộ trình thăng tiến",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 16,
    type: 'DISC',
    title: 'Câu hỏi 16',
    scenario: "Khi cần thuyết phục người khác, bạn dựa vào điều gì?",
    options: [
      {
        id: '16-a',
        text: "Sự nhiệt tình và khả năng kể chuyện",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '16-b',
        text: "Bằng chứng và lập luận chặt chẽ",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '16-c',
        text: "Sự chân thành và mối quan hệ lâu dài",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '16-d',
        text: "Sự tự tin và lập trường dứt khoát",
        discTrait: 'D' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 17,
    type: 'DISC',
    title: 'Câu hỏi 17',
    scenario: "Áp lực của bạn đến từ đâu nhiều nhất?",
    options: [
      {
        id: '17-a',
        text: "Nguy cơ mắc sai sót",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '17-b',
        text: "Sự thay đổi bất ngờ",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '17-c',
        text: "Việc chưa đạt kết quả như kỳ vọng",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '17-d',
        text: "Mối quan hệ chưa suôn sẻ",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 18,
    type: 'DISC',
    title: 'Câu hỏi 18',
    scenario: "Khi khách hàng phàn nàn gay gắt, bạn sẽ?",
    options: [
      {
        id: '18-a',
        text: "Đưa ra hướng xử lý dứt điểm ngay",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '18-b',
        text: "Xoa dịu bằng thái độ tích cực rồi tìm cách bù đắp",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '18-c',
        text: "Kiểm tra lại quy trình xem sai ở đâu",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '18-d',
        text: "Lắng nghe hết để họ nguôi rồi mới trao đổi",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 19,
    type: 'DISC',
    title: 'Câu hỏi 19',
    scenario: "Bạn thích lịch làm việc như thế nào?",
    options: [
      {
        id: '19-a',
        text: "Đều đặn, dễ dự đoán",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '19-b',
        text: "Có cấu trúc rõ, ít bị chen ngang",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '19-c',
        text: "Dày đặc, nhiều việc quan trọng",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '19-d',
        text: "Đa dạng, nhiều cuộc gặp và trao đổi",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 20,
    type: 'DISC',
    title: 'Câu hỏi 20',
    scenario: "Cuối tuần lý tưởng của bạn là gì?",
    options: [
      {
        id: '20-a',
        text: "Gặp gỡ bạn bè, tham gia sự kiện",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '20-b',
        text: "Làm nốt việc dang dở hoặc chinh phục thử thách mới",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '20-c',
        text: "Sắp xếp lại nhà cửa, lên kế hoạch tuần mới",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '20-d',
        text: "Nghỉ ngơi ở nhà cùng gia đình",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 21,
    type: 'DISC',
    title: 'Câu hỏi 21',
    scenario: "Bạn xử lý xung đột trong nhóm thế nào?",
    options: [
      {
        id: '21-a',
        text: "Làm dịu bằng sự hài hước và thuyết phục",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '21-b',
        text: "Lắng nghe cả hai bên, tìm điểm chung",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '21-c',
        text: "Dựa vào quy định và dữ liệu để phân xử",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '21-d',
        text: "Đưa vấn đề ra bàn thẳng và chốt hướng",
        discTrait: 'D' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 22,
    type: 'DISC',
    title: 'Câu hỏi 22',
    scenario: "Khi làm việc từ xa, bạn cảm thấy thế nào?",
    options: [
      {
        id: '22-a',
        text: "Cần công cụ và quy trình rõ để không lệch",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '22-b',
        text: "Thoải mái vì môi trường yên tĩnh, ổn định",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '22-c',
        text: "Hơi buồn vì thiếu tương tác trực tiếp",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '22-d',
        text: "Vẫn hiệu quả, miễn là có mục tiêu rõ",
        discTrait: 'D' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 23,
    type: 'DISC',
    title: 'Câu hỏi 23',
    scenario: "Trong đàm phán, bạn thường?",
    options: [
      {
        id: '23-a',
        text: "Tìm phương án đôi bên cùng chấp nhận được",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '23-b',
        text: "Tạo thiện cảm rồi dẫn dắt câu chuyện",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '23-c',
        text: "Chuẩn bị số liệu và các kịch bản trước",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '23-d',
        text: "Đưa ra điều kiện rõ và giữ vững lập trường",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 24,
    type: 'DISC',
    title: 'Câu hỏi 24',
    scenario: "Bạn muốn cấp trên giao việc cho mình theo cách nào?",
    options: [
      {
        id: '24-a',
        text: "Có hướng dẫn và tiêu chí rõ ràng bằng văn bản",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '24-b',
        text: "Nêu mục tiêu rồi để tôi tự quyết cách làm",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '24-c',
        text: "Trao đổi trực tiếp, không khí cởi mở",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '24-d',
        text: "Báo trước sớm để tôi có thời gian chuẩn bị",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 25,
    type: 'DISC',
    title: 'Câu hỏi 25',
    scenario: "Khi kế hoạch thay đổi phút chót, bạn phản ứng ra sao?",
    options: [
      {
        id: '25-a',
        text: "Xem đó là cơ hội thử cách làm mới",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '25-b',
        text: "Cần chút thời gian để thích nghi",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '25-c',
        text: "Muốn biết lý do và mức ảnh hưởng trước khi đổi",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '25-d',
        text: "Chuyển hướng ngay, coi đó là chuyện thường",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 26,
    type: 'DISC',
    title: 'Câu hỏi 26',
    scenario: "Bạn muốn cấp trên của mình là người thế nào?",
    options: [
      {
        id: '26-a',
        text: "Quyết đoán, giao quyền và không quản lý vi mô",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '26-b',
        text: "Rõ ràng về kỳ vọng và tiêu chí đánh giá",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '26-c',
        text: "Nhất quán, công bằng và biết lắng nghe",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '26-d',
        text: "Gần gũi, cởi mở và biết khích lệ",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 27,
    type: 'DISC',
    title: 'Câu hỏi 27',
    scenario: "Khi phải làm việc với người khó tính, bạn sẽ?",
    options: [
      {
        id: '27-a',
        text: "Giữ mọi trao đổi bằng văn bản cho rõ ràng",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '27-b',
        text: "Tìm cách kết thân để dễ phối hợp",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '27-c',
        text: "Nói rõ giới hạn và nguyên tắc làm việc",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '27-d',
        text: "Nhẫn nhịn và thích nghi dần",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 28,
    type: 'DISC',
    title: 'Câu hỏi 28',
    scenario: "Khi nhóm cần một người đứng ra chịu trách nhiệm, bạn?",
    options: [
      {
        id: '28-a',
        text: "Xung phong nhận ngay",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '28-b',
        text: "Nhận nếu thật sự không còn ai phù hợp",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '28-c',
        text: "Nhận nếu phạm vi trách nhiệm được ghi rõ",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '28-d',
        text: "Nhận nếu mọi người tin tưởng đề cử",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 29,
    type: 'DISC',
    title: 'Câu hỏi 29',
    scenario: "Khi kết quả không như mong đợi, bạn sẽ?",
    options: [
      {
        id: '29-a',
        text: "Phân tích nguyên nhân gốc rồi mới sửa",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '29-b',
        text: "Hỏi ý kiến mọi người để tìm hướng mới",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '29-c',
        text: "Làm lại ngay với cách tiếp cận khác",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '29-d',
        text: "Bình tĩnh xem lại, tránh phản ứng vội",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 30,
    type: 'DISC',
    title: 'Câu hỏi 30',
    scenario: "Bàn làm việc của bạn thường trông thế nào?",
    options: [
      {
        id: '30-a',
        text: "Gọn gàng ổn định, ít khi thay đổi",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '30-b',
        text: "Bừa một chút cũng được, miễn công việc chạy",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '30-c',
        text: "Sắp xếp có hệ thống, mọi thứ đúng chỗ",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '30-d',
        text: "Nhiều đồ vui mắt, ảnh và ghi chú nhiều màu",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 31,
    type: 'DISC',
    title: 'Câu hỏi 31',
    scenario: "Khi phải cắt giảm phạm vi dự án, bạn ưu tiên giữ lại phần nào?",
    options: [
      {
        id: '31-a',
        text: "Phần khách hàng và đội ngũ hào hứng nhất",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '31-b',
        text: "Phần tạo ra kết quả rõ rệt nhất",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '31-c',
        text: "Phần đã cam kết với mọi người",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '31-d',
        text: "Phần đảm bảo chất lượng và tuân thủ",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 32,
    type: 'DISC',
    title: 'Câu hỏi 32',
    scenario: "Trong một cuộc tranh luận, bạn thường?",
    options: [
      {
        id: '32-a',
        text: "Nói thẳng quan điểm dù có thể gây tranh cãi",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '32-b',
        text: "Chỉ ra lỗ hổng trong lập luận đối phương",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '32-c',
        text: "Dùng ví dụ sinh động để thuyết phục",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '32-d',
        text: "Tìm điểm chung để hạ nhiệt",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 33,
    type: 'DISC',
    title: 'Câu hỏi 33',
    scenario: "Bạn học một kỹ năng mới theo cách nào?",
    options: [
      {
        id: '33-a',
        text: "Học từ từ theo lộ trình đều đặn",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '33-b',
        text: "Học cùng nhóm, trao đổi cho vui",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '33-c',
        text: "Nhảy vào làm thật rồi rút kinh nghiệm",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '33-d',
        text: "Đọc tài liệu bài bản từ gốc",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 34,
    type: 'DISC',
    title: 'Câu hỏi 34',
    scenario: "Khi được nhờ góp ý cho sản phẩm của đồng nghiệp, bạn?",
    options: [
      {
        id: '34-a',
        text: "Liệt kê chi tiết từng điểm chưa đạt",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '34-b',
        text: "Chỉ ra ngay điểm cần sửa quan trọng nhất",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '34-c',
        text: "Góp ý nhẹ nhàng, tránh làm họ nản",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '34-d',
        text: "Khen trước rồi mới góp ý",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 35,
    type: 'DISC',
    title: 'Câu hỏi 35',
    scenario: "Trong một buổi brainstorm, bạn là người?",
    options: [
      {
        id: '35-a',
        text: "Chỉ ra điểm chưa hợp lý của từng ý",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '35-b',
        text: "Chốt lại và chọn ý khả thi nhất",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '35-c',
        text: "Lắng nghe và kết nối ý của mọi người",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '35-d',
        text: "Đưa ra nhiều ý tưởng nhất",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 36,
    type: 'DISC',
    title: 'Câu hỏi 36',
    scenario: "Bạn xử lý email và tin nhắn công việc ra sao?",
    options: [
      {
        id: '36-a',
        text: "Trả lời thân thiện, có emoji cho gần gũi",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '36-b',
        text: "Trả lời chính xác, có dẫn chứng kèm theo",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '36-c',
        text: "Trả lời đầy đủ, không để ai phải chờ",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '36-d',
        text: "Trả lời ngắn gọn, đi thẳng vấn đề",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 37,
    type: 'DISC',
    title: 'Câu hỏi 37',
    scenario: "Sau một thất bại lớn, bạn thường?",
    options: [
      {
        id: '37-a',
        text: "Chia sẻ với người khác để lấy lại tinh thần",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '37-b',
        text: "Mổ xẻ nguyên nhân thật kỹ trước khi bước tiếp",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '37-c',
        text: "Cần thời gian ổn định rồi mới tiếp tục",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '37-d',
        text: "Đứng dậy làm lại ngay",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 38,
    type: 'DISC',
    title: 'Câu hỏi 38',
    scenario: "Điều gì khiến bạn khó chịu nhất trong một cuộc họp?",
    options: [
      {
        id: '38-a',
        text: "Bàn quá lâu mà không ai chốt",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '38-b',
        text: "Bị ép đổi hướng đột ngột giữa chừng",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '38-c',
        text: "Không khí căng thẳng, ai cũng im lặng",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '38-d',
        text: "Số liệu đưa ra thiếu căn cứ, nói chung chung",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 39,
    type: 'DISC',
    title: 'Câu hỏi 39',
    scenario: "Khi công ty tái cấu trúc, phản ứng của bạn là?",
    options: [
      {
        id: '39-a',
        text: "Lo lắng về sự xáo trộn nhưng vẫn thích nghi",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '39-b',
        text: "Muốn biết rõ quy trình và vị trí của mình",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '39-c',
        text: "Chủ động kết nối với những người mới",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '39-d',
        text: "Xem đây là cơ hội để bứt lên",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 40,
    type: 'DISC',
    title: 'Câu hỏi 40',
    scenario: "Khi deadline còn xa, bạn thường?",
    options: [
      {
        id: '40-a',
        text: "Lập lịch ngược từ hạn chót và bám sát",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '40-b',
        text: "Chia đều ra làm mỗi ngày một ít",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '40-c',
        text: "Vừa làm vừa trao đổi, tùy hứng",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '40-d',
        text: "Làm dồn khi gần tới hạn cho tập trung",
        discTrait: 'D' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 41,
    type: 'DISC',
    title: 'Câu hỏi 41',
    scenario: "Bạn chuẩn bị cho một buổi phỏng vấn quan trọng thế nào?",
    options: [
      {
        id: '41-a',
        text: "Nghiên cứu kỹ công ty và luyện câu trả lời",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '41-b',
        text: "Xác định rõ mình muốn gì và đàm phán thẳng",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '41-c',
        text: "Tìm hiểu về người phỏng vấn để tạo kết nối",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '41-d',
        text: "Chuẩn bị tinh thần thoải mái, trả lời chân thành",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 42,
    type: 'DISC',
    title: 'Câu hỏi 42',
    scenario: "Nếu được chọn vai trò trong dự án, bạn muốn làm gì?",
    options: [
      {
        id: '42-a',
        text: "Người điều phối và hỗ trợ nội bộ",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '42-b',
        text: "Người phụ trách đối ngoại và truyền thông",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '42-c',
        text: "Trưởng dự án",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '42-d',
        text: "Người kiểm soát chất lượng và tiến độ",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 43,
    type: 'DISC',
    title: 'Câu hỏi 43',
    scenario: "Trong công việc hằng ngày, bạn thường là người thế nào?",
    options: [
      {
        id: '43-a',
        text: "Điềm tĩnh, hợp tác và giữ nhịp ổn định cho nhóm",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '43-b',
        text: "Quyết đoán, thích dẫn dắt và đẩy mọi việc tiến nhanh",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '43-c',
        text: "Cẩn thận, chính xác và bám sát tiêu chuẩn",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '43-d',
        text: "Nhiệt tình, dễ tạo không khí và kết nối mọi người",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 44,
    type: 'DISC',
    title: 'Câu hỏi 44',
    scenario: "Bạn hỗ trợ một người làm việc kém hiệu quả bằng cách nào?",
    options: [
      {
        id: '44-a',
        text: "Đo lường theo tiêu chí và ghi nhận định kỳ",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '44-b',
        text: "Kiên nhẫn hỗ trợ cho tới khi họ tiến bộ",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '44-c',
        text: "Đặt mục tiêu rõ và hạn chót cụ thể",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '44-d',
        text: "Trò chuyện để hiểu và tạo động lực",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 45,
    type: 'DISC',
    title: 'Câu hỏi 45',
    scenario: "Điều gì làm bạn hài lòng nhất khi kết thúc dự án?",
    options: [
      {
        id: '45-a',
        text: "Sản phẩm không còn lỗi nào",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '45-b',
        text: "Không ai bị bỏ lại phía sau",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '45-c',
        text: "Cả nhóm gắn kết hơn trước",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '45-d',
        text: "Vượt chỉ tiêu đề ra",
        discTrait: 'D' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 46,
    type: 'DISC',
    title: 'Câu hỏi 46',
    scenario: "Khi phải nói lời từ chối, bạn sẽ?",
    options: [
      {
        id: '46-a',
        text: "Từ chối khéo, giữ quan hệ tốt",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '46-b',
        text: "Rất khó từ chối, thường cố nhận thêm",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '46-c',
        text: "Từ chối thẳng và nêu lý do ngắn gọn",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '46-d',
        text: "Từ chối dựa trên nguyên tắc và ưu tiên đã đặt",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 47,
    type: 'DISC',
    title: 'Câu hỏi 47',
    scenario: "Đồng nghiệp thường nhận xét bạn là người ra sao?",
    options: [
      {
        id: '47-a',
        text: "Thẳng thắn, nói là làm",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '47-b',
        text: "Nguyên tắc, làm gì cũng chỉn chu",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '47-c',
        text: "Đáng tin cậy, luôn có mặt khi cần",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '47-d',
        text: "Hòa đồng, vui vẻ, dễ bắt chuyện",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 48,
    type: 'DISC',
    title: 'Câu hỏi 48',
    scenario: "Bạn nghĩ sao về việc phá vỡ quy trình để làm nhanh hơn?",
    options: [
      {
        id: '48-a',
        text: "Không nên, quy trình luôn có lý do của nó",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '48-b',
        text: "Tôi ngại thay đổi vì sợ ảnh hưởng người khác",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '48-c',
        text: "Nếu hiệu quả hơn thì nên làm",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '48-d',
        text: "Tùy tình huống, miễn mọi người đồng ý",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 49,
    type: 'DISC',
    title: 'Câu hỏi 49',
    scenario: "Bạn phản ứng ra sao khi bị dồn vào thế bí?",
    options: [
      {
        id: '49-a',
        text: "Tấn công vấn đề trực diện",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '49-b',
        text: "Tìm người có thể giúp và kêu gọi hỗ trợ",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '49-c',
        text: "Giữ bình tĩnh, chờ tình hình dịu xuống",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '49-d',
        text: "Rút lui để phân tích rồi quay lại",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 50,
    type: 'DISC',
    title: 'Câu hỏi 50',
    scenario: "Bạn theo dõi tiến độ công việc bằng cách nào?",
    options: [
      {
        id: '50-a',
        text: "Hỏi han trực tiếp từng người",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '50-b',
        text: "Nhìn vào kết quả cuối, không sa vào chi tiết",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '50-c',
        text: "Cập nhật đều đặn theo lịch cố định",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '50-d',
        text: "Dùng bảng theo dõi và chỉ số cụ thể",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 51,
    type: 'DISC',
    title: 'Câu hỏi 51',
    scenario: "Khi gặp một vấn đề khó, phản xạ đầu tiên của bạn là gì?",
    options: [
      {
        id: '51-a',
        text: "Trao đổi với người khác để bật ra ý tưởng mới",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '51-b',
        text: "Kiên nhẫn tháo gỡ từng bước một",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '51-c',
        text: "Xử lý ngay, chọn hướng đi và không vòng vo",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '51-d',
        text: "Phân tích kỹ dữ liệu trước khi hành động",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 52,
    type: 'DISC',
    title: 'Câu hỏi 52',
    scenario: "Bạn mô tả nhịp làm việc của mình là?",
    options: [
      {
        id: '52-a',
        text: "Thận trọng và chính xác",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '52-b',
        text: "Đều đặn và bền bỉ",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '52-c',
        text: "Linh hoạt và giàu năng lượng",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '52-d',
        text: "Nhanh và dứt khoát",
        discTrait: 'D' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 53,
    type: 'DISC',
    title: 'Câu hỏi 53',
    scenario: "Khi trình bày ý tưởng, bạn tập trung vào điều gì?",
    options: [
      {
        id: '53-a',
        text: "Kết quả và lợi ích cuối cùng",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '53-b',
        text: "Dữ liệu, logic và các bước triển khai",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '53-c',
        text: "Tác động tới mọi người và tính khả thi",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '53-d',
        text: "Câu chuyện và cảm hứng cho người nghe",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 54,
    type: 'DISC',
    title: 'Câu hỏi 54',
    scenario: "Khi có người mới vào nhóm, bạn thường?",
    options: [
      {
        id: '54-a',
        text: "Đưa họ tài liệu và quy trình chuẩn",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '54-b',
        text: "Kiên nhẫn kèm cặp cho tới khi họ quen",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '54-c',
        text: "Giao việc ngay để họ chứng minh năng lực",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '54-d',
        text: "Chủ động bắt chuyện, giúp họ hòa nhập",
        discTrait: 'D' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 55,
    type: 'DISC',
    title: 'Câu hỏi 55',
    scenario: "Khi nhóm bạn trễ tiến độ, bạn sẽ làm gì đầu tiên?",
    options: [
      {
        id: '55-a',
        text: "Động viên tinh thần để mọi người lấy lại đà",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '55-b',
        text: "Rà lại quy trình xem vướng ở khâu nào",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '55-c',
        text: "Phân lại việc và siết deadline ngay",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '55-d',
        text: "Nhận thêm phần việc để đỡ cho đồng đội",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 56,
    type: 'DISC',
    title: 'Câu hỏi 56',
    scenario: "Điều gì khiến bạn mất kiên nhẫn nhất?",
    options: [
      {
        id: '56-a',
        text: "Không khí lạnh nhạt, không ai tương tác",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '56-b',
        text: "Người khác làm ẩu, sai chi tiết",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '56-c',
        text: "Người khác làm quá chậm",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '56-d',
        text: "Bị thúc ép và thay đổi liên tục",
        discTrait: 'D' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 57,
    type: 'DISC',
    title: 'Câu hỏi 57',
    scenario: "Khi phải ra quyết định gấp mà thiếu thông tin, bạn sẽ?",
    options: [
      {
        id: '57-a',
        text: "Chọn phương án khả dĩ nhất rồi điều chỉnh sau",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '57-b',
        text: "Cố thu thập thêm dữ liệu trước khi quyết",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '57-c',
        text: "Hỏi nhanh vài người tin cậy rồi quyết",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '57-d',
        text: "Trì hoãn một chút để tìm phương án an toàn",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 58,
    type: 'DISC',
    title: 'Câu hỏi 58',
    scenario: "Nếu phải nói trước 200 người, bạn cảm thấy thế nào?",
    options: [
      {
        id: '58-a',
        text: "Chỉ yên tâm khi đã luyện và có kịch bản chi tiết",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '58-b',
        text: "Tự tin, đây là cơ hội tạo ảnh hưởng",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '58-c',
        text: "Hơi ngại nhưng vẫn làm được nếu chuẩn bị kỹ",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '58-d',
        text: "Hào hứng, tôi thích năng lượng của đám đông",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 59,
    type: 'DISC',
    title: 'Câu hỏi 59',
    scenario: "Bạn ra quyết định mua sắm lớn thế nào?",
    options: [
      {
        id: '59-a',
        text: "So sánh thông số và giá kỹ lưỡng",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '59-b',
        text: "Cân nhắc lâu, ưu tiên thứ bền và quen thuộc",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '59-c',
        text: "Thấy hợp thì chốt nhanh",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '59-d',
        text: "Hỏi bạn bè và tham khảo đánh giá cộng đồng",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 60,
    type: 'DISC',
    title: 'Câu hỏi 60',
    scenario: "Bạn quản lý thời gian bằng cách nào?",
    options: [
      {
        id: '60-a',
        text: "Ưu tiên việc tạo kết quả lớn nhất, bỏ qua việc nhỏ",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '60-b',
        text: "Giữ lịch đều đặn, không dồn việc",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '60-c',
        text: "Lên lịch chi tiết và bám sát từng mốc",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '60-d',
        text: "Linh hoạt theo tình hình và cảm hứng",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 61,
    type: 'DISC',
    title: 'Câu hỏi 61',
    scenario: "Bạn mạnh nhất ở khâu nào của một dự án?",
    options: [
      {
        id: '61-a',
        text: "Khởi động và phá băng những việc khó",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '61-b',
        text: "Duy trì, giữ cho mọi việc không đứt gãy",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '61-c',
        text: "Kêu gọi nguồn lực và tạo đà",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '61-d',
        text: "Kiểm tra, nghiệm thu và chuẩn hóa",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 62,
    type: 'DISC',
    title: 'Câu hỏi 62',
    scenario: "Nếu nhóm không đồng thuận, bạn muốn giải quyết bằng cách nào?",
    options: [
      {
        id: '62-a',
        text: "Thảo luận thêm cho tới khi có tiếng nói chung",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '62-b',
        text: "Người phụ trách quyết định cuối",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '62-c',
        text: "Bỏ phiếu dựa trên tiêu chí đã thống nhất",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '62-d',
        text: "Chọn phương án ít gây xáo trộn nhất",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 63,
    type: 'DISC',
    title: 'Câu hỏi 63',
    scenario: "Bạn nghĩ điều gì quan trọng nhất trong một nhóm?",
    options: [
      {
        id: '63-a',
        text: "Sự tin cậy lẫn nhau",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '63-b',
        text: "Quy tắc làm việc rõ ràng",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '63-c',
        text: "Có người dám ra quyết định",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '63-d',
        text: "Không khí tích cực",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 64,
    type: 'DISC',
    title: 'Câu hỏi 64',
    scenario: "Trong sự kiện nội bộ công ty, bạn thường làm gì?",
    options: [
      {
        id: '64-a',
        text: "Hỗ trợ hậu cần phía sau",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '64-b',
        text: "Đứng ra tổ chức và điều phối",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '64-c',
        text: "Lo kịch bản, danh sách và kiểm tra chi tiết",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '64-d',
        text: "Là người khuấy động không khí",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 65,
    type: 'DISC',
    title: 'Câu hỏi 65',
    scenario: "Khi ai đó cần bạn giúp giữa lúc bận, bạn sẽ?",
    options: [
      {
        id: '65-a',
        text: "Sắp xếp để giúp dù phải làm thêm giờ",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '65-b',
        text: "Hỏi rõ mức độ gấp rồi mới quyết định",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '65-c',
        text: "Nói thẳng là tôi đang bận, hẹn lúc khác",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '65-d',
        text: "Cố gắng giúp vì ngại từ chối",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 66,
    type: 'DISC',
    title: 'Câu hỏi 66',
    scenario: "Kiểu công việc nào khiến bạn thấy chán nhất?",
    options: [
      {
        id: '66-a',
        text: "Việc mơ hồ, không có tiêu chí đúng sai",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '66-b',
        text: "Việc lặp đi lặp lại, không có thử thách",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '66-c',
        text: "Việc thay đổi liên tục, không có gì chắc chắn",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '66-d',
        text: "Việc ngồi một mình cả ngày, không ai trò chuyện",
        discTrait: 'I' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 67,
    type: 'DISC',
    title: 'Câu hỏi 67',
    scenario: "Điều gì thúc đẩy bạn làm việc hết sức?",
    options: [
      {
        id: '67-a',
        text: "Được công nhận và làm việc với người mình quý",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '67-b',
        text: "Môi trường an toàn, ổn định lâu dài",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '67-c',
        text: "Cơ hội chiến thắng và quyền tự quyết",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '67-d',
        text: "Chất lượng công việc đạt chuẩn cao nhất",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 68,
    type: 'DISC',
    title: 'Câu hỏi 68',
    scenario: "Khi nhận nhiều việc cùng lúc, bạn sẽ?",
    options: [
      {
        id: '68-a',
        text: "Lập bảng ưu tiên theo mức độ ảnh hưởng",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '68-b',
        text: "Làm tuần tự, không bỏ sót việc nào",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '68-c',
        text: "Rủ người khác cùng chia việc",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '68-d',
        text: "Chọn việc quan trọng nhất và làm dứt điểm",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 69,
    type: 'DISC',
    title: 'Câu hỏi 69',
    scenario: "Điều bạn tự hào nhất về cách làm việc của mình là gì?",
    options: [
      {
        id: '69-a',
        text: "Dám quyết và dám chịu trách nhiệm",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '69-b',
        text: "Chất lượng công việc luôn ở mức cao",
        discTrait: 'C' as DISCCode,
        weight: 1
      },
      {
        id: '69-c',
        text: "Truyền được năng lượng cho người khác",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '69-d',
        text: "Luôn giữ lời và đáng tin cậy",
        discTrait: 'S' as DISCCode,
        weight: 1
      }
    ]
  },
  {
    id: 70,
    type: 'DISC',
    title: 'Câu hỏi 70',
    scenario: "Bạn phản ứng thế nào khi bị phê bình trước cả nhóm?",
    options: [
      {
        id: '70-a',
        text: "Cười xòa cho nhẹ không khí rồi nói lại sau",
        discTrait: 'I' as DISCCode,
        weight: 1
      },
      {
        id: '70-b',
        text: "Im lặng tiếp thu để tránh làm lớn chuyện",
        discTrait: 'S' as DISCCode,
        weight: 1
      },
      {
        id: '70-c',
        text: "Phản biện thẳng nếu tôi thấy chưa đúng",
        discTrait: 'D' as DISCCode,
        weight: 1
      },
      {
        id: '70-d',
        text: "Đề nghị xem lại bằng chứng cụ thể",
        discTrait: 'C' as DISCCode,
        weight: 1
      }
    ]
  },
];

export const HOLLAND_QUESTIONS_BANK: AssessmentQuestion[] = [
  {
    id: 101, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 1',
    scenario: "Bạn xử lý một đống tài liệu lộn xộn thế nào?",
    options: [
      {
        id: 'h-1-a',
        text: "Đánh số, lập mục lục và lưu trữ theo quy tắc",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-1-b',
        text: "Rủ mọi người cùng làm cho nhanh",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-1-c',
        text: "Nghĩ ra cách trình bày trực quan, dễ nhìn",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-1-d',
        text: "Tìm cách phân loại theo tiêu chí logic",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 102, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 2',
    scenario: "Bạn quan tâm đến tin tức nào nhất?",
    options: [
      {
        id: 'h-2-a',
        text: "Công nghệ chế tạo và máy móc mới",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-2-b',
        text: "Câu chuyện đời sống và hoạt động cộng đồng",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-2-c',
        text: "Phát hiện khoa học mới",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-2-d',
        text: "Chính sách, quy định và thủ tục mới",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 103, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 3',
    scenario: "Bạn thích môn thể thao nào hơn?",
    options: [
      {
        id: 'h-3-a',
        text: "Cờ vua, cờ tướng",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-3-b',
        text: "Môn đồng đội như bóng chuyền, bóng đá",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-3-c',
        text: "Môn cần sức và kỹ thuật như leo núi, bơi lội",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-3-d',
        text: "Môn thi đấu cá nhân có tính cạnh tranh cao",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 104, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 4',
    scenario: "Bạn muốn làm gì trong một chuyến đi thiện nguyện?",
    options: [
      {
        id: 'h-4-a',
        text: "Trò chuyện, động viên và dạy học cho trẻ",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-4-b',
        text: "Vẽ tranh tường và dạy các em làm thủ công",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-4-c',
        text: "Sửa lại lớp học và lắp điện nước",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-4-d',
        text: "Ghi chép danh sách, quản lý quà tặng và chi phí",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 105, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 5',
    scenario: "Khi có vấn đề kỹ thuật trong nhà, bạn thường?",
    options: [
      {
        id: 'h-5-a',
        text: "Nhờ người quen sang giúp",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-5-b',
        text: "Thuê thợ và thương lượng giá cho tốt",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-5-c',
        text: "Gọi dịch vụ và lưu lại phiếu bảo hành",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-5-d',
        text: "Tự tháo ra xem và sửa",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 106, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 6',
    scenario: "Loại trò chơi nào cuốn bạn nhất?",
    options: [
      {
        id: 'h-6-a',
        text: "Vẽ, sáng tác nhạc hoặc kể chuyện",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-6-b',
        text: "Lắp ráp mô hình và robot",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-6-c',
        text: "Trò chơi tập thể cần phối hợp",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-6-d',
        text: "Trò chơi mô phỏng kinh doanh và chiến lược",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 107, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 7',
    scenario: "Bạn thích cách học nào?",
    options: [
      {
        id: 'h-7-a',
        text: "Đọc tài liệu gốc và tự suy luận",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-7-b',
        text: "Học theo giáo trình và bài tập có đáp án",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-7-c',
        text: "Vừa làm vừa học trực tiếp",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-7-d',
        text: "Học qua hình ảnh, câu chuyện và trải nghiệm",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 108, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 8',
    scenario: "Bạn muốn thực tập ở bộ phận nào?",
    options: [
      {
        id: 'h-8-a',
        text: "Xưởng sản xuất và kỹ thuật",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-8-b',
        text: "Phòng nghiên cứu và phát triển",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-8-c',
        text: "Phòng kinh doanh và phát triển thị trường",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-8-d',
        text: "Phòng thiết kế và sáng tạo nội dung",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 109, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 9',
    scenario: "Bạn thích công việc có đặc điểm nào?",
    options: [
      {
        id: 'h-9-a',
        text: "Đòi hỏi suy nghĩ sâu và độc lập",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-9-b',
        text: "Có thưởng theo hiệu quả và cơ hội thăng tiến",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-9-c',
        text: "Cho phép tự do sáng tạo",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-9-d',
        text: "Thấy được kết quả cụ thể ngay",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 110, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 10',
    scenario: "Bạn thấy dễ chịu nhất khi?",
    options: [
      {
        id: 'h-10-a',
        text: "Được trò chuyện và giúp đỡ ai đó",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-10-b',
        text: "Mọi thứ được sắp xếp đâu vào đấy",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-10-c',
        text: "Được đứng ra dẫn dắt một việc",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-10-d',
        text: "Được vận động và làm việc bằng tay",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 111, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 11',
    scenario: "Trong một nhóm khởi nghiệp, bạn sẽ là?",
    options: [
      {
        id: 'h-11-a',
        text: "Người xây dựng thương hiệu",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-11-b',
        text: "Người gọi vốn và bán hàng",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-11-c',
        text: "Người làm ra sản phẩm mẫu",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-11-d',
        text: "Người nghiên cứu thị trường và công nghệ",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 112, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 12',
    scenario: "Bạn thích kiểu bài tập nào hơn?",
    options: [
      {
        id: 'h-12-a',
        text: "Lập bảng biểu và tổng hợp số liệu",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-12-b',
        text: "Chứng minh một giả thuyết bằng lập luận",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-12-c',
        text: "Xây dựng kế hoạch kinh doanh và trình bày",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-12-d',
        text: "Thực hành trên thiết bị thật",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 113, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 13',
    scenario: "Môn học nào khiến bạn hào hứng nhất?",
    options: [
      {
        id: 'h-13-a',
        text: "Kế toán và tin học văn phòng",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-13-b',
        text: "Công nghệ và kỹ thuật thực hành",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-13-c',
        text: "Giáo dục công dân và tâm lý học",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-13-d',
        text: "Toán học và vật lý lý thuyết",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 114, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 14',
    scenario: "Khi mua một món đồ công nghệ, bạn quan tâm nhất điều gì?",
    options: [
      {
        id: 'h-14-a',
        text: "Kiểu dáng và thẩm mỹ",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-14-b',
        text: "Độ bền và khả năng tự sửa chữa",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-14-c',
        text: "Thông số kỹ thuật và nguyên lý hoạt động",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-14-d',
        text: "Chính sách bảo hành và giấy tờ đầy đủ",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 115, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 15',
    scenario: "Bạn thấy hấp dẫn với công việc nào ở bệnh viện?",
    options: [
      {
        id: 'h-15-a',
        text: "Quản lý điều hành và phát triển dịch vụ khám chữa bệnh",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-15-b',
        text: "Kỹ thuật viên vận hành thiết bị y tế",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-15-c',
        text: "Nhân viên quản lý hồ sơ bệnh án",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-15-d',
        text: "Điều dưỡng chăm sóc bệnh nhân",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 116, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 16',
    scenario: "Điều gì khiến bạn thấy mình có ích?",
    options: [
      {
        id: 'h-16-a',
        text: "Khi sửa được thứ người khác bó tay",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-16-b',
        text: "Khi ai đó thấy tốt hơn nhờ mình",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-16-c',
        text: "Khi mọi việc diễn ra đúng kế hoạch",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-16-d',
        text: "Khi giải thích được một điều phức tạp",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 117, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 17',
    scenario: "Nếu viết một bài luận, bạn chọn đề tài nào?",
    options: [
      {
        id: 'h-17-a',
        text: "Bình đẳng cơ hội trong giáo dục",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-17-b',
        text: "Cơ chế hoạt động của trí tuệ nhân tạo",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-17-c',
        text: "Quy trình lưu trữ hồ sơ trong cơ quan hành chính",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-17-d',
        text: "Vai trò của nghệ thuật trong đời sống",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 118, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 18',
    scenario: "Cách bạn giải tỏa căng thẳng là?",
    options: [
      {
        id: 'h-18-a',
        text: "Gặp bạn bè để trò chuyện",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-18-b',
        text: "Đọc sách và suy ngẫm",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-18-c',
        text: "Chạy bộ, leo núi hoặc chơi thể thao",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-18-d',
        text: "Nghe nhạc, vẽ hoặc viết lách",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 119, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 19',
    scenario: "Bạn muốn công việc của mình mang lại điều gì?",
    options: [
      {
        id: 'h-19-a',
        text: "Sự tử tế",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-19-b',
        text: "Hiểu biết mới",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-19-c',
        text: "Cái đẹp",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-19-d',
        text: "Sự thịnh vượng",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 120, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 20',
    scenario: "Bạn thích kiểu bài kiểm tra nào?",
    options: [
      {
        id: 'h-20-a',
        text: "Bài trắc nghiệm có đáp án rõ ràng",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-20-b',
        text: "Bài tự luận cần lập luận",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-20-c',
        text: "Bài làm sản phẩm sáng tạo",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-20-d',
        text: "Bài thực hành trên thiết bị",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 121, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 21',
    scenario: "Nếu phải làm một video, bạn thích khâu nào?",
    options: [
      {
        id: 'h-21-a',
        text: "Lắp đặt thiết bị quay và ánh sáng",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-21-b',
        text: "Tìm nhà tài trợ và quảng bá",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-21-c',
        text: "Phỏng vấn và trò chuyện với nhân vật",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-21-d',
        text: "Lên ý tưởng kịch bản và dựng phim",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 122, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 22',
    scenario: "Bạn muốn dành thời gian rảnh để?",
    options: [
      {
        id: 'h-22-a',
        text: "Làm đồ thủ công hoặc sửa sang nhà cửa",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-22-b',
        text: "Học một điều gì đó mới",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-22-c',
        text: "Xây dựng một dự án riêng",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-22-d',
        text: "Sáng tác hoặc thưởng thức nghệ thuật",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 123, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 23',
    scenario: "Bạn thấy loại công việc nào là ý nghĩa nhất?",
    options: [
      {
        id: 'h-23-a',
        text: "Mở rộng hiểu biết của con người",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-23-b',
        text: "Giúp người khác sống tốt hơn",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-23-c',
        text: "Làm cuộc sống đẹp hơn",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-23-d',
        text: "Giữ cho mọi thứ vận hành trơn tru",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 124, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 24',
    scenario: "Bạn thích kiểu kỳ nghỉ nào?",
    options: [
      {
        id: 'h-24-a',
        text: "Đi xem triển lãm và nhà hát",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-24-b',
        text: "Tham quan bảo tàng khoa học",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-24-c',
        text: "Kết hợp du lịch với gặp gỡ đối tác, mở rộng quan hệ",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-24-d',
        text: "Về quê thăm họ hàng và bạn cũ",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 125, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 25',
    scenario: "Bạn muốn cải thiện điều gì ở nơi mình sống?",
    options: [
      {
        id: 'h-25-a',
        text: "Xây dựng nội quy và quy trình rõ ràng",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-25-b',
        text: "Tổ chức hoạt động gắn kết cư dân",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-25-c',
        text: "Ứng dụng công nghệ để quản lý tốt hơn",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-25-d',
        text: "Sửa chữa đường sá, hệ thống điện nước",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 126, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 26',
    scenario: "Bạn thấy thoải mái nhất khi làm việc với?",
    options: [
      {
        id: 'h-26-a',
        text: "Máy móc và vật liệu",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-26-b',
        text: "Hồ sơ và hệ thống",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-26-c',
        text: "Con số và ý tưởng",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-26-d',
        text: "Con người",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 127, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 27',
    scenario: "Bạn thích môi trường làm việc nào?",
    options: [
      {
        id: 'h-27-a',
        text: "Nơi tiếp xúc và trò chuyện với nhiều người",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-27-b',
        text: "Văn phòng có quy trình rõ ràng và lịch làm việc ổn định",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-27-c',
        text: "Nơi năng động, nhiều cuộc gặp và cơ hội",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-27-d',
        text: "Ngoài trời hoặc trong xưởng, có máy móc thiết bị",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 128, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 28',
    scenario: "Bạn hình dung nơi làm việc lý tưởng của mình là?",
    options: [
      {
        id: 'h-28-a',
        text: "Doanh nghiệp đang tăng trưởng nhanh",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-28-b',
        text: "Trường học, bệnh viện hoặc tổ chức xã hội",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-28-c',
        text: "Studio sáng tạo",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-28-d',
        text: "Viện nghiên cứu hoặc trường đại học",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 129, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 29',
    scenario: "Nếu làm việc trong ngành giáo dục, bạn muốn làm gì?",
    options: [
      {
        id: 'h-29-a',
        text: "Xây dựng chương trình và nghiên cứu giáo dục",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-29-b',
        text: "Quản lý học vụ và hồ sơ học sinh",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-29-c',
        text: "Trực tiếp đứng lớp",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-29-d',
        text: "Phụ trách phòng thực hành, thiết bị",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 130, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 30',
    scenario: "Khi đi bảo tàng, bạn dừng lại lâu nhất ở khu nào?",
    options: [
      {
        id: 'h-30-a',
        text: "Khu máy móc và mô hình cơ khí",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-30-b',
        text: "Khu lịch sử thương mại và doanh nhân",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-30-c',
        text: "Khu lưu trữ tài liệu và bản đồ cổ",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-30-d',
        text: "Khu hội họa và điêu khắc",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 131, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 31',
    scenario: "Bạn xử lý một khoản tiền tiết kiệm thế nào?",
    options: [
      {
        id: 'h-31-a',
        text: "Đầu tư vào việc kinh doanh",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-31-b',
        text: "Gửi tiết kiệm, lên bảng theo dõi chi tiêu",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-31-c',
        text: "Dùng để theo đuổi một dự án cá nhân",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-31-d',
        text: "Nghiên cứu kỹ các kênh đầu tư",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 132, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 32',
    scenario: "Bạn muốn học thêm kỹ năng nào nhất?",
    options: [
      {
        id: 'h-32-a',
        text: "Kỹ năng quản trị dữ liệu và văn thư",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-32-b',
        text: "Hàn, tiện hoặc mộc",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-32-c',
        text: "Kỹ năng lắng nghe và tham vấn",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-32-d',
        text: "Kỹ năng đàm phán và bán hàng",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 133, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 33',
    scenario: "Bạn thích làm việc theo cách nào?",
    options: [
      {
        id: 'h-33-a',
        text: "Cùng nhóm, nhiều trao đổi",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-33-b',
        text: "Dẫn dắt một đội để đạt mục tiêu",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-33-c',
        text: "Một mình với công cụ và vật liệu",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-33-d',
        text: "Một mình với dữ liệu và tài liệu",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 134, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 34',
    scenario: "Bạn thấy mình giỏi nhất ở việc gì?",
    options: [
      {
        id: 'h-34-a',
        text: "Sắp xếp và kiểm soát chi tiết",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-34-b',
        text: "Tưởng tượng và tạo ra cái mới",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-34-c',
        text: "Thuyết phục và tạo ảnh hưởng",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-34-d',
        text: "Phân tích và tìm quy luật",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 135, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 35',
    scenario: "Bạn thích được đánh giá cao ở khía cạnh nào?",
    options: [
      {
        id: 'h-35-a',
        text: "Sự cẩn thận",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-35-b',
        text: "Bản lĩnh",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-35-c',
        text: "Tay nghề",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-35-d',
        text: "Sự tận tâm",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 136, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 36',
    scenario: "Nếu mở một cửa hàng nhỏ, bạn muốn phụ trách khâu nào?",
    options: [
      {
        id: 'h-36-a',
        text: "Thiết kế không gian và nhận diện thương hiệu",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-36-b',
        text: "Lắp đặt, sửa chữa và bảo trì thiết bị",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-36-c',
        text: "Tiếp đón và chăm sóc khách hàng",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-36-d',
        text: "Tìm nguồn hàng và đàm phán với nhà cung cấp",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 137, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 37',
    scenario: "Trong một dự án nhóm, bạn muốn nhận phần việc nào?",
    options: [
      {
        id: 'h-37-a',
        text: "Lập kế hoạch, theo dõi tiến độ và lưu trữ tài liệu",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-37-b',
        text: "Điều phối, lắng nghe và hỗ trợ các thành viên",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-37-c',
        text: "Thuyết trình và bảo vệ dự án trước hội đồng",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-37-d',
        text: "Dựng mô hình và vận hành thiết bị",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 138, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 38',
    scenario: "Trong một buổi họp lớp, bạn thường?",
    options: [
      {
        id: 'h-38-a',
        text: "Thu quỹ và ghi chép chi tiêu",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-38-b',
        text: "Lo phần trang trí và ảnh kỷ niệm",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-38-c',
        text: "Đứng ra kêu gọi và tổ chức",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-38-d',
        text: "Hỏi thăm và kết nối mọi người",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 139, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 39',
    scenario: "Bạn ấn tượng với kiểu người nào nhất?",
    options: [
      {
        id: 'h-39-a',
        text: "Người hiểu sâu và giải thích rõ ràng",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-39-b',
        text: "Người làm được mọi việc bằng đôi tay",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-39-c',
        text: "Người có gu thẩm mỹ riêng",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-39-d',
        text: "Người luôn quan tâm tới người khác",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 140, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 40',
    scenario: "Bạn muốn ghi dấu ấn bằng điều gì?",
    options: [
      {
        id: 'h-40-a',
        text: "Một tác phẩm được nhớ đến",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-40-b',
        text: "Một doanh nghiệp thành công",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-40-c',
        text: "Một công trình bền vững",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-40-d',
        text: "Một phát hiện hoặc sáng chế",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 141, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 41',
    scenario: "Bạn nghĩ điểm mạnh lớn nhất của mình là?",
    options: [
      {
        id: 'h-41-a',
        text: "Khả năng thuyết phục",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-41-b',
        text: "Khả năng phân tích",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-41-c',
        text: "Sự đồng cảm",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-41-d',
        text: "Óc sáng tạo",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 142, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 42',
    scenario: "Bạn thấy hứng thú với chương trình truyền hình nào?",
    options: [
      {
        id: 'h-42-a',
        text: "Bản tin tài chính và số liệu thị trường",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-42-b',
        text: "Chương trình nhân đạo và kết nối cộng đồng",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-42-c',
        text: "Khám phá khoa học và vũ trụ",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-42-d',
        text: "Cuộc thi âm nhạc và thiết kế",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 143, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 43',
    scenario: "Nếu phải chọn một nghề để gắn bó, bạn chọn?",
    options: [
      {
        id: 'h-43-a',
        text: "Thợ lành nghề hoặc kỹ sư vận hành",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-43-b',
        text: "Kiểm toán viên",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-43-c',
        text: "Nhân viên công tác xã hội",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-43-d',
        text: "Nhà thiết kế hoặc nghệ sĩ",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 144, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 44',
    scenario: "Điều gì khiến bạn chán một công việc?",
    options: [
      {
        id: 'h-44-a',
        text: "Mọi thứ lộn xộn, không có quy trình",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-44-b',
        text: "Phải làm theo khuôn mẫu, không được sáng tạo",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-44-c',
        text: "Ngồi bàn giấy cả ngày, không được động tay",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-44-d',
        text: "Không có cơ hội thăng tiến hay bứt phá",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 145, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 45',
    scenario: "Bạn muốn dành một ngày rảnh để làm gì nhất?",
    options: [
      {
        id: 'h-45-a',
        text: "Chụp ảnh và chỉnh sửa thành một bộ ảnh riêng",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-45-b',
        text: "Đọc một cuốn sách khoa học và ghi chú lại",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-45-c',
        text: "Sửa lại chiếc xe đạp cũ trong nhà",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-45-d',
        text: "Gặp gỡ đối tác để bàn một ý tưởng kinh doanh",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 146, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 46',
    scenario: "Nếu làm nội dung cho một kênh, bạn chọn chủ đề nào?",
    options: [
      {
        id: 'h-46-a',
        text: "Nghệ thuật và phong cách sống",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-46-b',
        text: "Hướng dẫn tự làm và sửa đồ",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-46-c',
        text: "Mẹo quản lý tài chính cá nhân",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-46-d',
        text: "Khởi nghiệp và bán hàng",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 147, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 47',
    scenario: "Nếu tham gia một cuộc thi ý tưởng, bạn góp phần nào?",
    options: [
      {
        id: 'h-47-a',
        text: "Nghiên cứu tính khả thi",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-47-b',
        text: "Đặt tên và làm hình ảnh cho ý tưởng",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-47-c',
        text: "Lập dự toán và kế hoạch chi tiết",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-47-d',
        text: "Trình bày và kêu gọi đầu tư",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 148, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 48',
    scenario: "Nếu được chọn một hoạt động ngoại khóa, bạn thích tham gia việc nào nhất?",
    options: [
      {
        id: 'h-48-a',
        text: "Làm thư ký câu lạc bộ, quản lý danh sách và biên bản họp",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-48-b',
        text: "Vào nhóm vẽ tranh và thiết kế ấn phẩm cho trường",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-48-c',
        text: "Tham gia câu lạc bộ nghiên cứu khoa học và làm thí nghiệm",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-48-d',
        text: "Làm tình nguyện viên dạy kèm cho học sinh khó khăn",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 149, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 49',
    scenario: "Nếu tổ chức một sự kiện, bạn nhận việc gì?",
    options: [
      {
        id: 'h-49-a',
        text: "Đón tiếp và hỗ trợ khách mời",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-49-b',
        text: "Dựng sân khấu và xử lý âm thanh ánh sáng",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-49-c',
        text: "Khảo sát và phân tích nhu cầu người tham dự",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-49-d',
        text: "Quản lý danh sách, ngân sách và chứng từ",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 150, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 50',
    scenario: "Nếu chọn một khóa học miễn phí, bạn đăng ký lớp nào?",
    options: [
      {
        id: 'h-50-a',
        text: "Nghiệp vụ văn thư và lưu trữ",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-50-b',
        text: "Thống kê và phương pháp nghiên cứu",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-50-c',
        text: "Tâm lý học ứng dụng",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-50-d',
        text: "Nhiếp ảnh và dựng phim",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 151, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 51',
    scenario: "Bạn thích được giao việc như thế nào?",
    options: [
      {
        id: 'h-51-a',
        text: "Việc cụ thể, làm xong là thấy kết quả",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-51-b',
        text: "Việc có quy trình và mẫu biểu rõ ràng",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-51-c',
        text: "Việc mở, cho tôi tự tìm hướng",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-51-d',
        text: "Việc có tương tác với nhiều người",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 152, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 52',
    scenario: "Bạn thấy mình phù hợp với vai trò nào trong công ty?",
    options: [
      {
        id: 'h-52-a',
        text: "Nhân viên kiểm soát nội bộ",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-52-b',
        text: "Trưởng bộ phận kinh doanh",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-52-c',
        text: "Người sáng tạo nội dung và hình ảnh",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-52-d',
        text: "Chuyên gia nghiên cứu",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 153, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 53',
    scenario: "Trong công việc, bạn ghét nhất điều gì?",
    options: [
      {
        id: 'h-53-a',
        text: "Phải làm mà không hiểu tại sao",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-53-b',
        text: "Môi trường lạnh nhạt, thiếu tình người",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-53-c',
        text: "Bị bó buộc trong khuôn mẫu",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-53-d',
        text: "Không được tự quyết và không có mục tiêu rõ",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 154, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 54',
    scenario: "Bạn thấy mình hợp với công việc nào sau đây?",
    options: [
      {
        id: 'h-54-a',
        text: "Kỹ thuật viên bảo trì máy móc",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-54-b',
        text: "Giáo viên hoặc chuyên viên tư vấn tâm lý",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-54-c',
        text: "Nhân viên kiểm soát hồ sơ và chứng từ",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-54-d',
        text: "Chuyên viên phát triển kinh doanh",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 155, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 55',
    scenario: "Nếu giúp một tổ chức phi lợi nhuận, bạn làm gì?",
    options: [
      {
        id: 'h-55-a',
        text: "Trực tiếp hỗ trợ người thụ hưởng",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-55-b',
        text: "Thiết kế poster và nội dung truyền thông",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-55-c',
        text: "Vận động tài trợ và kết nối đối tác",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-55-d',
        text: "Quản lý sổ sách và báo cáo minh bạch",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 156, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 56',
    scenario: "Bạn thích đọc loại nội dung nào nhất?",
    options: [
      {
        id: 'h-56-a',
        text: "Truyện ngắn, thơ và tản văn",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-56-b',
        text: "Câu chuyện về con người và cộng đồng",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-56-c',
        text: "Hướng dẫn kỹ thuật và mẹo sửa chữa",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-56-d',
        text: "Báo cáo thống kê và bảng xếp hạng",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 157, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 57',
    scenario: "Điều gì khiến bạn tự hào nhất?",
    options: [
      {
        id: 'h-57-a',
        text: "Giúp ai đó vượt qua khó khăn",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-57-b',
        text: "Chốt được một hợp đồng lớn",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-57-c',
        text: "Tự tay hoàn thành một công trình nhỏ",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-57-d',
        text: "Hoàn thành một bộ hồ sơ không có lấy một sai sót",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 158, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 58',
    scenario: "Điều gì khiến bạn thấy một ngày làm việc đáng giá?",
    options: [
      {
        id: 'h-58-a',
        text: "Mọi hồ sơ, số liệu đều khớp và gọn gàng",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-58-b',
        text: "Tìm ra lời giải cho một vấn đề hóc búa",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-58-c',
        text: "Giúp được một người đang gặp khó khăn",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-58-d',
        text: "Hoàn thành một sản phẩm bằng chính đôi tay",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 159, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 59',
    scenario: "Bạn muốn dạy người khác điều gì?",
    options: [
      {
        id: 'h-59-a',
        text: "Cách thể hiện bản thân qua nghệ thuật",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-59-b',
        text: "Cách tư duy và giải quyết vấn đề",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-59-c',
        text: "Cách lắng nghe và thấu hiểu",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-59-d',
        text: "Cách thuyết phục người khác và nắm bắt cơ hội",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 160, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 60',
    scenario: "Bạn muốn khởi nghiệp trong lĩnh vực nào?",
    options: [
      {
        id: 'h-60-a',
        text: "Công nghệ và nghiên cứu ứng dụng",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-60-b',
        text: "Thương mại và dịch vụ",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-60-c',
        text: "Cơ khí, xây dựng hoặc nông nghiệp công nghệ",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-60-d',
        text: "Sáng tạo, truyền thông và thiết kế",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 161, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 61',
    scenario: "Nếu công ty tổ chức đào tạo, bạn chọn lớp nào?",
    options: [
      {
        id: 'h-61-a',
        text: "Tư duy thiết kế",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-61-b',
        text: "Phân tích dữ liệu nâng cao",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-61-c',
        text: "Quản lý quy trình và tài liệu",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-61-d',
        text: "Lãnh đạo và tạo ảnh hưởng",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 162, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 62',
    scenario: "Khi có quy trình mới ở công ty, bạn thường?",
    options: [
      {
        id: 'h-62-a',
        text: "Xem nó ảnh hưởng gì tới kết quả kinh doanh",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-62-b',
        text: "Tìm hiểu lý do đằng sau quy trình đó",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-62-c',
        text: "Học thuộc và áp dụng đúng từng bước",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-62-d',
        text: "Nghĩ cách làm cho nó bớt cứng nhắc",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 163, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 63',
    scenario: "Bạn muốn đóng góp cho xã hội bằng cách nào?",
    options: [
      {
        id: 'h-63-a',
        text: "Xây dựng hệ thống dữ liệu và thủ tục hành chính minh bạch",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      },
      {
        id: 'h-63-b',
        text: "Chăm sóc và hỗ trợ người yếu thế",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      },
      {
        id: 'h-63-c',
        text: "Sáng tạo tác phẩm truyền cảm hứng",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-63-d',
        text: "Nghiên cứu tìm giải pháp mới",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 164, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 64',
    scenario: "Nếu quản lý một quán cà phê, bạn tập trung vào?",
    options: [
      {
        id: 'h-64-a',
        text: "Sự thân thiện với khách quen",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-64-b',
        text: "Không gian và trải nghiệm thẩm mỹ",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-64-c',
        text: "Doanh thu và mở rộng chi nhánh",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-64-d',
        text: "Kiểm soát nguyên liệu, chi phí và chất lượng",
        hollandTrait: 'C' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 165, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 65',
    scenario: "Nếu có một khu vườn, bạn muốn làm gì?",
    options: [
      {
        id: 'h-65-a',
        text: "Mở thành nơi sinh hoạt chung cho hàng xóm",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-65-b',
        text: "Trồng cây đặc sản để kinh doanh",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-65-c',
        text: "Tự trồng, chăm bón và làm hàng rào",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-65-d',
        text: "Thiết kế cảnh quan cho đẹp mắt",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 166, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 66',
    scenario: "Trong lớp học, bạn thường là người?",
    options: [
      {
        id: 'h-66-a',
        text: "Đứng ra tổ chức các hoạt động của lớp",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-66-b',
        text: "Đặt câu hỏi vì sao và tìm hiểu tới cùng",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-66-c',
        text: "Trang trí bảng và làm sản phẩm sáng tạo",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-66-d',
        text: "Giúp bạn bè hiểu bài",
        hollandTrait: 'S' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 167, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 67',
    scenario: "Bạn hay được mọi người nhờ giúp việc gì?",
    options: [
      {
        id: 'h-67-a',
        text: "Đứng ra thương lượng, giao dịch",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-67-b',
        text: "Sửa đồ, lắp ráp",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-67-c',
        text: "Nghe tâm sự, cho lời khuyên",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-67-d',
        text: "Thiết kế, trang trí",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 168, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 68',
    scenario: "Bạn muốn phát triển bản thân theo hướng nào?",
    options: [
      {
        id: 'h-68-a',
        text: "Trở thành người lãnh đạo",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-68-b',
        text: "Trở thành chuyên gia trong một lĩnh vực hẹp",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-68-c',
        text: "Thành thạo một nghề bằng tay",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-68-d',
        text: "Trở thành người vận hành hệ thống chuẩn xác",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 169, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 69',
    scenario: "Bạn muốn được biết đến là người?",
    options: [
      {
        id: 'h-69-a',
        text: "Chỉn chu, không bao giờ sai sót",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-69-b',
        text: "Có tầm nhìn và biết dẫn dắt",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-69-c',
        text: "Khéo tay, làm được mọi thứ",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      },
      {
        id: 'h-69-d',
        text: "Hiểu biết sâu và tư duy sắc bén",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      }
    ]
  },
  {
    id: 170, // Offset to avoid collision with DISC id
    type: 'HOLLAND',
    title: 'Câu hỏi 70',
    scenario: "Trong một cuộc thi, bạn muốn thi hạng mục nào?",
    options: [
      {
        id: 'h-70-a',
        text: "Thi thiết kế sáng tạo",
        hollandTrait: 'A' as HollandCode,
        weight: 1
      },
      {
        id: 'h-70-b',
        text: "Thi giải toán hoặc lập trình",
        hollandTrait: 'R' as HollandCode,
        weight: 1
      },
      {
        id: 'h-70-c',
        text: "Thi thuyết trình ý tưởng khởi nghiệp",
        hollandTrait: 'E' as HollandCode,
        weight: 1
      },
      {
        id: 'h-70-d',
        text: "Thi tay nghề kỹ thuật",
        hollandTrait: 'I' as HollandCode,
        weight: 1
      }
    ]
  },
];

/**
 * Lấy danh sách câu hỏi theo chế độ và cấp độ
 * @param mode 'INTEGRATED' | 'DISC' | 'HOLLAND'
 * @param tier 'short' (20 câu) | 'standard' (50 câu) | 'deep' (70 câu)
 */
export function getQuestionsByConfig(mode: AssessmentMode, tier: AssessmentTier): AssessmentQuestion[] {
  const count = tier === 'short' ? 20 : tier === 'standard' ? 50 : 70;

  if (mode === 'DISC') {
    return DISC_QUESTIONS_BANK.slice(0, count);
  }

  if (mode === 'HOLLAND') {
    return HOLLAND_QUESTIONS_BANK.slice(0, count);
  }

  // TÍCH HỢP: Chia đều câu hỏi cho cả DISC và HOLLAND
  // short: 10 DISC + 10 Holland = 20 câu
  // standard: 25 DISC + 25 Holland = 50 câu
  // deep: 35 DISC + 35 Holland = 70 câu
  const halfCount = Math.floor(count / 2);
  const discPart = DISC_QUESTIONS_BANK.slice(0, halfCount);
  const hollandPart = HOLLAND_QUESTIONS_BANK.slice(0, halfCount);

  return [...discPart, ...hollandPart];
}
