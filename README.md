# 🎮 เกมฝึกภาษาไทย สำหรับเด็ก

ศูนย์รวมเกมฝึกภาษาไทยสนุกๆ สำหรับเด็กผู้ชาย ใช้ได้ทั้งบนคอมพิวเตอร์และ iPad
รวมเกมทั้งหมด **15 เกม** จาก Wordwall ครอบคลุมทักษะภาษาไทยทุกด้าน

## ✨ คุณสมบัติ

- 🎯 **เกม 15 เกม** แบ่งเป็น 4 หมวด: พยัญชนะและสระ, คำศัพท์, ชนิดของคำ, การสะกดคำ
- 📱 **Responsive** ใช้ได้บนคอม แท็บเล็ต (iPad) และมือถือ
- 🎨 **ดีไซน์สดใส** สไตล์ผจญภัยเหมาะกับเด็กผู้ชาย
- ⚡ **โหลดเร็ว** ใช้ Vite + React
- 🖼️ **การ์ดเกมสวย** พร้อมภาพตัวอย่างและป้ายระดับความยาก
- ▶️ **เล่นง่าย** แค่คลิกการ์ด → เล่นเกมได้เลยผ่าน iframe

## 🚀 วิธีรันในเครื่อง

ต้องติดตั้ง [Node.js](https://nodejs.org/) เวอร์ชัน 18 ขึ้นไป

```bash
# ติดตั้ง dependencies
npm install

# รันโหมดพัฒนา (เปิด http://localhost:5173)
npm run dev

# สร้างไฟล์สำหรับ deploy
npm run build

# ทดสอบไฟล์ที่ build แล้ว
npm run preview
```

## 📦 วิธี Deploy ไปยัง Vercel (ผ่าน GitHub)

### ขั้นตอนที่ 1: อัปโหลดขึ้น GitHub

**วิธี A — ใช้ GitHub CLI (แนะนำ ถ้าติดตั้งแล้ว):**
```bash
# สร้าง repo และอัปโหลด
gh repo create thai-games-hub --public --source=. --push
```

**วิธี B — ทำด้วยมือ:**
1. ไปที่ [github.com/new](https://github.com/new) สร้าง repository ใหม่ ชื่อ `thai-games-hub`
2. ในเครื่องรันคำสั่ง:
   ```bash
   git init
   git add .
   git commit -m "เกมฝึกภาษาไทยสำหรับเด็ก"
   git branch -M main
   git remote add origin https://github.com/ชื่อผู้ใช้/thai-games-hub.git
   git push -u origin main
   ```

### ขั้นตอนที่ 2: Deploy บน Vercel

1. เข้า [vercel.com](https://vercel.com) → คลิก **Sign Up / Log In** (แนะนำใช้บัญชี GitHub)
2. คลิก **Add New → Project**
3. เลือก repository `thai-games-hub` → คลิก **Import**
4. Vercel จะตรวจจับ Vite อัตโนมัติ — แค่คลิก **Deploy**
5. รอ 1-2 นาที เสร็จแล้วจะได้ URL เช่น `https://thai-games-hub.vercel.app`

> ⚙️ การตั้งค่าจะถูกอ่านจาก `vercel.json` อัตโนมัติ (SPA rewrite)

### อัปเดตเนื้อหา

ทุกครั้งที่ `git push` ขึ้น GitHub → Vercel จะ deploy ใหม่ให้อัตโนมัติ

## ➕ วิธีเพิมเกมใหม่

แก้ไขไฟล์ `src/data/games.js` แล้วเพิ่มออบเจกต์ใหม่:

```js
{
  id: 'my-new-game',              // ID ต้องไม่ซ้ำ
  title: 'ชื่อเกม',
  subtitle: 'คำอธิบายสั้นๆ',
  emoji: '🎯',                     // emoji แทนไอคอน
  color: '#4a90e2',               // สีประจำเกม
  category: 'คำศัพท์',            // หมวดหมู่
  thumb: 'https://...',           // URL ภาพตัวอย่าง
  embed: 'https://wordwall.net/th/embed/...',  // URL iframe
  difficulty: 1,                  // 1=ง่าย, 2=ปานกลาง, 3=ยาก
}
```

## 🛠 เทคโนโลยีที่ใช้

- **Vite** — build tool โหลดเร็ว
- **React 18** — UI library
- **React Router** — หน้าเพจ
- **Framer Motion** — แอนิเมชัน
- **Prompt Font** — ฟอนต์ไทยอ่านง่าย

## 📄 License

MIT — ใช้ได้อย่างอิสระ

เกมโดย [Wordwall](https://wordwall.net)
