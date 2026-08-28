import type { Request, Response, NextFunction } from "express";

import {
  createClienteSchema,
  updateClienteSchema,
  clienteIdSchema,
} from "../schemas/clientes.js";

// Validar ID
export function validarClienteId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = clienteIdSchema.safeParse(req.params);

  if (!resultado.success) {
    res.status(400).json({
      error: resultado.error.issues,
    });
    return;
  }

  req.params.id = String(resultado.data.id);

  next();
}

// Validar POST
export function validarCliente(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = createClienteSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      error: resultado.error.issues,
    });
    return;
  }

  req.body = resultado.data;

  next();
}

// Validar PUT
export function validarClienteUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = updateClienteSchema.safeParse(req.body);

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
