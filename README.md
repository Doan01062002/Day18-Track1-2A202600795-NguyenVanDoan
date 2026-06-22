# Day 18 — Main Studio · Ôn Đúng Chỗ Yếu

> AI đọc các câu làm sai trong một bài quiz → đề xuất kế hoạch ôn đúng phần yếu.

**Nhóm thực hiện**

| Họ tên | Mã học viên | Vai trò |
|---|---|---|
| Phạm Thị Tuyết Nga | 2A202600877 | **PM** — điều phối, present |
| Nguyễn Văn Đoan | 2A202600795 | Dev — dựng prototype (Cách C) |
| Đỗ Trung Kiên | 2A202600751 | Design — storyboard, UI (Cách A) |
| Nguyễn Đông Anh |2A202600760| Research — phỏng vấn, vận hành WoZ (Cách B) |

**Dự án:** Ôn Đúng Chỗ Yếu — AI gợi ý kế hoạch ôn từ câu quiz sai &nbsp;·&nbsp; **Vai trò của bạn:** PM (điều phối, present)

---

## Artifacts trong repo

| File | Là gì | Cách mở |
|---|---|---|
| [`day18-present-board.html`](day18-present-board.html) | Present board đầy đủ 6 phần + artifact Cách A / B / C | Đúp chuột để mở; nút **In / Lưu PDF** để xuất bản nộp |
| [`on-dung-cho-yeu-prototype.html`](on-dung-cho-yeu-prototype.html) | Prototype Cách C (clickable, 3 màn hình + 2 quiz mẫu) | Được nhúng trong board; cần để **cùng thư mục** với board |

> 💡 Mở `day18-present-board.html` trước — đây là trang tổng. Hai file phải nằm cạnh nhau thì phần nhúng Cách C mới hiện. Nếu trình duyệt chặn file cục bộ, dùng nút *"Mở prototype ở tab mới"* trong board.

**Build-up chain:** Day 16 artifact 02 (JTBD + pain mapping) → Present board Day 18 → `day18-present-board.html`

---

## 1. JTBD Checkpoint

- **Core JTBD:** Khi vừa làm xong một bài quiz/kiểm tra, người học muốn biết **mình yếu ở đâu và nên ôn lại gì trước**, để lần sau làm tốt hơn — mà không phải tự dò lại từng câu.
- **Current workflow:** Người học (hoặc giáo viên) tự xem lại bài, đếm câu sai, tự đoán mình yếu chủ đề nào, rồi tự tìm tài liệu ôn — thủ công, dễ bỏ sót, khó xếp ưu tiên.
- **Pain step đau nhất:** Bước *“từ danh sách câu sai → ra được chủ đề yếu + kế hoạch ôn cụ thể”*. Tốn công, hay làm qua loa nên ôn không trúng.
- **AI leverage point:** AI đọc các câu sai → nhóm theo chủ đề/khái niệm → xếp ưu tiên → sinh kế hoạch ôn. Con người chỉ xem lại và chỉnh.
- **Điểm còn mơ hồ nhất:** Chốt **user là người học tự ôn** (HS cấp 3 / SV năm đầu), môn có chủ đề tách bạch như **Toán / Tiếng Anh** — vì câu hỏi gắn được vào khái niệm rõ ràng thì AI mới nhóm “chỗ yếu” đáng tin. Giáo viên chỉ là user phụ (xem tổng hợp lớp), không phải đối tượng test chính.

_Tự kiểm 3 câu: bỏ AI đi job vẫn còn (✔) · pain nằm đúng 1 bước (✔) · hypothesis bám đúng lát cắt (✔)._

## 2. Hypothesis

> **Người học sẽ _tin và làm theo_ kế hoạch ôn do AI đề xuất — _nếu_ AI chỉ rõ _vì sao_ mỗi chủ đề bị đánh dấu yếu (truy ngược về đúng các câu đã làm sai) và cho họ _xem lại + chỉnh sửa_ trước khi chốt.**

