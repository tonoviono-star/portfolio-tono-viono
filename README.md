# Portfolio Tono Viono

Website portfolio berbasis Next.js 16. Semua aset yang dipakai aplikasi berada di folder `public/`, sehingga ikut tersedia ketika dideploy ke Vercel.

## Menjalankan secara lokal

Prasyarat: Node.js 20.9 atau lebih baru (direkomendasikan Node 22) dan npm.

```bash
npm ci
npm run dev
```

Buka `http://localhost:3000`.

Untuk memeriksa versi produksi:

```bash
npm run build
npm run start
```

## Deploy ke GitHub dan Vercel

1. Buat repository baru di GitHub tanpa menambahkan README, `.gitignore`, atau lisensi dari GitHub.
2. Dari folder proyek ini, jalankan:

```bash
git init
git add .
git commit -m "Initial portfolio deployment"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPOSITORY.git
git push -u origin main
```

3. Masuk ke [Vercel](https://vercel.com/new), pilih repository tersebut, lalu tekan **Deploy**. Vercel akan memakai `npm ci` dan `npm run build` dari `vercel.json`.

Tidak ada environment variable atau API key yang diperlukan. Jangan mengunggah `node_modules`, `.next`, atau `.vercel`; semuanya sudah dicantumkan dalam `.gitignore`.
