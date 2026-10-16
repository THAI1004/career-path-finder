# BÁO CÁO THUYẾT MINH KỸ THUẬT & ĐẶC TẢ CHI TIẾT CÁC CHỨC NĂNG

> Cập nhật triển khai 16/10/2026: đã có quản trị sinh viên, theo dõi bài test, kết quả và các danh mục. Theo yêu cầu mới nhất, không có đăng nhập/phân quyền tài khoản và không có quản trị thêm/sửa/xóa câu hỏi; bộ câu hỏi cố định. Lưu tập trung bằng máy chủ Express và file dữ liệu. Hướng dẫn và phạm vi hiện hành xem `README.md` và `DOI_CHIEU_CHUC_NANG.md`. Nội dung nghiên cứu bên dưới là tài liệu tham khảo ban đầu.

## DỰ ÁN NGHIÊN CỨU KHOA HỌC KỸ THUẬT NĂM HỌC 2026–2027
**Đề tài:** *Xây dựng mô hình hướng nghiệp tích hợp và công cụ hỗ trợ lựa chọn tổ hợp môn học cho học sinh THPT tại phường Thành Sen, tỉnh Hà Tĩnh*

---

## I. TỔNG QUAN HỆ THỐNG VÀ VỊ TRÍ TRONG MÔ HÌNH 3 GIAI ĐOẠN

### 1.1. Bối Cảnh Thực Tiễn & Tính Cần Thiết
Định hướng tuyển sinh năm 2026 đặt học sinh lớp 9 chuẩn bị lên lớp 10 trước quyết định then chốt: lựa chọn nhóm môn học phù hợp với năng lực, sở thích và ngành nghề dự kiến. Hệ thống kết nối kết quả DISC, Holland RIASEC với các tổ hợp môn học tham khảo và dữ liệu ngành nghề dùng trong tư vấn tuyển sinh 2026.

Phần mềm **EduCareer Guidance Platform** được xây dựng nhằm đóng vai trò **Công cụ hỗ trợ ra quyết định tại Giai đoạn 2**, nằm trong mô hình hướng nghiệp tích hợp 3 giai đoạn:
1. **Giai đoạn 1 (Khám phá & Nhận diện bản thân):** Học sinh thực hiện bài trắc nghiệm hành vi DISC, sở thích nghề nghiệp Holland RIASEC và phân tích SWOT bản thân (có thể làm trực tiếp trên phần mềm hoặc làm khảo sát trên giấy).
2. **Giai đoạn 2 (Tra cứu & Định hướng bằng công nghệ):** Phần mềm tiếp nhận kết quả Holland–DISC, đối chiếu qua ma trận 24 tổ hợp chuẩn mực để truy xuất:
   - Danh mục nghề nghiệp gợi ý.
   - Ngành đào tạo đại học chính quy kèm **Mã ngành chuẩn của Bộ Giáo dục & Đào tạo**.
   - Tổ hợp môn xét tuyển đại học tham khảo (`A00`, `A01`, `D07`, `B00`, `D01`,...).
   - **Tổ hợp môn học lựa chọn lớp 10 THPT theo định hướng tuyển sinh 2026** (Phương án 1 - Chính thức & Phương án 2 - Dự phòng).
   - Xuất phiếu kết quả khổ A4 có ô nhận xét của giáo viên và chữ ký xác nhận 3 bên.
3. **Giai đoạn 3 (Tư vấn chuyên sâu & Đối chiếu thực tế):** Giáo viên hướng nghiệp sử dụng phiếu kết quả từ phần mềm để đối chiếu học lực, hoàn cảnh gia đình, vận dụng khung phản tư **IKIGAI** để cùng học sinh chốt phương án môn học THPT chính thức.

---

## II. ĐẶC TẢ CHI TIẾT CÁC CHỨC NĂNG CỦA PHẦN MỀM