- **Thuộc phần nào:** Lõi giá trị — niềm tin vào output của AI (trust + comprehension).
- **Nếu sai thì sập gì:** Người học không tin / không làm theo → dù AI phân tích đúng sản phẩm vẫn vô dụng → cả hướng “AI sinh kế hoạch ôn” sụp.
- **Vì sao chọn:** Là giả định nền và rẻ để test trước bằng prototype/storyboard, không cần build hệ thống chấm + phân tích thật.

## 3. Current Approach Snapshot

- **Định làm gì:** Build hẳn một **web app** — làm quiz trong app → tự chấm → AI phân tích → sinh kế hoạch ôn → lưu tiến độ.
- **Build lớn không:** Có, tương đối lớn.
- **Tốn gì:** time (vài tuần) · scope rộng · phụ thuộc ngân hàng câu hỏi đã gắn tag · backend chấm · tích hợp LLM · DB · UI nhiều màn.
- **Vì sao đắt/chậm:** Phải có đề + tag + cơ chế chấm **trước khi** test được điều thật sự cần biết (người dùng có tin kế hoạch không) — trong khi điều đó test được mà **chưa cần build gì**.
- **Câu tự ép hỏi:** *“Còn cách nào rẻ hơn để test việc người dùng có tin + làm theo kế hoạch ôn mà chưa cần build cả app chấm điểm không?”*

## 4. Ba cách test rẻ hơn (cùng 1 hypothesis)

### Cách A — Storyboard “Từ điểm số đến kế hoạch” + phỏng vấn

| Trường | Nội dung |
|---|---|
| Loại artifact | Storyboard 4 khung + script phỏng vấn |
| Người dùng thấy gì | 4 khung: thấy điểm → bối rối → AI chỉ 3 chỗ yếu kèm lý do → nhận kế hoạch ôn 3 ngày |
| Phía sau làm gì | Không có hệ thống thật; chỉ vẽ khung + chuẩn bị 5 câu hỏi phỏng vấn |
| Vì sao rẻ hơn | 1–2 giờ vẽ; không code, không cần đề thật |
| Học được gì | Phản ứng đầu tiên; chỗ gây nghi ngờ; ngôn ngữ người dùng mô tả “chỗ yếu” |
| Chưa học được gì | Chưa biết khi tương tác thật (bấm, chỉnh) họ có tin không; chưa test luồng |
| Artifact ở đâu | Trong `day18-present-board.html` (mục 4 · Cách A) |

### Cách B — Wizard-of-Oz “AI giả lập qua tin nhắn”

| Trường | Nội dung |
|---|---|
| Loại artifact | Kịch bản WoZ + mockup hội thoại chat |
| Người dùng thấy gì | Gửi danh sách/ảnh câu sai qua chat → nhận lại phân tích chỗ yếu + kế hoạch ôn, như AI tự động |
| Phía sau làm gì | Bạn đứng sau, dùng Claude/ChatGPT phân tích rồi chỉnh tay trước khi gửi (~3 phút/ca) |
| Vì sao rẻ hơn | Không build app, không cần ngân hàng đề; dùng kênh chat sẵn có |
| Học được gì | Có chịu gửi input không; chất lượng kế hoạch cần đạt mức nào để họ tin + làm theo |
| Chưa học được gì | Chưa test UI/luồng bấm; không scale; phụ thuộc làm tay |
| Artifact ở đâu | Trong `day18-present-board.html` (mục 4 · Cách B) |

### Cách C — Clickable prototype “Ôn Đúng Chỗ Yếu”

