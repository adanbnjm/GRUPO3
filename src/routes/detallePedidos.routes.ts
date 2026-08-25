import { Router } from "express";

import {
  getDetallePedidos,
  getDetallePedidoById,
  postDetallePedido,
  putDetallePedido,
  deleteDetallePedido,
} from "../controllers/detallePedidos.js";

const router = Router();

router.get("/", getDetallePedidos);
router.get("/:id", getDetallePedidoById);
router.post("/", postDetallePedido);
router.put("/:id", putDetallePedido);
router.delete("/:id", deleteDetallePedido);

export default router;
