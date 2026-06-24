# Day 18 + Day 20 — Ôn Đúng Chỗ Yếu (Human-Centered AI · Retention & Habit)

> Một trải nghiệm AI giúp **học sinh** hiểu đúng, tin đúng mức, giữ quyền kiểm soát và tiếp tục hoàn thành mục tiêu **khi AI không hoàn hảo** (Day 18) — và được phân tích để **giữ chân, tạo thói quen** (Day 20).

**Hướng đề (Track):** AI Personal Assistant for Students &nbsp;·&nbsp; **Tính năng:** AI đọc bài quiz đã làm → chỉ ra chỗ yếu → đề xuất kế hoạch ôn → người học xem lại, sửa, chốt.

> 🔀 Mở prototype và dùng thanh **Day 18 · Prototype** ⇄ **Day 20 · Retention & Habit** ở đầu trang để chuyển giữa hai phần. Day 18 (mục 00–07) giữ nguyên; Day 20 (mục 00–12) là phần bổ sung.

**Nhóm thực hiện**

| Họ tên | Mã học viên | Vai trò |
|---|---|---|
| Phạm Thị Tuyết Nga | 2A202600877 | **PM** — điều phối, present |
| Nguyễn Văn Đoan | 2A202600795 | Dev — dựng prototype |
| Đỗ Trung Kiên | 2A202600751 | Design — flow, UI, rationale |
| Nguyễn Đông Anh | 2A202600760 | Research — kịch bản, feedback loop |

---

## Artifact trong repo

| File | Là gì | Cách mở |
|---|---|---|
| [`day18-track1-prototype.html`](day18-track1-prototype.html) | **Prototype chính** — chứa cả Day 18 (mục 00–07) và Day 20 (mục 00–12) trong một file | Đúp chuột để mở trong trình duyệt; không cần internet, không cần backend |

> 💡 Toàn bộ bài nằm trong **một file HTML duy nhất**. Dùng thanh chuyển ở đầu trang để đi giữa Day 18 và Day 20.

---

## Tính năng được thiết kế (đáp ứng yêu cầu Day 18)

Prototype thể hiện một trải nghiệm **thống nhất** xuyên suốt 4 giai đoạn, tổ chức theo đúng cấu trúc đề bài:

| Mục | Nội dung | Năng lực chứng minh |
|---|---|---|
| **00 Flow map** | Sơ đồ tính năng + phạm vi (in/out) | Phạm vi rõ, không "ôm" cả sản phẩm |
| **01 Onboarding** *(bắt buộc)* | Lần đầu dùng: AI làm được/không được gì · cần data nào · cấp & rút quyền | Đặt kỳ vọng đúng, tiến dần (không form dài) |
| **02 Trong khi AI hỗ trợ** | Nhập quiz → loading → nhóm câu sai thành chủ đề yếu · **AI hỏi lại** khi bằng chứng yếu · lớp **bằng chứng** | During · Uncertainty · Explainability |
| **03 Sau · Agency** | Kế hoạch ôn sửa được · phân biệt **dữ kiện vs suy luận** · đủ 3 mức tự chủ | **Act / Ask / Don't Act** |
| **04 Lỗi & Khôi phục** | KB1: AI gán nhầm chủ đề → người dùng sửa → hệ thống xác nhận → tính lại. KB2: nhắc việc đã xong → dừng nhắc | 2 vòng recovery hoàn chỉnh |
| **05 Feedback 2×2** | Ma trận đủ 4 ô (user/system × explicit/implicit) kèm ví dụ thật trong flow | Two-way feedback |
| **06 Design rationale** | 5 quyết định lớn, lập luận theo rủi ro & khả năng khôi phục | Rationale đặt cạnh flow |
| **07 Demo path** | Đường bấm 5 phút cho giảng viên | Demo đúng thời gian |

### Các mức tự chủ trong prototype

- **Act** — AI tự sắp thứ tự ôn theo ưu tiên (rủi ro thấp, thấy ngay, **có nút hoàn tác**).
- **Ask** — AI xin phép trước khi thêm buổi ôn vào lịch (tác động tới thời gian thật); AI hỏi lại khi một chủ đề chỉ có 1 câu sai.
- **Don't Act** — AI **không** tự gửi kế hoạch cho giáo viên, không tự đánh dấu "đã giỏi", không chấm lại bài (khó hoàn tác / ảnh hưởng đánh giá).

### Lớp bằng chứng (Explainability)

Mỗi chủ đề yếu đều truy ngược về đúng **các câu đã làm sai** ("Xem câu sai liên quan") — người học tự kiểm chứng và nhờ đó phát hiện được khi AI phân loại sai.

---

## Kịch bản (đạt mức tối thiểu: 1 onboarding + 4 kịch bản)

