import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { penangananError, tidakDitemukan } from "./middleware/errorMiddleware.js"
import routeV1 from "./routes/v1/index.js"
import routeV2 from "./routes/v2/index.js"

const app = express()
const PORT = process.env.PORT || 3000

// Middleware keamanan
app.use(helmet())
app.use(cors())

// Middleware logging
app.use(morgan("combined"))

// Middleware parsing body
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Endpoint pemeriksaan kesehatan
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    waktu: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// Rute API
app.use("/api/v1", routeV1)
app.use("/api/v2", routeV2)

// Endpoint utama
app.get("/", (req, res) => {
  res.json({
    pesan: "API Manajemen Produk",
    versi: "1.0.0",
    endpoint: {
      v1: "/api/v1",
      v2: "/api/v2",
    },
  })
})

// Middleware penanganan error
app.use(tidakDitemukan)
app.use(penangananError)

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`)
  console.log(`API v1 tersedia di: http://localhost:${PORT}/api/v1`)
  console.log(`API v2 tersedia di: http://localhost:${PORT}/api/v2`)
})

export default app
