import { Router } from "express";

import {
  getClientes,
  getClienteById,
  postCliente,
  putCliente,
  deleteCliente,
} from "../controllers/clientes.js";

const router = Router();

router.get("/", getClientes);
router.get("/:id", getClienteById);
router.post("/", postCliente);
router.put("/:id", putCliente);
router.delete("/:id", deleteCliente);

export default router;
