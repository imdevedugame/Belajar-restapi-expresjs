import ProductRepository from "../../models/ProductRepository.js"
import { validasiProduk, validasiPerbaruiProduk } from "../../utils/validasi.js"
import { ErrorAplikasi } from "../../utils/ErrorAplikasi.js"

export const dapatkanSemuaProduk = async (req, res, next) => {
  try {
    const { kategori, hargaMin, hargaMaks, cari, urutBerdasarkan, arahUrut, halaman = 1, batas = 10 } = req.query

    const filter = {
      kategori,
      hargaMin,
      hargaMaks,
      cari,
      urutBerdasarkan,
      arahUrut,
    }

    const semuaProduk = ProductRepository.cariSemua(filter)

    // Paginasi
    const nomorHalaman = Number.parseInt(halaman)
    const jumlahBatas = Number.parseInt(batas)
    const indeksAwal = (nomorHalaman - 1) * jumlahBatas
    const indeksAkhir = nomorHalaman * jumlahBatas

    const produkTerpaginasi = semuaProduk.slice(indeksAwal, indeksAkhir)

    const paginasi = {
      saat_ini: nomorHalaman,
      total: Math.ceil(semuaProduk.length / jumlahBatas),
      ada_selanjutnya: indeksAkhir < semuaProduk.length,
      ada_sebelumnya: indeksAwal > 0,
    }

    res.json({
      sukses: true,
      versi: "2.0",
      jumlah: produkTerpaginasi.length,
      total: semuaProduk.length,
      paginasi,
      data: produkTerpaginasi,
    })
  } catch (error) {
    next(error)
  }
}

export const dapatkanProdukById = async (req, res, next) => {
  try {
    const { id } = req.params
    const produk = ProductRepository.cariById(id)

    if (!produk) {
      throw new ErrorAplikasi("Produk tidak ditemukan", 404)
    }

    res.json({
      sukses: true,
      versi: "2.0",
      data: produk,
    })
  } catch (error) {
    next(error)
  }
}

export const buatProduk = async (req, res, next) => {
  try {
    const validasi = validasiProduk(req.body)
    if (!validasi.valid) {
      throw new ErrorAplikasi("Validasi gagal", 400, validasi.error)
    }

    const produk = ProductRepository.buat(req.body)

    res.status(201).json({
      sukses: true,
      versi: "2.0",
      pesan: "Produk berhasil dibuat",
      data: produk,
    })
  } catch (error) {
    next(error)
  }
}

export const perbaruiProduk = async (req, res, next) => {
  try {
    const { id } = req.params

    const validasi = validasiPerbaruiProduk(req.body)
    if (!validasi.valid) {
      throw new ErrorAplikasi("Validasi gagal", 400, validasi.error)
    }

    const produk = ProductRepository.perbarui(id, req.body)

    if (!produk) {
      throw new ErrorAplikasi("Produk tidak ditemukan", 404)
    }

    res.json({
      sukses: true,
      versi: "2.0",
      pesan: "Produk berhasil diperbarui",
      data: produk,
    })
  } catch (error) {
    next(error)
  }
}

export const hapusProduk = async (req, res, next) => {
  try {
    const { id } = req.params
    const produk = ProductRepository.hapus(id)

    if (!produk) {
      throw new ErrorAplikasi("Produk tidak ditemukan", 404)
    }

    res.json({
      sukses: true,
      versi: "2.0",
      pesan: "Produk berhasil dihapus",
      data: produk,
    })
  } catch (error) {
    next(error)
  }
}

export const dapatkanStatistikProduk = async (req, res, next) => {
  try {
    const statistik = ProductRepository.dapatkanStatistik()

    res.json({
      sukses: true,
      versi: "2.0",
      data: statistik,
    })
  } catch (error) {
    next(error)
  }
}

export const buatProdukMassal = async (req, res, next) => {
  try {
    const { produk } = req.body

    if (!Array.isArray(produk) || produk.length === 0) {
      throw new ErrorAplikasi("Array produk diperlukan", 400)
    }

    const produkTerbuat = []
    const error = []

    produk.forEach((dataProduk, indeks) => {
      const validasi = validasiProduk(dataProduk)
      if (validasi.valid) {
        const produkBaru = ProductRepository.buat(dataProduk)
        produkTerbuat.push(produkBaru)
      } else {
        error.push({
          indeks,
          error: validasi.error,
        })
      }
    })

    res.status(201).json({
      sukses: true,
      versi: "2.0",
      pesan: `${produkTerbuat.length} produk berhasil dibuat`,
      data: produkTerbuat,
      error: error.length > 0 ? error : undefined,
    })
  } catch (error) {
    next(error)
  }
}
