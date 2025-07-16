export const validasiProduk = (data) => {
  const error = []

  // Field wajib
  if (!data.nama || typeof data.nama !== "string" || data.nama.trim().length === 0) {
    error.push("Nama diperlukan dan harus berupa string yang tidak kosong")
  }

  if (!data.deskripsi || typeof data.deskripsi !== "string" || data.deskripsi.trim().length === 0) {
    error.push("Deskripsi diperlukan dan harus berupa string yang tidak kosong")
  }

  if (data.harga === undefined || data.harga === null) {
    error.push("Harga diperlukan")
  } else {
    const harga = Number.parseFloat(data.harga)
    if (isNaN(harga) || harga < 0) {
      error.push("Harga harus berupa angka positif yang valid")
    }
  }

  if (data.jumlah === undefined || data.jumlah === null) {
    error.push("Jumlah diperlukan")
  } else {
    const jumlah = Number.parseInt(data.jumlah)
    if (isNaN(jumlah) || jumlah < 0) {
      error.push("Jumlah harus berupa bilangan bulat non-negatif yang valid")
    }
  }

  // Validasi opsional
  if (data.kategori && typeof data.kategori !== "string") {
    error.push("Kategori harus berupa string")
  }

  // Validasi panjang nama
  if (data.nama && data.nama.length > 100) {
    error.push("Nama harus kurang dari 100 karakter")
  }

  // Validasi panjang deskripsi
  if (data.deskripsi && data.deskripsi.length > 500) {
    error.push("Deskripsi harus kurang dari 500 karakter")
  }

  return {
    valid: error.length === 0,
    error,
  }
}

export const validasiPerbaruiProduk = (data) => {
  const error = []

  // Semua field opsional untuk update, tapi jika ada harus valid
  if (data.nama !== undefined) {
    if (typeof data.nama !== "string" || data.nama.trim().length === 0) {
      error.push("Nama harus berupa string yang tidak kosong")
    } else if (data.nama.length > 100) {
      error.push("Nama harus kurang dari 100 karakter")
    }
  }

  if (data.deskripsi !== undefined) {
    if (typeof data.deskripsi !== "string" || data.deskripsi.trim().length === 0) {
      error.push("Deskripsi harus berupa string yang tidak kosong")
    } else if (data.deskripsi.length > 500) {
      error.push("Deskripsi harus kurang dari 500 karakter")
    }
  }

  if (data.harga !== undefined) {
    const harga = Number.parseFloat(data.harga)
    if (isNaN(harga) || harga < 0) {
      error.push("Harga harus berupa angka positif yang valid")
    }
  }

  if (data.jumlah !== undefined) {
    const jumlah = Number.parseInt(data.jumlah)
    if (isNaN(jumlah) || jumlah < 0) {
      error.push("Jumlah harus berupa bilangan bulat non-negatif yang valid")
    }
  }

  if (data.kategori !== undefined && typeof data.kategori !== "string") {
    error.push("Kategori harus berupa string")
  }

  return {
    valid: error.length === 0,
    error,
  }
}
