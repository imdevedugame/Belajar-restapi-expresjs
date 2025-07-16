# Belajar API Manajemen Produk Express.js 

API RESTful yang komprehensif untuk mengelola data produk dengan operasi CRUD, versioning API, dan penanganan error yang kuat.
Disini adalah penjelasan singkat setup dan cara menjaalankan nya teman-teman 

## Fitur

- **Operasi CRUD**: Fungsionalitas Create, Read, Update, Delete yang lengkap
- **Versioning API**: Endpoint v1 dan v2 dengan fitur yang berbeda
- **Validasi Data**: Validasi input yang komprehensif dan sanitasi
- **Penanganan Error**: Penanganan error terpusat dengan respons yang detail
- **Struktur Modular**: Controller, model, dan route yang terorganisir dengan baik
- **Keamanan**: Helmet.js untuk header keamanan, dukungan CORS
- **Logging**: Morgan untuk logging permintaan HTTP

## Versi API

### Versi 1 (v1)
- Operasi CRUD dasar
- Filter dan pengurutan sederhana
- Format respons standar

### Versi 2 (v2)
- Semua fitur v1 plus:
- Dukungan paginasi
- Opsi filter yang ditingkatkan
- Operasi massal
- Endpoint statistik produk
- Format respons yang diperbaiki dengan info versi

## Instalasi

1. Clone repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Jalankan server:
   \`\`\`bash
   npm run dev  # Mode development dengan nodemon
   npm start    # Mode production
   \`\`\`

## Endpoint API

### Endpoint Versi 1

#### Produk
- \`GET /api/v1/produk\` - Dapatkan semua produk
- \`GET /api/v1/produk/:id\` - Dapatkan produk berdasarkan ID
- \`POST /api/v1/produk\` - Buat produk baru
- \`PUT /api/v1/produk/:id\` - Perbarui produk
- \`DELETE /api/v1/produk/:id\` - Hapus produk

### Endpoint Versi 2

#### Produk
- \`GET /api/v2/produk\` - Dapatkan semua produk (dengan paginasi)
- \`GET /api/v2/produk/:id\` - Dapatkan produk berdasarkan ID
- \`POST /api/v2/produk\` - Buat produk baru
- \`PUT /api/v2/produk/:id\` - Perbarui produk
- \`DELETE /api/v2/produk/:id\` - Hapus produk
- \`GET /api/v2/produk/statistik\` - Dapatkan statistik produk
- \`POST /api/v2/produk/massal\` - Buat produk secara massal

## Parameter Query

### Filter
- \`kategori\` - Filter berdasarkan kategori produk
- \`hargaMin\` - Filter harga minimum
- \`hargaMaks\` - Filter harga maksimum
- \`cari\` - Cari dalam nama dan deskripsi

### Pengurutan
- \`urutBerdasarkan\` - Field untuk diurutkan (nama, harga, jumlah, dibuat)
- \`arahUrut\` - Arah pengurutan (asc, desc)

### Paginasi (hanya v2)
- \`halaman\` - Nomor halaman (default: 1)
- \`batas\` - Item per halaman (default: 10)

## Skema Produk

\`\`\`json
{
  "id": "uuid",
  "nama": "string (wajib, maks 100 karakter)",
  "deskripsi": "string (wajib, maks 500 karakter)",
  "harga": "number (wajib, positif)",
  "jumlah": "number (wajib, bilangan bulat non-negatif)",
  "kategori": "string (opsional, default: 'umum')",
  "dibuat": "ISO date string",
  "diperbarui": "ISO date string"
}
\`\`\`

## Contoh Permintaan

### Buat Produk
\`\`\`bash
curl -X POST http://localhost:3000/api/v1/produk \\
  -H "Content-Type: application/json" \\
  -d '{
    "nama": "Keyboard Gaming",
    "deskripsi": "Keyboard gaming mekanik dengan lampu RGB",
    "harga": 450000,
    "jumlah": 25,
    "kategori": "elektronik"
  }'
\`\`\`

### Dapatkan Produk dengan Filter
\`\`\`bash
curl "http://localhost:3000/api/v2/produk?kategori=elektronik&hargaMin=200000&halaman=1&batas=5"
\`\`\`

### Buat Produk Massal (v2)
\`\`\`bash
curl -X POST http://localhost:3000/api/v2/produk/massal \\
  -H "Content-Type: application/json" \\
  -d '{
    "produk": [
      {
        "nama": "Produk 1",
        "deskripsi": "Deskripsi 1",
        "harga": 100000,
        "jumlah": 100
      },
      {
        "nama": "Produk 2",
        "deskripsi": "Deskripsi 2",
        "harga": 150000,
        "jumlah": 50
      }
    ]
  }'
\`\`\`

## Penanganan Error

API mengembalikan respons error yang konsisten:

\`\`\`json
{
  "sukses": false,
  "error": {
    "pesan": "Deskripsi error",
    "detail": ["Pesan error detail"]
  }
}
\`\`\`

## Format Respons

### Respons Sukses
\`\`\`json
{
  "sukses": true,
  "versi": "2.0", // hanya v2
  "pesan": "Operasi berhasil",
  "data": { /* data respons */ },
  "jumlah": 10, // untuk endpoint list
  "paginasi": { /* info paginasi (hanya v2) */ }
}
\`\`\`

## Development

Aplikasi menggunakan ES6 modules dan mencakup:
- Arsitektur modular dengan controller dan model terpisah
- Penyimpanan data in-memory (mudah diganti dengan database)
- Validasi yang komprehensif
- Middleware keamanan
- Logging permintaan
- Endpoint pemeriksaan kesehatan

## Fitur Keamanan

- Helmet.js untuk header keamanan
- Konfigurasi CORS
- Validasi dan sanitasi input
- Sanitasi pesan error
- Batas ukuran permintaan
