import { Router } from "express";

import {
  getPedidos,
  getPedidoById,
  postPedido,
  putPedido,
  deletePedido,
} from "../controllers/pedidos.js";

const router = Router();

router.get("/", getPedidos);
router.get("/:id", getPedidoById);
router.post("/", postPedido);
router.put("/:id", putPedido);
router.delete("/:id", deletePedido);

export default router;
