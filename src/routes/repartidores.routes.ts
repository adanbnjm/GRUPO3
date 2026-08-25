import { Router } from "express";

import {
  getRepartidores,
  getRepartidorById,
  postRepartidor,
  putRepartidor,
  deleteRepartidor,
} from "../controllers/repartidores.js";

const router = Router();

router.get("/", getRepartidores);
router.get("/:id", getRepartidorById);
router.post("/", postRepartidor);
router.put("/:id", putRepartidor);
router.delete("/:id", deleteRepartidor);

export default router;
