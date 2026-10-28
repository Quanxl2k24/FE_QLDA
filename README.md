# 📚 Tài Liệu Hướng Dẫn Base Frontend (FE Architecture Guide)

> **Dành cho:** Toàn bộ thành viên đội ngũ Frontend Engineer tham gia dự án.  
> **Kiến trúc:** Next.js (App Router), TypeScript, Tailwind CSS v4, Feature-Driven Architecture.

---

## 📌 1. Tech Stack & Công Nghệ Cốt Lõi

| Công nghệ | Phiên bản | Mục đích sử dụng |
| :--- | :--- | :--- |
| **Next.js** | `^16.4.3` | Framework cốt lõi (App Router, Turbopack, Partial Prerendering) |
| **React** | `^19.3.0` | Thư viện UI (React Server Components mặc định) |
| **TypeScript** | `^5.0` | Đảm bảo tính an toàn kiểu dữ liệu (Strict type-safety) |
| **Tailwind CSS** | `^4.0` | Styling hệ thống Design Tokens bằng `@theme` |
| **Axios** | `^1.7` | HTTP Client bọc sẵn cơ chế `withCredentials` & Cookie forwarding |
| **TanStack Query** | `^5.67` | Quản lý Server State, caching, revalidation dữ liệu |
| **Zustand** | `^5.0` | Quản lý Client State gọn nhẹ (Giỏ hàng, UI modal state, v.v.) |
| **Zod** | `^3.24` | Runtime schema validation (Form, API payload, Biến môi trường) |
| **Lucide React** | `^0.475` | Hệ thống icon SVG đồng bộ |

---

## 📁 2. Cấu Trúc Thư Mục Dự Án (Project Structure)

Dự án áp dụng cấu trúc **Feature-Driven Architecture** chuẩn hóa bên trong thư mục `src/`:

```text
fe-qlda/
├── .env.example                 # Mẫu khai báo biến môi trường
├── .env.local                   # Biến môi trường cục bộ (Không commit lên Git)
├── next.config.ts               # Cấu hình Next.js (Remote image patterns, Turbopack)
├── package.json
├── tsconfig.json                # Path alias cấu hình: @/* -> ./src/*
├── public/                      # Static assets tĩnh (ảnh, favicon, fonts)
│
└── src/
    ├── app/                     # Next.js App Router ("THIN ROUTER")
    │   ├── layout.tsx           # Root Layout (Google Fonts, AppProviders, Navbar, Footer)
    │   ├── page.tsx             # Landing Page (Chỉ fetch SSR data & render Feature)
    │   ├── not-found.tsx        # Trang lỗi 404 tùy biến
    │   └── error.tsx            # Global Error Boundary
    │
    ├── components/              # Các UI Components dùng chung (Domain-Agnostic)
    │   ├── ui/                  # Atomic primitives: Button, Input, Badge, Skeleton
    │   ├── feedback/            # Toast, EmptyState, Spinner
    │   └── navigation/          # Navbar, Footer, Breadcrumb
    │
    ├── config/                  # Cấu hình tĩnh toàn cục
    │   ├── env.ts               # Validate biến môi trường bằng Zod (BẮT BUỘC DÙNG)
    │   └── site.ts              # Metadata thương hiệu, nav links, SEO defaults
    │
    ├── features/                # TẦNG CHỨA NGHIỆP VỤ (FEATURE-DRIVEN CORE)
    │   ├── mooncakes/           # Ví dụ domain feature Mooncakes
    │   │   ├── api/             # API calls, fetchers, Server Actions
    │   │   ├── components/      # UI components riêng cho feature này
    │   │   ├── hooks/           # Custom hooks riêng cho feature này
    │   │   ├── schemas/         # Zod validation schemas
    │   │   ├── types/           # TypeScript interfaces/types của feature
    │   │   └── index.ts         # Public API (Barrel Export) - CHỈ export những gì bên ngoài cần
    │   └── [feature-name]/      # Tạo các tính năng khác tương tự theo mẫu này
    │
    ├── hooks/                   # Custom Hooks toàn cục (useMediaQuery, useDebounce...)
    │
    ├── lib/                     # Third-party configurations & utilities
    │   ├── utils.ts             # Hàm cn() kết hợp clsx + twMerge, formatCurrency()
    │   ├── fetcher.ts           # Axios instance & HTTP helper methods (Cookie-ready)
    │   └── query-client.ts      # TanStack Query Client configuration
    │
    ├── providers/               # Context Providers bọc ứng dụng
    │   ├── query-provider.tsx   # React Query Provider
    │   └── index.tsx            # Combined Providers giữ RootLayout sạch sẽ
    │
    ├── stores/                  # Quản lý Global Client State (Zustand)
    │   └── cart-store.ts        # Giỏ hàng & hành động thêm/sửa/xóa sản phẩm
    │
    ├── styles/                  # CSS toàn cục
    │   └── globals.css          # Tailwind v4 @theme, bảng màu, typography, radii
    │
    └── types/                   # Global TypeScript types (API responses, Common DTOs)
        ├── api.ts               # ApiResponse<T>, PaginatedResponse<T>, ApiError
        └── index.ts
```

