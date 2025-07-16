import { ErrorAplikasi } from "../utils/ErrorAplikasi.js"

export const tidakDitemukan = (req, res, next) => {
  const error = new ErrorAplikasi(`Tidak ditemukan - ${req.originalUrl}`, 404)
  next(error)
}

export const penangananError = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  // Log error
  console.error(err)

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const pesan = "Resource tidak ditemukan"
    error = new ErrorAplikasi(pesan, 404)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const pesan = "Nilai field duplikat dimasukkan"
    error = new ErrorAplikasi(pesan, 400)
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const pesan = Object.values(err.errors).map((val) => val.message)
    error = new ErrorAplikasi(pesan, 400)
  }

  res.status(error.kodeStatus || 500).json({
    sukses: false,
    error: {
      pesan: error.message || "Server Error",
      ...(error.detail && { detail: error.detail }),
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  })
}
