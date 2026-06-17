# Z.X AURUM — Sertifikat Generator

Admin tizimga kiradi, ism-familiya (va boshqa maydonlarni) kiritadi → qora-oltin
Z.X AURUM sertifikati real vaqtda chiziladi va **PNG** hamda **PDF** ko‘rinishida
yuqori sifatda yuklab olinadi.

## Imkoniyatlar

- 🔐 **Backend autentifikatsiya** (Express + JWT + bcrypt) — parol serverda
  hash holatida saqlanadi, frontend bundle'da ko‘rinmaydi
- 🎨 Asl dizayndagi qora-oltin sertifikat (A4 landshaft)
- ✍️ Tahrirlanadigan maydonlar: Ism Familiya, Kurs, Kasb, Kompaniya, Direktor,
  Sana, Sertifikat raqami
- 🔳 Har bir sertifikatga noyob QR-kod
- ⬇️ PNG (~3360px) va A4 PDF eksport
- ⏳ Yuklash jarayonida qiziqarli animatsiya, jonli timer va maslahatlar

## Ishga tushirish

```bash
# 1) Barcha paketlarni o'rnatish (frontend + backend)
npm run setup

# 2) Backend sozlamalari
cp server/.env.example server/.env
cd server && npm run hash "AdminZ@123"   # hash va JWT_SECRET hosil qiladi
# chiqqan qiymatlarni server/.env ga joylang (ADMIN_PASSWORD_HASH, JWT_SECRET)

# 3) Ikkalasini birga ishga tushirish (frontend + backend)
npm start
```

Yoki alohida:

```bash
npm run server   # backend  → http://localhost:3001
npm run dev      # frontend → http://localhost:5173
```

Frontend `npm run build` bilan yig‘iladi (`dist/`).

### Kirish ma'lumotlari

| Login | Parol |
| --- | --- |
| `ZohidAdmin@123` | `AdminZ@123` |

> Parolni o‘zgartirish: `cd server && npm run hash "yangi-parol"` → chiqqan
> `ADMIN_PASSWORD_HASH` ni `server/.env` ga yozing va backend'ni qayta ishga
> tushiring.

## Loyiha tuzilmasi

```
src/
  components/    Certificate, Login, LoadingOverlay, Splash
  hooks/         useAuth, useStageScale, useElapsedTimer, useCycle
  utils/         api (backend), export (PNG/PDF), format
  data/          fields, certDefaults, loadingContent
  styles/        index.css
  App.jsx, main.jsx
server/
  index.js       Express API: /api/login, /api/verify, /api/health
  scripts/hash.js  bcrypt hash + JWT_SECRET generatori
  .env           ADMIN_LOGIN, ADMIN_PASSWORD_HASH, JWT_SECRET (gitignore)
```

## API

| Endpoint | Vazifasi |
| --- | --- |
| `POST /api/login` | `{ login, password }` → `{ token }` (JWT, 12 soat) |
| `GET /api/verify` | `Authorization: Bearer <token>` → 200 / 401 |
| `GET /api/health` | Server holati |

Vite dev serveri `/api/*` so‘rovlarini backendga (`:3001`) proksilaydi.

## Texnologiyalar

- React 19 + Vite
- Express, jsonwebtoken, bcryptjs, cors, dotenv (backend)
- `html-to-image` (PNG), `jspdf` (PDF), `qrcode` (QR)
- Google Fonts: Cinzel, Cormorant Garamond, Playfair Display
# Cerf-generator-app
# Certification-website
# Certificate-generator-app
