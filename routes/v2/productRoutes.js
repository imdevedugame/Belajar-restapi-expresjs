import express from "express"
import {
  dapatkanSemuaProduk,
  dapatkanProdukById,
  buatProduk,
  perbaruiProduk,
  hapusProduk,
  dapatkanStatistikProduk,
  buatProdukMassal,
} from "../../controllers/v2/productController.js"

const router = express.Router()

// Endpoint statistik (harus sebelum route /:id)
router.get("/statistik", dapatkanStatistikProduk)

// Operasi massal
router.post("/massal", buatProdukMassal)

router.route("/").get(dapatkanSemuaProduk).post(buatProduk)

router.route("/:id").get(dapatkanProdukById).put(perbaruiProduk).delete(hapusProduk)

export default router
