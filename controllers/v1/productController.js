import ProductRepository from "../../models/ProductRepository.js"
import { validasiProduk, validasiPerbaruiProduk } from "../../utils/validasi.js"
import { ErrorAplikasi } from "../../utils/ErrorAplikasi.js"

export const dapatkanSemuaProduk = async (req, res, next) => {
  try {
    const { kategori, hargaMin, hargaMaks, cari, urutBerdasarkan, arahUrut } = req.query

    const filter = {
      kategori,
      hargaMin,
      hargaMaks,
      cari,
      urutBerdasarkan,
      arahUrut,
    }

    const produk = ProductRepository.cariSemua(filter)

    res.json({
      sukses: true,
      jumlah: produk.length,
      data: produk,
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
      pesan: "Produk berhasil dihapus",
      data: produk,
    })
  } catch (error) {
    next(error)
  }
}