Dựa theo mục **3.2.2 (Các chức năng chính của phần mềm)** trong Đề cương nghiên cứu, các chức năng tư vấn hiện có được mô tả bên dưới. Phạm vi triển khai mới nhất được ghi ở đầu tài liệu:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        QUY TRÌNH HOẠT ĐỘNG CƠ BẢN                     │
│                                                                        │
│   Nhập kết quả Holland & DISC ───► Xác định tổ hợp Holland-DISC        │
│                │                                │                      │
│                ▼                                ▼                      │
│   Tra cứu danh mục nghề nghiệp ───► Tra cứu ngành đào tạo ĐH & Mã ngành│
│                │                                │                      │
│                ▼                                ▼                      │
│   Tra cứu tổ hợp xét tuyển ĐH  ───► Đề xuất môn học THPT (tuyển sinh 2026) │
│                │                                │                      │
│                ▼                                ▼                      │
│   Tích hợp phản tư SWOT-Ikigai ───► Hiển thị & Xuất phiếu kết quả A4   │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Chức Năng 1: Nhập Kết Quả Khám Phá Bản Thân

Học sinh thực hiện bài trắc nghiệm trực tiếp trên phần mềm.

#### Làm bài trắc nghiệm trực tiếp trên phần mềm
- Tích hợp trọn vẹn bộ câu hỏi trắc nghiệm chuẩn mực từ thư mục `cauhoi/`:
  - **Bản Rút Gọn (20 câu - ~5 phút):** 10 câu DISC + 10 câu Holland, thích hợp cho làm quen nhanh hoặc trải nghiệm trên điện thoại.
  - **Bản Tiêu Chuẩn (50 câu - ~15 phút):** 25 câu DISC + 25 câu Holland, chuẩn mực cho các tiết Hoạt động trải nghiệm – Hướng nghiệp trên lớp.
  - **Bản Chuyên Sâu (70 câu - ~25 phút):** 35 câu DISC + 35 câu Holland, phục vụ khảo sát nghiên cứu khoa học sư phạm với độ tin cậy cao.
- **Tùy chọn hình thức:** Học sinh có thể chọn làm bài *Tích hợp cả hai (Holland + DISC)*, hoặc làm riêng từng bài *Chuyên biệt: Hành vi DISC* hoặc *Chuyên biệt: Sở thích Holland*.
- **Tính năng hỗ trợ thí sinh:**
  - Thanh tiến trình % hoàn thành trực quan.
  - Bộ nút nhảy câu hỏi (Stepper pills) cho phép chuyển nhanh đến bất kỳ câu hỏi nào.
  - Nút **"Điền Mẫu Nhanh"** hỗ trợ ban giám khảo hoặc người chấm thi thử nghiệm nhanh kết quả mà không cần bấm từng câu.
  - Nút **"Kiểm tra tình trạng bài test"**: Phản hồi tức thì trạng thái: *Chưa làm (0 câu)*, *Đang làm dở (x/N câu)* hoặc *Đã hoàn thành* kèm huy hiệu xanh lục.

---

### Chức Năng 2: Gợi Ý Danh Mục Nghề Nghiệp Dựa Vào Tổ Hợp Holland–DISC
- **Nguyên lý ma trận 24 tổ hợp:** Kết hợp giữa nhóm xu hướng nghề nghiệp Holland và phong cách hành vi làm việc DISC để đề xuất 4–6 vị trí việc làm tối ưu.
- **Tính năng nổi bật:**
  - Hiển thị danh thiếp nghề nghiệp trực quan gồm: Tên vị trí việc làm, mô tả công việc thực tế, kỹ năng cần có, các vị trí có thể thăng tiến.
  - Mức thu nhập trung bình tham khảo (ví dụ: `18 - 40 triệu VNĐ/tháng`).
  - Danh sách các trường đại học đào tạo uy tín hàng đầu tại Việt Nam (ĐH Bách Khoa, ĐH Xây dựng, ĐH Giao thông Vận tải,...).
  - **Bộ lọc Dropdown theo tính cách:** Cho phép lọc xem theo từng nhóm tính cách (*Tất cả*, *D – Quyết đoán*, *I – Ảnh hưởng*, *S – Ổn định*, *C – Tuân thủ*).
  - **Thanh tìm kiếm tức thì:** Tìm kiếm theo tên nghề, mã ngành hoặc từ khóa kỹ năng.
- **Tính khách quan:** Hiển thị rõ danh mục nghề nghiệp là gợi ý định hướng mang tính tham khảo, không khẳng định mức độ phù hợp tuyệt đối.

---

