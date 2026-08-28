import type { Request, Response, NextFunction } from "express";

import {
  createProductoSchema,
  updateProductoSchema,
  productoIdSchema,
} from "../schemas/productos.js";

export function validarProductoId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = productoIdSchema.safeParse(req.params);

  if (!resultado.success) {
    res.status(400).json({
      error: resultado.error.issues,
    });
    return;
  }

  req.params.id = String(resultado.data.id);

  next();
}

export function validarProducto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = createProductoSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      error: resultado.error.issues,
    });
    return;
  }

  req.body = resultado.data;

  next();
}

export function validarProductoUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = updateProductoSchema.safeParse(req.body);

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
