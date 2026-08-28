import type { Request, Response, NextFunction } from "express";

import {
  createDetallePedidoSchema,
  updateDetallePedidoSchema,
  detallePedidoIdSchema,
} from "../schemas/detallePedidos.js";

export function validarDetallePedido(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = createDetallePedidoSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      error: "Datos del detalle de pedido inválidos",
      detalles: resultado.error.issues,
    });
    return;
  }

  req.body = resultado.data;

  next();
}

export function validarDetallePedidoUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = updateDetallePedidoSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      error: "Datos del detalle de pedido inválidos",
      detalles: resultado.error.issues,
    });
    return;
  }

  req.body = resultado.data;

  next();
}

export function validarDetallePedidoId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = detallePedidoIdSchema.safeParse(req.params);

  if (!resultado.success) {
    res.status(400).json({
      error: "ID inválido",
      detalles: resultado.error.issues,
    });
    return;
  }

  req.params.id = String(resultado.data.id);

  next();
}