| # | Mã | Loại | Ở mục |
|---|---|---|---|
| 1 | S0 — Onboarding lần đầu | *Bắt buộc* | 01 |
| 2 | S2 — Nhiều chủ đề, xếp ưu tiên | Trong tương tác · Explainability | 02 |
| 3 | S3 — Đề xuất kế hoạch ôn | Trong tương tác · Agency | 03 |
| 4 | S6 — AI gán nhầm chủ đề | Sai sót & Khôi phục | 04 |
| 5 | S8 — Nhắc việc đã ôn rồi | Sai sót & Khôi phục | 04 |

---

## Demo path 5 phút (mục 07 trong prototype)

1. **00** — người dùng, vấn đề & tính năng
2. **01** — onboarding 3 bước, cấp quyền đọc quiz
3. **02** — cho AI phân tích, xem bằng chứng, trả lời câu AI hỏi lại
4. **03** — hoàn tác sắp xếp (Act), trả lời thêm-vào-lịch (Ask), xem ranh giới Don't Act
5. **04** — sửa chủ đề AI gán nhầm + dừng nhắc việc đã xong
6. **05** — chỉ đủ 4 ô feedback
7. **06** — quyết định quan trọng nhất (Don't Act) + rủi ro còn lại

---

## Ghi chú trung thực

Mọi quiz, câu trả lời và phản hồi AI trong prototype là **dữ liệu mẫu viết sẵn** để present — **chưa nối mô hình/AI thật** (đúng yêu cầu "prototype không cần kết nối API thật"). Trọng tâm là **trải nghiệm khi AI không hoàn hảo**, không phải độ chính xác của mô hình.

## Đối chiếu điều kiện tối thiểu (mục 19 đề bài)

- [x] Onboarding cho lần đầu sử dụng tính năng
- [x] ≥ 4 kịch bản ngoài onboarding (2 tương tác + 2 sai sót/khôi phục)
- [x] Trải nghiệm xuyên suốt Onboarding → During → After → Feedback
- [x] Đủ Act / Ask / Don't Act
- [x] ≥ 1 vòng feedback và recovery hoàn chỉnh
- [x] Đủ 4 loại feedback trong ma trận 2×2
- [x] ≥ 1 lớp bằng chứng / giải thích
- [x] Design rationale đặt cạnh flow

---

## Day 20 — Retention, Engagement & Habit Loop (bổ sung)

Tiếp tục cùng sản phẩm/persona Day 18. Mở thanh **Day 20** trong prototype (mục 00–12):

| Mục | Đầu ra bắt buộc |
|---|---|
| 00 | Điểm xuất phát (giữ sản phẩm, scenario, persona, recovery flow Day 18) |
| 01 | **Customer Retention Canvas** — Problem · Persona · Anti-persona · Why · Alternative · Frequency |
| 02 | **Core Action & Active User** (định nghĩa + ngưỡng) |
| 03 | **Retention metric theo natural frequency** (Weekly → WAU + cohort W1/W4) |
| 04 | **Onboarding audit** — current-state journey + friction (Keep/Remove/Delay/Simplify) + bảng current state |
| 05 | **Redesigned onboarding → first core action** + Activation/TTV |
| 06 | **Before/After** + recovery path |
| 07 | **Measurement Ladder** |
| 08 | **North Star + ≤3 Input Metrics** + leading/lagging + trade-off |
| 09 | **Nature vs Nurture** |
| 10 | **Hook Review** (Trigger·Action·Variable Reward·Investment) + Hook flow |
| 11 | **Metric Tracking Requirement** (định nghĩa metric + event + ≥4 tiêu chí nghiệm thu) |
| 12 | **Demo path 8 phút** |

**Tóm tắt product logic:** Use case (ôn đúng chỗ yếu sau quiz) → frequency **Weekly** → core action **chốt kế hoạch ôn** → active user **chốt ≥1 lần/tuần** → retention **WAU + cohort tuần** → North Star **số kế hoạch chốt/tuần**.

### Checklist Day 20 (mục 23 đề bài)

- [x] Một use case chính + Problem/Persona/Anti-persona/Why/Alternative; frequency suy từ hành vi thật
- [x] Core action tạo value; active user có ngưỡng rõ; retention metric khớp frequency (không copy DAU/D7)
- [x] Current-state journey + friction audit + redesigned journey + activation/TTFCA/TTV/aha
- [x] Before/After cụ thể + giữ recovery flow Day 18
- [x] Measurement Ladder + 1 North Star + ≤3 Input + leading/lagging + 1 trade-off
- [x] Phân biệt nature/nurture; Hook Review đủ Trigger·Action·Reward·Investment; kiểm tra lợi ích cho user
- [x] Metric có định nghĩa/công thức/window/segment; event map tới metric; ≥4 tiêu chí nghiệm thu
- [x] Một file, phân biệt rõ phần Day 18 và Day 20; có demo path ≤ 8 phút
