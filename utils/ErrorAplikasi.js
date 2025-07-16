export class ErrorAplikasi extends Error {
  constructor(pesan, kodeStatus = 500, detail = null) {
    super(pesan)
    this.kodeStatus = kodeStatus
    this.status = `${kodeStatus}`.startsWith("4") ? "gagal" : "error"
    this.operasional = true
    this.detail = detail

    Error.captureStackTrace(this, this.constructor)
  }
}
