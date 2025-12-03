# 🚀 Hướng dẫn cài đặt và chạy Frontend (ReactJS)

Đảm bảo đã cài đặt các phần mềm sau trên máy:

- **Node.js** phiên bản 14 trở lên ([Tải tại đây](https://nodejs.org/))
- **npm** hoặc **yarn** (đi kèm với Node.js)
- **Git** ([Tải tại đây](https://git-scm.com/))

## 🛠️ Hướng dẫn cài đặt

### Bước 1: Clone project về máy

```bash
git clone https://github.com/WAD-IA-06/IA-06-ui.git
cd IA-06-UI
```

### Bước 2: Cài đặt các package cần thiết

Mở terminal trong thư mục root của project và chạy:

```bash
npm install
```
Lệnh này sẽ cài đặt tất cả các dependencies cần thiết cho project (React, React Router, Axios, v.v.).

### Bước 3: Chạy ứng dụng

Khởi động development server:

```bash
npm run dev
```

✅ Nếu mọi thứ thành công:
- Trình duyệt sẽ tự động mở tại `http://localhost:5173`
- Bạn sẽ thấy giao diện ứng dụng React
- Mọi thay đổi trong code sẽ tự động reload (Hot Reload)
