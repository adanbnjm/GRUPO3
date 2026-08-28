import type { Request, Response } from "express";

import { PedidoModel, type CreatePedidoInput } from "../models/pedidos.js";

import {
  createPedidoSchema,
  updatePedidoSchema,
  pedidoIdSchema,
} from "../schemas/pedidos.schemas.js";

// GET /pedidos
export async function getPedidos(req: Request, res: Response) {
  try {
    const estado =
      typeof req.query.estado === "string"
        ? req.query.estado.trim()
        : undefined;

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    if (!Number.isInteger(page) || page < 1) {
      res.status(400).json({
        error: "page debe ser un número entero mayor a 0",
      });
      return;
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      res.status(400).json({
        error: "limit debe ser un número entre 1 y 100",
      });
      return;
    }

    const offset = (page - 1) * limit;

    const pedidos = await PedidoModel.findPaginated(limit, offset, estado);

    const total = await PedidoModel.count(estado);

    const totalPages = Math.ceil(total / limit);

    res.json({
      message: "Pedidos obtenidos correctamente",
      page,
      limit,
      total,
      totalPages,
      data: pedidos,
    });
  } catch (error: any) {
    console.error("Error al consultar pedidos:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// GET /pedidos/:id
export async function getPedidoById(req: Request, res: Response) {
  try {
    const resultado = pedidoIdSchema.safeParse(req.params);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const { id } = resultado.data;

    const pedido = await PedidoModel.findById(id);

    if (!pedido) {
      res.status(404).json({
        error: "Pedido no encontrado",
      });
      return;
    }

    res.json(pedido);
  } catch (error: any) {
    console.error("Error al consultar pedido:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// POST /pedidos
export async function postPedido(req: Request, res: Response) {
  try {
    const resultado = createPedidoSchema.safeParse(req.body);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const datos: CreatePedidoInput = {
      total: resultado.data.total,
      estado: resultado.data.estado,
      cliente_id: resultado.data.cliente_id,
    };

    const pedido = await PedidoModel.create(datos);

    res.status(201).json(pedido);
  } catch (error: any) {
    console.error("Error al crear pedido:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// PUT /pedidos/:id
export async function putPedido(req: Request, res: Response) {
  try {
    const resultadoId = pedidoIdSchema.safeParse(req.params);

    if (!resultadoId.success) {
      res.status(400).json({
        error: resultadoId.error.issues,
      });
      return;
    }

    const resultadoDatos = updatePedidoSchema.safeParse(req.body);

    if (!resultadoDatos.success) {
      res.status(400).json({
        error: resultadoDatos.error.issues,
      });
      return;
    }

    const datos = resultadoDatos.data;

    if (Object.keys(datos).length === 0) {
      res.status(400).json({
        error: "Debes enviar al menos un campo para actualizar",
      });
      return;
    }

    const { id } = resultadoId.data;

    const datosUpdate: {
      total?: number;
      estado?: string;
      cliente_id?: number;
    } = {};

    if (datos.total !== undefined) {
      datosUpdate.total = datos.total;
    }

    if (datos.estado !== undefined) {
      datosUpdate.estado = datos.estado;
    }

    if (datos.cliente_id !== undefined) {
      datosUpdate.cliente_id = datos.cliente_id;
    }

    const pedido = await PedidoModel.update(id, datosUpdate);

    if (!pedido) {
      res.status(404).json({
        error: "Pedido no encontrado",
      });
      return;
    }

    res.json(pedido);
  } catch (error: any) {
    console.error("Error al actualizar pedido:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// DELETE /pedidos/:id
export async function deletePedido(req: Request, res: Response) {
  try {
    const resultado = pedidoIdSchema.safeParse(req.params);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const { id } = resultado.data;

    const eliminado = await PedidoModel.delete(id);

    if (!eliminado) {
      res.status(404).json({
        error: "Pedido no encontrado",
      });
      return;
    }

    res.json({
      message: "Pedido eliminado correctamente",
    });
  } catch (error: any) {
    console.error("Error al eliminar pedido:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}
