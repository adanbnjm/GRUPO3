import type { Request, Response, NextFunction } from "express";

import {
  createPedidoSchema,
  updatePedidoSchema,
  pedidoIdSchema,
} from "../schemas/pedidos.schemas.js";

// Validar datos para POST
export function validarPedido(req: Request, res: Response, next: NextFunction) {
  const resultado = createPedidoSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      error: resultado.error.issues,
    });
    return;
  }

  req.body = resultado.data;

  next();
}

// Validar ID del pedido
export function validarPedidoId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = pedidoIdSchema.safeParse(req.params);

  if (!resultado.success) {
    res.status(400).json({
      error: resultado.error.issues,
    });
    return;
  }

  req.params.id = String(resultado.data.id);

  next();
}

// Validar datos para PUT
export function validarPedidoUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = updatePedidoSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      error: resultado.error.issues,
    });
    return;
  }

  req.body = resultado.data;

  next();
}

// Alias para mantener compatibilidad
export const validarActualizacionPedido = validarPedidoUpdate;
