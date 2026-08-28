import type { Request, Response, NextFunction } from "express";

import {
  createRepartidorSchema,
  updateRepartidorSchema,
  repartidorIdSchema,
} from "../schemas/repartidores.js";

export function validarRepartidorId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = repartidorIdSchema.safeParse(req.params);

  if (!resultado.success) {
    res.status(400).json({
      error: resultado.error.issues,
    });
    return;
  }

  req.params.id = String(resultado.data.id);

  next();
}

export function validarRepartidor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = createRepartidorSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      error: resultado.error.issues,
    });
    return;
  }

  req.body = resultado.data;

  next();
}

export function validarRepartidorUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = updateRepartidorSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      error: resultado.error.issues,
    });
    return;
  }

  if (Object.keys(resultado.data).length === 0) {
    res.status(400).json({
      error: "Debe enviar al menos un campo para actualizar",
    });
    return;
  }

  req.body = resultado.data;

  next();
}
