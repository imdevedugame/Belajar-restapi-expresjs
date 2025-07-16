import { v4 as uuidv4 } from "uuid"

class Product {
  constructor({ nama, deskripsi, harga, jumlah, kategori = "umum" }) {
    this.id = uuidv4()
    this.nama = nama
    this.deskripsi = deskripsi
    this.harga = Number.parseFloat(harga)
    this.jumlah = Number.parseInt(jumlah)
    this.kategori = kategori
    this.dibuat = new Date().toISOString()
    this.diperbarui = new Date().toISOString()
  }

  perbarui(data) {
    const fieldDiizinkan = ["nama", "deskripsi", "harga", "jumlah", "kategori"]

    fieldDiizinkan.forEach((field) => {
      if (data[field] !== undefined) {
        if (field === "harga") {
          this[field] = Number.parseFloat(data[field])
        } else if (field === "jumlah") {
          this[field] = Number.parseInt(data[field])
        } else {
          this[field] = data[field]
        }
      }
    })

    this.diperbarui = new Date().toISOString()
    return this
  }

  toJSON() {
    return {
      id: this.id,
      nama: this.nama,
      deskripsi: this.deskripsi,
      harga: this.harga,
      jumlah: this.jumlah,
      kategori: this.kategori,
      dibuat: this.dibuat,
      diperbarui: this.diperbarui,
    }
  }
}

export default Product
