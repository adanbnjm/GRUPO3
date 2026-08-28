import { Router } from "express";

import {
  getClientes,
  getClienteById,
  postCliente,
  putCliente,
  deleteCliente,
} from "../controllers/clientes.js";

const router = Router();

// GET /clientes
router.get("/", getClientes);

// GET /clientes/:id
router.get("/:id", getClienteById);

// POST /clientes
router.post("/", postCliente);

// PUT /clientes/:id
router.put("/:id", putCliente);

// DELETE /clientes/:id
router.delete("/:id", deleteCliente);

export default router;