| Trường | Nội dung |
|---|---|
| Loại artifact | Prototype HTML, 3 màn hình + 2 quiz mẫu (`on-dung-cho-yeu-prototype.html`) |
| Người dùng thấy gì | Bài làm có câu sai → màn AI phân tích chỗ yếu (kèm lý do) → màn kế hoạch ôn chỉnh sửa được |
| Phía sau làm gì | Dữ liệu mẫu hard-code; logic nhóm câu sai + sinh kế hoạch chạy bằng JS — chưa có chấm/LLM thật |
| Vì sao rẻ hơn | 1 file HTML chạy offline, không backend, không DB, không cần đề thật |
| Học được gì | Khi tự bấm: có hiểu + tin không; “xem câu sai liên quan” có tăng niềm tin không; họ chỉnh kế hoạch thế nào |
| Chưa học được gì | Chưa có dữ liệu thật; chưa biết độ chính xác khi phân tích bài thật; chưa test giữ chân lâu dài |
| Artifact ở đâu | `on-dung-cho-yeu-prototype.html` (nhúng trong board) |

## 5. So sánh nhanh

| Tiêu chí | A · Storyboard | B · WoZ | C · Prototype |
|---|---|---|---|
| Nhanh hơn ở đâu | Xong trong 1–2 giờ | Test ngay với người thật qua chat | Bấm thử được luồng đầy đủ ngay |
| Rẻ hơn ở đâu | Chỉ vẽ tay/slide | Không build, dùng chat sẵn có | 1 file HTML, không backend |
| Gần hành vi thật | Thấp — chỉ xem & kể | Cao — input/output thật | Trung bình–cao — thao tác thật, dữ liệu mẫu |
| Học rõ nhất | Chỗ gây nghi ngờ ban đầu | Có chịu dùng + làm theo không | Hiểu / tin / chỉnh trên luồng thật |
| Giới hạn lớn nhất | Không có tương tác | Làm tay, không scale | Dữ liệu chưa thật |

- **Thuyết phục nhất khi present:** Cách C (bấm được).
- **Dễ bị phản biện nhất:** Cách B (làm tay → “có scale không / có đúng AI tự động không”).

## 6. Present prep + Post-present

- **Mở khi present:** Board này + prototype Cách C (tab riêng).
- **Câu mở đầu 30s:** *“Em test một niềm tin: người học chỉ làm theo kế hoạch ôn của AI khi AI chỉ rõ vì sao mình bị coi là yếu — nên em thử 3 cách rẻ để kiểm tra điều đó.”*
- **Muốn lớp phản biện vào đâu:** Phần **lời giải thích “vì sao bị coi là yếu”** ở Cách C — việc truy ngược về đúng các câu đã làm sai (vd câu 2, 5, 9) đã đủ để người học tin và làm theo chưa, hay cần thêm bằng chứng/độ tin gì.
- **2 câu hỏi cho lớp:** (1) Lý do “dựa trên câu 2, 5, 9” đã đủ để tin chưa? (2) Nên đầu tư tiếp cách nào để học được nhiều nhất với chi phí thấp?

**Sau khi present** ✍️ _(điền sau buổi present):_ phản biện quan trọng nhất · cách bị hỏi nhiều nhất · cần chỉnh gì · giữ nguyên gì.

---

## Chốt trước khi nộp

- [x] Checkpoint lại JTBD
- [x] Chọn đúng 1 hypothesis
- [x] Ghi lại current approach
- [x] Nghĩ ra 3 cách rẻ hơn để test cùng hypothesis
- [x] Làm artifact cho cả 3 cách (A storyboard · B WoZ · C prototype)
- [x] Gom thành present board (`day18-present-board.html`)
- [x] Điền thông tin học viên + chốt các điểm còn mơ hồ
- [ ] Present trước lớp → điền phần **“Sau khi present”** (mục 6) bằng phản hồi thật

> **Ghi chú trung thực (theo PDF):** các quiz, câu trả lời và phản ứng người dùng trong repo này là **dữ liệu mẫu / nháp lý luận** để present được — *chưa phải evidence thật*. Các chỗ ✍️ là phần bạn thay bằng dự án + dữ liệu thật của mình. AI không bịa user/evidence thay bạn.
