import express from "express"
import {
  dapatkanSemuaProduk,
  dapatkanProdukById,
  buatProduk,
  perbaruiProduk,
  hapusProduk,
} from "../../controllers/v1/productController.js"

const router = express.Router()

router.route("/").get(dapatkanSemuaProduk).post(buatProduk)

router.route("/:id").get(dapatkanProdukById).put(perbaruiProduk).delete(hapusProduk)

export default router