### Chức Năng 3: Tra Cứu Ngành Đào Tạo Đại Học Kèm Mã Ngành
- Mỗi vị trí nghề nghiệp được liên kết chặt chẽ với **Ngành đào tạo đại học chính quy**.
- Cung cấp chính xác **Mã ngành chuẩn của Bộ Giáo dục & Đào tạo Việt Nam** (ví dụ: Kỹ thuật xây dựng `7580201`, Kỹ thuật cơ khí `7520103`, Kỹ thuật điều khiển và tự động hóa `7520216`, Logistics và quản lý chuỗi cung ứng `7510605`,...).
- **Cơ chế chọn lại chuyên ngành:**
  - Học sinh có thể chọn một ngành dự kiến ở Bước 1.
  - Sau khi có kết quả đánh giá hành vi DISC, học sinh được phép **chọn lại bất kỳ chuyên ngành nào khác** ngay tại khu vực đánh giá.
  - Hệ thống tự động đồng bộ lại toàn bộ vị trí việc làm, tổ hợp xét tuyển và phương án môn học THPT tương ứng.

---

### Chức Năng 4: Tra Cứu Tổ Hợp Xét Tuyển Đại Học
- Cung cấp các tổ hợp môn thi tốt nghiệp THPT và xét tuyển đại học phổ biến cho từng ngành:
  - Khối Kỹ thuật & Công nghệ: `A00` (Toán - Lý - Hóa), `A01` (Toán - Lý - Anh), `D07` (Toán - Hóa - Anh).
  - Khối Nông sinh & Y sinh: `B00` (Toán - Hóa - Sinh), `A00`, `D07`.
  - Khối Quản trị & Logistics: `A00`, `A01`, `D01` (Toán - Văn - Anh).
- Ghi chú rõ ràng: Thông tin tổ hợp xét tuyển mang tính tham khảo và cần đối chiếu với đề án tuyển sinh chính thức của từng trường đại học theo từng năm.

---

### Chức Năng 5 (TÍNH NĂNG TRỌNG TÂM CỦA ĐỀ TÀI): Hỗ Trợ Lựa Chọn Tổ Hợp Môn Học THPT Lớp 10 Theo Định Hướng Tuyển Sinh 2026
Đây là sản phẩm cốt lõi giải quyết đúng tên đề tài tại trường THPT Thành Sen, chuyển hóa kết quả trắc nghiệm và tổ hợp thi đại học thành phương án chọn môn cụ thể:
1. **Danh mục môn học bắt buộc:** Ngữ văn, Toán, Ngoại ngữ 1 (Tiếng Anh), Lịch sử.
2. **Phương án 1 (Ưu tiên chính thức):**
   - Đề xuất chính xác **4 môn học lựa chọn tối ưu** (Ví dụ với khối Kỹ thuật A00/A01: *Vật lý, Hóa học, Tin học, Công nghệ công nghiệp*).
   - Đề xuất **3 cụm chuyên đề học tập** (Ví dụ: *Chuyên đề Toán học, Chuyên đề Vật lý, Chuyên đề Tin học*).
3. **Phương án 2 (Dự phòng):**
   - Đề xuất 4 môn lựa chọn thay thế trong trường hợp nhà trường hết chỉ tiêu phân lớp chuyên sâu (Ví dụ: *Vật lý, Hóa học, Sinh học, Địa lý*).
4. **Căn cứ sư phạm giải thích:** Đưa ra luận cứ khoa học giải thích vì sao tổ hợp môn này bổ trợ tốt nhất cho ngành học đại học và năng lực của học sinh.

---

### Chức Năng 6: Tích Hợp Khung Phản Tư SWOT & IKIGAI (Phục vụ Giai Đoạn 3)
Nhằm kết nối từ phần mềm sang buổi tư vấn trực tiếp của giáo viên:
- **Khung phân tích SWOT cá nhân:**
  - $S$ (Strengths - Điểm mạnh): Tố chất hành vi nổi trội, tư duy kỹ thuật logic.
  - $W$ (Weaknesses - Điểm cần cải thiện): Khuyến nghị rèn luyện tính kiên nhẫn, ngoại ngữ hoặc kỹ năng mềm.
  - $O$ (Opportunities - Cơ hội): Nhu cầu nhân lực kỹ thuật, công nghiệp tại địa phương và cả nước.
  - $T$ (Threats - Thách thức): Biến động điểm chuẩn xét tuyển, cạnh tranh thị trường.
- **Khung phản tư 4 vòng tròn IKIGAI:**
  - Điều bạn yêu thích (Sở thích Holland).
  - Điều bạn giỏi (Thế mạnh hành vi DISC).
  - Điều xã hội cần (Vị trí việc làm có nhu cầu cao).
  - Điều giúp bạn có thu nhập (Mức lương thực tế tham khảo).

