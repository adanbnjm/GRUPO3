import { Router } from "express";
import {
  getProductos,
  getProductosdeId,
  postProducto,
  putProducto,
  deleteProducto,
} from "../controllers/productos.js";

const router = Router();

router.get("/", getProductos);
router.get("/:id", getProductosdeId);
router.post("/", postProducto);
router.put("/:id", putProducto);
router.delete("/:id", deleteProducto);

export default router;
