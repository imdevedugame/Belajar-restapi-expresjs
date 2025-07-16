import express from "express"
import productRoutes from "./productRoutes.js"

const router = express.Router()

// Info versi
router.get("/", (req, res) => {
  res.json({
    versi: "1.0",
    pesan: "API Manajemen Produk v1",
    endpoint: {
      produk: "/produk",
    },
  })
})

router.use("/produk", productRoutes)

export default router