---

### Chức Năng 7: Hiển Thị và Xuất Phiếu Kết Quả Chuẩn Hóa Khổ A4
- Nút **"In Phiếu Ngay (A4)"** kích hoạt định dạng in chuyên dụng (`window.print()`).
- Bố cục trang in thiết kế theo quy chuẩn văn bản hướng nghiệp:
  1. Header: Tên đề tài NCKH, trường THPT khảo sát, mã hồ sơ và ngày đánh giá.
  2. Bảng thông tin học sinh, ngành ban đầu và ngành sau đánh giá.
  3. Bảng điểm định lượng % phân bổ 4 nhóm hành vi DISC.
  4. **Khung Phương án môn học lựa chọn lớp 10 THPT (Phương án 1 & Phương án 2)**.
  5. Bảng danh mục 5 nghề nghiệp đại diện kèm mã ngành và tổ hợp môn.
  6. **Ô nhận xét và kết luận của Giáo viên tư vấn (dành để viết bút)**.
  7. **Khung ký xác nhận 3 bên:** Học sinh ký, Phụ huynh ký, Giáo viên/Chuyên viên tư vấn ký và đóng dấu.

---

### Chức Năng 8: Quản Lý Lịch Sử Các Lần Kiểm Tra (LocalStorage)
- Toàn bộ kết quả được lưu trữ an toàn trong bộ nhớ trình duyệt của học sinh (khóa `educareer_history_v2`).
- **Tính năng:**
  - Danh sách trực quan hiển thị ngày giờ, tên học sinh, nhóm tính cách, chuyên ngành và tổ hợp môn THPT.
  - Thanh tìm kiếm lịch sử theo tên hoặc ngành học.
  - Nút **"Xem lại"**: Nạp lại toàn bộ kết quả lên giao diện chính để học sinh xem lại bất cứ lúc nào.
  - Nút **"In phiếu"**: Mở modal in A4 trực tiếp từ lịch sử.
  - Nút **"Xóa"** từng bản ghi hoặc **"Xóa tất cả"**.
  - Nút **"Nạp 3 hồ sơ mẫu"**: Tạo sẵn 3 hồ sơ học sinh mẫu (*Lê Hoàng Nam - Nhóm D*, *Phạm Thu Thảo - Nhóm I*, *Vũ Đức Thành - Nhóm C*) để phục vụ trình diễn báo cáo.

---

### Chức Năng 9: Bảng Ma Trận Quy Chuẩn & Xuất Dữ Liệu CSV
- Hiển thị bảng đối chiếu tổng thể 7 cột theo quy chuẩn của Đề cương nghiên cứu (Hình ảnh 1).
- Cho phép lọc theo nhóm Holland, nhóm DISC và từ khóa.
- Nút **"Xuất File CSV"**: Tạo file `ma_tran_nghe_nghiep_holland_disc.csv` chuẩn mã hóa UTF-8 với ký tự BOM (`\uFEFF`), mở trực tiếp bằng Microsoft Excel không bị lỗi phông tiếng Việt.

---

## III. NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM ĐÃ TÍCH HỢP

Hệ thống đã tích hợp toàn bộ dữ liệu từ 6 file trong thư mục `cauhoi/`:
1. **Bài test DISC (Hành vi):**
   - Gồm 70 câu hỏi tình huống đời sống sinh viên/học sinh.
   - Mỗi câu gồm 4 đáp án phân bổ chính xác cho 4 phong cách: **D** (Quyết đoán), **I** (Ảnh hưởng), **S** (Ổn định), **C** (Tuân thủ).
2. **Bài test HOLLAND (Sở thích nghề nghiệp):**
   - Gồm 70 câu hỏi hoạt động thực tế.
   - Mỗi câu gồm 4 đáp án tương ứng với các nhóm: **R** (Kỹ thuật), **I** (Nghiên cứu), **A** (Nghệ thuật), **S** (Xã hội), **E** (Quản lý), **C** (Nghiệp vụ).
3. **Phân chia cấp độ khoa học:**
   - **Bản Rút Gọn (20 câu):** 10 câu DISC đầu + 10 câu Holland đầu.
   - **Bản Tiêu Chuẩn (50 câu):** 25 câu DISC đầu + 25 câu Holland đầu.
   - **Bản Chuyên Sâu (70 câu):** 35 câu DISC đầu + 35 câu Holland đầu.

