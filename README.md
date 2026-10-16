# EduCareer – Tư vấn hướng nghiệp và quản trị

Ứng dụng React + Express, tích hợp DISC/Holland và tra cứu nghề, ngành đào tạo, tổ hợp xét tuyển.

## Phạm vi đã chốt

- Không đăng nhập Gmail, không có xác thực hoặc phân quyền tài khoản. Nút **Quản trị** mở trực tiếp khu vực quản trị cho mọi người truy cập ứng dụng.
- Bộ câu hỏi cố định tại `src/data/questionBank.ts`: 70 câu DISC và 70 câu Holland. Không có giao diện hoặc API thêm/sửa/xóa câu hỏi.
- Không có chế độ nhập nhanh mã kết quả 0 câu.

## Chức năng

**Sinh viên:** lưu họ tên, trường, lớp; chọn ngành; làm bài 20/50/70 câu, riêng DISC/Holland hoặc tích hợp; lưu từng câu trả lời và tiếp tục bài đang làm; nhận đánh giá và nghề gợi ý theo cả Holland + DISC; chọn lại ngành; xem lịch sử, nhận xét và in báo cáo.

**Quản trị:**

- Tổng quan số sinh viên, bài đang làm, kết quả và kết quả chờ xem xét.
- Thêm/sửa/xóa hồ sơ sinh viên chưa có bài làm; ngừng/kích hoạt sinh viên; lọc bài làm theo sinh viên.
- Theo dõi tiến độ bài test, xem từng câu trả lời, xem kết quả đã nộp. Không sửa câu hỏi hoặc đáp án đã nộp.
- Tìm kiếm/lọc kết quả, viết nhận xét, đánh dấu đã xem xét, xem/in báo cáo và xóa kết quả.
- Thêm/sửa/xóa/ngừng hoạt động nhóm Holland, DISC, nghề nghiệp, ngành đào tạo, tổ hợp xét tuyển và ánh xạ đầu ra.
- Ánh xạ đầu ra: Holland + DISC → nghề → ngành → tổ hợp. Các mã nhóm nằm trong bộ mã cố định của mô hình; có thể thêm lại mã đã xóa khi không còn tham chiếu.

Danh mục quản trị được dùng trực tiếp trong tư vấn. Ngừng hoạt động một thành phần sẽ ẩn các đầu ra phụ thuộc khỏi tư vấn mới. Không cho xóa danh mục đang được tham chiếu; dùng ngừng hoạt động để giữ liên kết. Kết quả đã lưu giữ bản nội dung đánh giá và nghề gợi ý tại thời điểm nộp. Trọng số và thuật toán chấm điểm cố định, máy chủ tự chấm từ câu trả lời.

## Chạy dự án

```sh
npm install --legacy-peer-deps
npm run dev
```

Mở `http://localhost:3000`. Máy chủ mặc định chỉ lắng nghe trên `127.0.0.1`.

```sh
npm run lint
npm test
npm run build
npm start
```

`npm start` và `npm run preview` phục vụ bản `dist` cùng API; cần build trước. Không chạy riêng Vite vì giao diện cần API Express.

Có thể đặt `PORT`, `HOST`, `DATA_FILE` theo `.env.example`. Không cần thông tin OAuth. Khu vực quản trị không có bảo vệ bằng tài khoản theo phạm vi đã chốt; đây là chế độ dùng nội bộ.

## Lưu dữ liệu

- Hồ sơ, bài làm, kết quả và danh mục lưu tập trung ở `data/platform.json` (tự tạo khi lưu lần đầu).
- Danh mục ban đầu lấy từ `src/data/careerMatrix.ts`. Sau khi có file dữ liệu, chỉnh danh mục qua trang Quản trị.
- Mỗi bài làm giữ bộ câu hỏi và câu trả lời riêng; nộp lặp không tạo kết quả trùng; không cho sửa đáp án sau khi nộp.
- Trình duyệt chỉ giữ mã hồ sơ hiện tại dưới khóa `educareer_student_id`. Nút **Sinh viên khác** bắt đầu hồ sơ mới. Đây không phải cơ chế xác thực và không đồng bộ danh tính giữa trình duyệt.
- Lịch sử cũ dưới khóa `educareer_history_v2` được giữ nguyên, không tự nhập vào hệ thống tập trung vì chưa xác định được chủ hồ sơ.
- Sao lưu file `data/platform.json` để sao lưu dữ liệu. Chỉ chạy một tiến trình máy chủ với mỗi file; dữ liệu lưu bằng file phù hợp quy mô nội bộ, chưa phải cơ sở dữ liệu cho nhiều máy chủ.
- Phương án môn THPT chỉ hiện khi có tổ hợp thuộc bộ quy đổi có sẵn và các môn vẫn khớp; tổ hợp mới vẫn tra cứu được nhưng không tự gán phương án A00.

## Cấu trúc chính

- `server/app.ts`: API danh mục, sinh viên, bài làm và kết quả.
- `server/domain.ts`: dữ liệu ban đầu, kiểm tra liên kết và chấm kết quả.
- `server/store.ts`: lưu file, thay thế file sau khi ghi hoàn tất, hoàn tác bộ nhớ nếu ghi thất bại.
- `server/app.test.ts`: kiểm thử API và lưu dữ liệu bằng file tạm riêng.
- `src/components/AdminPanel.tsx`: giao diện quản trị và biểu mẫu danh mục.
- `src/useStudentFlow.ts`: hồ sơ, bài làm và lịch sử của sinh viên.
- `src/platform.tsx`: nạp danh mục từ máy chủ cho các giao diện.

Kiểm thử giao diện sử dụng file riêng `data/ui-check.json`; không trộn vào dữ liệu thật.
