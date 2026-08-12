# Personal Finance Manager

Ứng dụng quản lý thu chi cá nhân viết bằng HTML, Tailwind CSS và TypeScript. Dữ liệu được lưu trong `localStorage` nên tải lại trang không bị mất.

## Cài đặt và chạy

```bash
npm install
npm run dev
```

Kiểm tra TypeScript:

```bash
npm run typecheck
```

Build bản hoàn chỉnh:

```bash
npm run build
```

## Các chức năng đã có

- Dashboard: số dư, tổng thu, tổng chi và tiến độ ngân sách theo tháng.
- Category: thêm, sửa, xóa, đặt hạn mức và hiển thị số đã chi.
- Transaction: thêm, xóa, chọn category động và sắp xếp mới nhất trước.
- Month Picker: lọc Dashboard, lịch sử và cảnh báo theo tháng.
- Cảnh báo đỏ khi một category vượt hạn mức.
- Summary Table so sánh thu, chi và số dư của các tháng.
- Dữ liệu mẫu được tạo khi lần đầu mở ứng dụng.
- Dữ liệu giao dịch được lưu thành các key riêng theo tháng trong localStorage.

## Luồng xử lý cần nhớ khi báo cáo

Mỗi thao tác đều đi theo một luồng chung:

```text
User thao tác
→ cập nhật mảng trong bộ nhớ
→ save vào localStorage
→ render lại giao diện
```

Ví dụ thêm giao dịch:

```text
submit form
→ tạo newTransaction
→ addTransaction()
→ saveTransactions()
→ refreshTransactionUI()
```

Ví dụ sửa category:

```text
bấm Sửa
→ lấy id từ data-id
→ find() category tương ứng
→ đưa dữ liệu cũ lên form
→ submit gọi updateCategory()
→ saveCategories()
→ render lại
```

## Vai trò từng file

- `type.ts`: định nghĩa cấu trúc `Transaction` và `Category`.
- `storage.ts`: đọc/ghi localStorage, seed dữ liệu và lưu riêng theo tháng.
- `category.ts`: thêm, sửa, xóa category trong mảng.
- `transaction.ts`: thêm, xóa, lọc, sắp xếp và tính toán giao dịch.
- `ui.ts`: chuyển dữ liệu thành nội dung HTML.
- `app.ts`: bắt sự kiện và nối các module thành một luồng hoàn chỉnh.

## Một số điểm TypeScript/JavaScript quan trọng

- `find()` trả về một object đầu tiên phù hợp hoặc `undefined`.
- `filter()` tạo mảng mới, vì vậy khi xóa phải gán lại biến mảng.
- `push()` và sửa thuộc tính object thay đổi dữ liệu trực tiếp trong mảng.
- `dataset.id` đọc `data-id` từ HTML và trả về chuỗi, nên cần `Number(...)`.
- `editingCategoryId === null` nghĩa là form đang thêm; có ID nghĩa là đang sửa.
- `refreshTransactionUI()` là nơi gom việc tính lại và render để tránh code lặp.