---

## IV. BẢNG MA TRẬN QUY CHUẨN ĐỐI CHIẾU (HOLLAND R & DISC)

| ĐẦU VÀO 1 (HOLLAND) | ĐẦU VÀO 2 (DISC) | ĐẦU RA 1 (NGHỀ NGHIỆP GỢI Ý) | ĐẦU RA 2 (NGÀNH ĐÀO TẠO ĐẠI HỌC) | MÃ NGÀNH | ĐẦU RA 3 (TỔ HỢP XÉT TUYỂN) | TỔ HỢP MÔN THPT (ĐỊNH HƯỚNG 2026) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **R – KỸ THUẬT** | **D – Quyết đoán** | Chỉ huy công trường | Kỹ thuật xây dựng | 7580201 | A00, A01, D07 | Vật lý, Hóa học, Tin học, Công nghệ CN |
| **R – KỸ THUẬT** | **D – Quyết đoán** | Kỹ sư vận hành sản xuất | Kỹ thuật cơ khí | 7520103 | A00, A01 | Vật lý, Hóa học, Tin học, Công nghệ CN |
| **R – KỸ THUẬT** | **D – Quyết đoán** | Quản lý thi công điện | Kỹ thuật điện | 7520201 | A00, A01, D07 | Vật lý, Hóa học, Tin học, Công nghệ CN |
| **R – KỸ THUẬT** | **D – Quyết đoán** | Điều phối vận tải | Logistics & QL chuỗi cung ứng | 7510605 | A00, A01, D01 | Vật lý, Tin học, Địa lý, GD Kinh tế & PL |
| **R – KỸ THUẬT** | **D – Quyết đoán** | Kỹ sư robot công nghiệp | Kỹ thuật điều khiển & Tự động hóa | 7520216 | A00, A01, D07 | Vật lý, Tin học, Công nghệ CN, Hóa học |
| **R – KỸ THUẬT** | **D – Quyết đoán** | Kỹ sư công trình giao thông | KT xây dựng công trình giao thông | 7580205 | A00, A01 | Vật lý, Hóa học, Tin học, Công nghệ CN |
| **R – KỸ THUẬT** | **I – Ảnh hưởng** | Chuyên viên tư vấn thiết bị kỹ thuật | Công nghệ kỹ thuật cơ khí | 7510201 | A00, A01 | Vật lý, Tin học, Công nghệ CN, Địa lý |
| **R – KỸ THUẬT** | **I – Ảnh hưởng** | Kỹ sư hỗ trợ khách hàng | Kỹ thuật điện tử - viễn thông | 7520207 | A00, A01 | Vật lý, Tin học, Công nghệ CN, Địa lý |
| **R – KỸ THUẬT** | **I – Ảnh hưởng** | Chuyên viên kinh doanh ô tô | Công nghệ kỹ thuật ô tô | 7510205 | A00, A01 | Vật lý, Tin học, Công nghệ CN, GD Kinh tế & PL |
| **R – KỸ THUẬT** | **I – Ảnh hưởng** | Hướng dẫn viên trải nghiệm nông nghiệp | Nông nghiệp công nghệ cao | 7620118 | A00, B00, D07 | Hóa học, Sinh học, Công nghệ NN, Tin học |
| **R – KỸ THUẬT** | **I – Ảnh hưởng** | Chuyên viên tư vấn công nghệ nông nghiệp | Nông nghiệp công nghệ cao | 7620118 | A00, B00, D07 | Hóa học, Sinh học, Công nghệ NN, Tin học |
| **R – KỸ THUẬT** | **I – Ảnh hưởng** | Chuyên viên tư vấn giải pháp năng lượng | Kỹ thuật năng lượng | 7520114 | A00, A01, D07 | Hóa học, Vật lý, Tin học, Sinh học |
| **R – KỸ THUẬT** | **S – Ổn định** | Kỹ thuật viên bảo trì | Công nghệ kỹ thuật cơ khí | 7510201 | A00, A01 | Vật lý, Hóa học, Tin học, Công nghệ CN |
| **R – KỸ THUẬT** | **S – Ổn định** | Kỹ thuật viên hệ thống điện | Công nghệ kỹ thuật điện, điện tử | 7510301 | A00, A01 | Vật lý, Hóa học, Tin học, Công nghệ CN |
| **R – KỸ THUẬT** | **S – Ổn định** | Chuyên viên vận hành trang trại | Chăn nuôi | 7620105 | A00, B00, D07 | Hóa học, Sinh học, Công nghệ NN, Tin học |
| **R – KỸ THUẬT** | **S – Ổn định** | Kỹ thuật viên môi trường | Công nghệ kỹ thuật môi trường | 7510406 | A00, B00, D07 | Hóa học, Sinh học, Vật lý, Công nghệ |
| **R – KỸ THUẬT** | **S – Ổn định** | Kỹ thuật viên thiết bị y tế | Kỹ thuật y sinh | 7520212 | A00, A01, B00 | Hóa học, Sinh học, Vật lý, Tin học |
| **R – KỸ THUẬT** | **S – Ổn định** | Kỹ sư nuôi trồng thủy sản | Nuôi trồng thủy sản | 7620301 | A00, B00, D07 | Hóa học, Sinh học, Công nghệ NN, Địa lý |
| **R – KỸ THUẬT** | **C – Tuân thủ** | Kỹ sư kiểm định chất lượng (QA/QC) | Kỹ thuật cơ khí | 7520103 | A00, A01 | Vật lý, Hóa học, Tin học, Công nghệ CN |
| **R – KỸ THUẬT** | **C – Tuân thủ** | Chuyên viên an toàn lao động (HSE) | Bảo hộ lao động | 7860101 | A00, A01, B00 | Vật lý, Hóa học, Sinh học, Tin học |
| **R – KỸ THUẬT** | **C – Tuân thủ** | Kỹ sư thiết kế máy | Kỹ thuật cơ điện tử | 7520114 | A00, A01 | Vật lý, Tin học, Công nghệ CN, Hóa học |
| **R – KỸ THUẬT** | **C – Tuân thủ** | Kỹ thuật viên đo đạc | Kỹ thuật trắc địa - bản đồ | 7520503 | A00, A01 | Vật lý, Địa lý, Tin học, Công nghệ |

