import express from "express"
import productRoutes from "./productRoutes.js"

const router = express.Router()

// Info versi
router.get("/", (req, res) => {
  res.json({
    versi: "2.0",
    pesan: "API Manajemen Produk v2",
    fitur: ["Paginasi", "Filter lanjutan", "Operasi massal", "Statistik"],
    endpoint: {
      produk: "/produk",
      statistik: "/produk/statistik",
      massal: "/produk/massal",
    },
  })
})

router.use("/produk", productRoutes)

export default router
