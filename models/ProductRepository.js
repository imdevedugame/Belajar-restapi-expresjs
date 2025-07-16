import Product from "./Product.js";

class ProductRepository {
  constructor() {
    this.products = new Map();
    this.isiDataAwal();
  }

  isiDataAwal() {
    const dataProdukContoh = [
      {
        nama: "Laptop",
        deskripsi: "Laptop performa tinggi untuk profesional",
        harga: 15000000,
        jumlah: 50,
        kategori: "elektronik",
      },
      {
        nama: "Mug Kopi",
        deskripsi: "Mug keramik dengan logo perusahaan",
        harga: 50000,
        jumlah: 200,
        kategori: "aksesoris",
      },
      {
        nama: "Mouse Wireless",
        deskripsi: "Mouse wireless ergonomis dengan receiver USB",
        harga: 150000,
        jumlah: 75,
        kategori: "elektronik",
      },
    ];

    dataProdukContoh.forEach((data) => {
      const productInstance = new Product(data);
      this.products.set(productInstance.id, productInstance);
    });
  }

  cariSemua(filter = {}) {
    let hasil = Array.from(this.products.values());

    // Terapkan filter
    if (filter.kategori) {
      hasil = hasil.filter((p) => p.kategori === filter.kategori);
    }

    if (filter.hargaMin) {
      hasil = hasil.filter((p) => p.harga >= Number.parseFloat(filter.hargaMin));
    }

    if (filter.hargaMaks) {
      hasil = hasil.filter((p) => p.harga <= Number.parseFloat(filter.hargaMaks));
    }

    if (filter.cari) {
      const kataCari = filter.cari.toLowerCase();
      hasil = hasil.filter(
        (p) =>
          p.nama.toLowerCase().includes(kataCari) ||
          p.deskripsi.toLowerCase().includes(kataCari)
      );
    }

    // Pengurutan
    if (filter.urutBerdasarkan) {
      const fieldUrut = filter.urutBerdasarkan;
      const arahUrut = filter.arahUrut === "desc" ? -1 : 1;

      hasil.sort((a, b) => {
        if (a[fieldUrut] < b[fieldUrut]) return -1 * arahUrut;
        if (a[fieldUrut] > b[fieldUrut]) return 1 * arahUrut;
        return 0;
      });
    }

    return hasil;
  }

  cariById(id) {
    return this.products.get(id) || null;
  }

  buat(dataProduct) {
    const productInstance = new Product(dataProduct);
    this.products.set(productInstance.id, productInstance);
    return productInstance;
  }

  perbarui(id, dataPerbarui) {
    const productInstance = this.products.get(id);
    if (!productInstance) {
      return null;
    }

    productInstance.perbarui(dataPerbarui);
    return productInstance;
  }

  hapus(id) {
    const productInstance = this.products.get(id);
    if (!productInstance) {
      return null;
    }

    this.products.delete(id);
    return productInstance;
  }

  dapatkanStatistik() {
    const allProducts = Array.from(this.products.values());
    return {
      totalProduct: allProducts.length,
      nilaiTotal: allProducts.reduce((sum, p) => sum + p.harga * p.jumlah, 0),
      rataRataHarga:
        allProducts.length > 0
          ? allProducts.reduce((sum, p) => sum + p.harga, 0) / allProducts.length
          : 0,
      kategori: [...new Set(allProducts.map((p) => p.kategori))],
    };
  }
}

// Singleton export
const productRepository = new ProductRepository();
export default productRepository;