---

## ⚡ 3. Các Nguyên Tắc Kiến Trúc Bắt Buộc (Strict Guidelines)

Tất cả các developer khi viết code mới hoặc refactor **BẮT BUỘC** tuân thủ các quy tắc sau (chi tiết tại `AGENTS.md`):

### 3.1. Nguyên tắc "Thin Router, Fat Feature"
- Thư mục `src/app/` **CHỈ** được chứa:
  - Routing, Layouts (`layout.tsx`), Error Boundaries (`error.tsx`), Loading (`loading.tsx`).
  - Khai báo SEO Metadata (`generateMetadata`).
  - Data fetching ở tầng cao nhất của Server Component để truyền xuống Feature Component.
- ❌ **TUYỆT ĐỐI KHÔNG**: Viết logic form phức tạp, khai báo `useState`, `useEffect`, hoặc business logic nặng trực tiếp bên trong `app/**/page.tsx`. Hãy đóng gói chúng vào `src/features/[feature-name]/components/` và import vào `page.tsx`.

### 3.2. Đóng gói Tính năng & Barrel Exports (`index.ts`)
- Mỗi thư mục feature trong `src/features/[tên-feature]/` bắt buộc phải có file `index.ts`.
- Mọi nơi bên ngoài (như `src/app/` hoặc feature khác) **CHỈ ĐƯỢC PHÉP** import thông qua file barrel này:
  - ✅ **ĐÚNG:** `import { MooncakesCatalog, useMooncakes } from "@/features/mooncakes";`
  - ❌ **SAI:** `import { MooncakesCatalog } from "@/features/mooncakes/components/mooncakes-catalog";`

### 3.3. Luồng Phụ Thuộc 1 Chiều (Unidirectional Dependency Flow)
- Các tầng dùng chung (`src/components/`, `src/hooks/`, `src/lib/`, `src/types/`) **KHÔNG BAO GIỜ** được phép import ngược từ `src/features/` hoặc `src/app/`.
- Không import chéo trực tiếp giữa 2 feature (Feature A không import sâu vào ruột Feature B). Nếu có logic chung, hãy đưa xuống `src/components/`, `src/hooks/`, hoặc `src/stores/`.

### 3.4. Server Component (RSC) vs Client Component (RCC)
- Mọi component mặc định là **React Server Component (RSC)**.
- Chỉ thêm directive `'use client'` ở dòng đầu tiên của file khi cần:
  - Dùng React Hooks (`useState`, `useEffect`, `useContext`, custom hooks).
  - Lắng nghe sự kiện người dùng (`onClick`, `onChange`, `onSubmit`).
  - Truy cập Web APIs của trình duyệt (`window`, `localStorage`, `document`).
- **Đẩy ranh giới `'use client'` xuống leaf component thấp nhất có thể** để tối ưu bundle JavaScript gửi xuống client và giữ lợi thế SSR/SEO.

---

## 🌐 4. Giao Tiếp API & Cơ Chế Cookies

### 4.1. Thông tin Backend
- **Backend URL:** `https://be-qlda-rqdw.onrender.com`
- Khai báo trong `.env.local`:
  ```bash
  NEXT_PUBLIC_API_URL=https://be-qlda-rqdw.onrender.com
  ```

### 4.2. Không gọi trực tiếp `process.env`
- Luôn import từ `@/config/env` để đảm bảo biến môi trường đã được Zod xác thực hợp lệ:
  ```ts
  // ✅ ĐÚNG
  import { env } from "@/config/env";
  console.log(env.NEXT_PUBLIC_API_URL);

  // ❌ SAI
  console.log(process.env.NEXT_PUBLIC_API_URL);
  ```