---

## V. HƯỚNG DẪN CÀI ĐẶT & VẬN HÀNH DỰ ÁN

### 5.1. Khởi Chạy Môi Trường Phát Triển
```bash
# 1. Cài đặt các gói thư viện
npm install

# 2. Khởi chạy máy chủ phát triển (Dev server)
npm run dev
```
Trình duyệt sẽ mở tại địa chỉ: `http://localhost:3000`

### 5.2. Chạy Kiểm Thử Tự Động (Unit Tests)
Dự án được trang bị bộ kiểm thử tự động xác thực thuật toán tính điểm và ánh xạ môn học:
```bash
npx tsx --test src/utils/scoring.test.ts
```
*Kết quả kiểm tra ngày 16/10/2026:* Vượt qua 8/8 kiểm thử sau khi bỏ chế độ nhập mã. Kiểm tra TypeScript và biên dịch bản phát hành đều thành công.

### 5.3. Truy Cập Nhanh Chế Độ Trình Diễn Báo Cáo
Thêm tham số `?demo=1` vào thanh địa chỉ:
`http://localhost:3000/?demo=1`
Phần mềm sẽ tự động nạp kết quả mẫu, hiển thị đầy đủ bảng phân tích hành vi, gợi ý tổ hợp môn THPT và danh mục nghề nghiệp mà không cần làm lại bài test.

---

## VI. KẾT LUẬN & ĐÓNG GÓP CỦA SẢN PHẨM PHẦN MỀM

1. **Tính sư phạm & khoa học:** Phần mềm hiện thực hóa hoàn hảo mô hình hướng nghiệp tích hợp 3 giai đoạn của Đề tài KHKT 2026–2027; không thay thế con người mà đóng vai trò công cụ trợ giúp đắc lực cho học sinh và giáo viên.
2. **Khắc phục khoảng trống thông tin:** Kết nối trực tiếp giữa tâm lý hành vi (DISC), sở thích (Holland) với định hướng môn học lớp 10 và thông tin tuyển sinh đại học năm 2026 của Bộ GD&ĐT.
3. **Sẵn sàng triển khai thực nghiệm:** Dữ liệu hoàn chỉnh, giao diện tối ưu trên máy tính và điện thoại, hỗ trợ xuất phiếu in A4 phục vụ lưu trữ hồ sơ hướng nghiệp học sinh tại các trường THPT trên địa bàn phường Thành Sen, tỉnh Hà Tĩnh.