### 4.3. Cơ chế gửi Cookies tự động qua `src/lib/fetcher.ts`
File [src/lib/fetcher.ts](file:///d:/QLDA/fe-qlda/src/lib/fetcher.ts) đã được cấu hình toàn diện:
1. **Phía Client (Trình duyệt):**
   - Đã cấu hình `withCredentials: true`.
   - Trình duyệt tự động đính kèm cookie (`Set-Cookie` từ server, session cookie, refresh token) trong mọi request gửi sang `https://be-qlda-rqdw.onrender.com`.
2. **Phía Server (Server Components & Server Actions):**
   - Request Interceptor tự động đọc header cookie từ incoming browser request thông qua `next/headers` (`cookies()`) và đính kèm vào header `Cookie` của outbound Axios request.
   - Nhờ đó, gọi API trên Server Component vẫn giữ được trạng thái xác thực của người dùng.

### 4.4. Cách gọi API trong dự án

```ts
import { api, fetcher } from "@/lib/fetcher";

// 1. Gọi trực tiếp bằng helper:
const data = await api.get<Product[]>("/products");
const result = await api.post<OrderResponse>("/orders", orderPayload);

// 2. Kết hợp với TanStack React Query trong custom hook:
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => api.get<Product[]>("/products"),
  });
}
```

---

## 🎨 5. Design System & Tokens ([DESGIN.md](file:///d:/QLDA/fe-qlda/DESGIN.md))

Dự án áp dụng phong cách **Sweetgreen Mooncake Edition** (Gam màu Artisan Bakery ấm áp kết hợp đường nét tối giản).

### 5.1. Bảng màu chuẩn (Palette)
- **Cream Canvas (`#f4f3e7`):** Nền chính của ứng dụng.
- **Deep Forest (`#00473c`):** Màu nhận diện thương hiệu, logo, viền outline, text nhấn.
- **Lime Glow (`#e6ff55`):** Màu hành động chính (Primary CTA Buttons, Badge "ONLINE ONLY").
- **Forest Shadow (`#0e150e`):** Màu chữ chính, có sắc độ tự nhiên, độ tương phản cao.
- **Sage Mist (`#d8e5d6`):** Màu nền dải nội dung phân cách (Content band).
- **Warm Sand (`#e8dcc6`):** Màu nền phụ (Earthy tone).

### 5.2. Các UI Primitives đã tạo sẵn (`src/components/ui/`)
- **`Button`**:
  - `variant="primary"`: Nền `#e6ff55`, chữ `#0e150e`, pill radius `9999px`.
  - `variant="outline"`: Viền 2px `#00473c`, chữ `#00473c`, nền trong suốt.
  - `variant="forest"`: Nền `#00473c`, chữ `#f4f3e7`.
  - `variant="ghost-link"`: Không nền, không viền, có mũi tên `→`, underline khi hover.
  - Hỗ trợ prop `asChild` khi muốn bọc thẻ `<Link>`.
- **`Badge`**: Hỗ trợ variant `lime`, `forest`, `sand`, `sage`.
- **`Input`**: Border radius `8px`, focus border `#00473c`.
- **`Skeleton`**: Skeleton loader màu sắc đồng bộ với tông kem / sage.

---

## 🚀 6. Hướng Dẫn Từng Bước Khi Thêm Tính Năng Mới (Add New Feature)

Khi được giao xây dựng một module nghiệp vụ mới (ví dụ: `orders`), hãy làm đúng 5 bước sau:

### Bước 1: Định nghĩa Types & Schemas
Tạo thư mục `src/features/orders/types/` và `src/features/orders/schemas/`:
```ts
// src/features/orders/types/index.ts
export interface OrderItem {
  id: string;
  total: number;
  status: "pending" | "completed" | "cancelled";
}

// src/features/orders/schemas/index.ts
import { z } from "zod";

export const CreateOrderSchema = z.object({
  items: z.array(z.string()).min(1),
  address: z.string().min(5),
});
```

### Bước 2: Viết tầng API Layer
Tạo `src/features/orders/api/index.ts`:
```ts
import { api } from "@/lib/fetcher";
import { OrderItem } from "../types";

export async function fetchOrders(): Promise<OrderItem[]> {
  return api.get<OrderItem[]>("/orders");
}
```

### Bước 3: Tạo Custom Hooks & Components
- Hook: `src/features/orders/hooks/use-orders.ts` (Dùng React Query).
- Component: `src/features/orders/components/order-list.tsx`, `order-card.tsx`.

### Bước 4: Xuất Public API qua `index.ts`
Tạo `src/features/orders/index.ts`:
```ts
export { OrderList } from "./components/order-list";
export { useOrders } from "./hooks/use-orders";
export * from "./types";
export * from "./schemas";
```

### Bước 5: Ghép vào Next.js App Router
Tạo trang trong `src/app/orders/page.tsx`:
```tsx
import { OrderList, fetchOrders } from "@/features/orders";

export default async function OrdersPage() {
  const initialOrders = await fetchOrders();
  return <OrderList initialData={initialOrders} />;
}
```

---

## 🛠️ 7. Hướng Dẫn Chạy Môi Trường Cục Bộ (Local Development)

```bash
# 1. Clone repository
git clone https://github.com/Quanxl2k24/FE_QLDA.git
cd FE_QLDA

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Tạo file .env.local từ mẫu
cp .env.example .env.local

# 4. Khởi chạy máy chủ phát triển (Next.js 16 với Turbopack)
npm run dev

# 5. Kiểm tra tính hợp lệ của mã nguồn (Kiểm tra trước khi commit)
npm run lint
npm run build
```

---

## 🚢 8. Lưu Ý Khi Deploy Lên Vercel

1. **Root Directory:** Giữ nguyên mặc định `./`.
2. **Build Settings:** Giữ nguyên mặc định của Vercel (không cần override).
3. **Environment Variables:** Bắt buộc nhập vào mục Environment Variables của Vercel:
   - `NEXT_PUBLIC_API_URL` = `https://be-qlda-rqdw.onrender.com`
   - `NEXT_PUBLIC_APP_NAME` = `sweetgreen Mooncake`
