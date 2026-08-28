import type { Request, Response } from "express";

import {
  DetallePedidoModel,
  type CreateDetallePedidoInput,
} from "../models/detallePedidos.js";

import {
  createDetallePedidoSchema,
  updateDetallePedidoSchema,
  detallePedidoIdSchema,
} from "../schemas/detallePedidos.js";

// GET /detalle-pedidos
export async function getDetallePedidos(req: Request, res: Response) {
  try {
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

    const detalles = await DetallePedidoModel.findPaginated(limit, offset);

    const total = await DetallePedidoModel.count();

    const totalPages = Math.ceil(total / limit);

    res.json({
      message: "Detalles de pedidos obtenidos correctamente",
      page,
      limit,
      total,
      totalPages,
      data: detalles,
    });
  } catch (error: any) {
    console.error("Error al consultar detalles:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// GET /detalle-pedidos/:id
export async function getDetallePedidoById(req: Request, res: Response) {
  try {
    const resultado = detallePedidoIdSchema.safeParse(req.params);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const { id } = resultado.data;

    const detalle = await DetallePedidoModel.findById(id);

    if (!detalle) {
      res.status(404).json({
        error: "Detalle de pedido no encontrado",
      });
      return;
    }

    res.json(detalle);
  } catch (error: any) {
    console.error("Error al consultar detalle:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// POST /detalle-pedidos
export async function postDetallePedido(req: Request, res: Response) {
  try {
    const resultado = createDetallePedidoSchema.safeParse(req.body);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const datos: CreateDetallePedidoInput = {
      cantidad: resultado.data.cantidad,
      precio_unitario: resultado.data.precio_unitario,
      pedido_id: resultado.data.pedido_id,
      producto_id: resultado.data.producto_id,
      repartidores_id: resultado.data.repartidores_id,
    };

    const detalle = await DetallePedidoModel.create(datos);

    res.status(201).json(detalle);
  } catch (error: any) {
    console.error("Error al crear detalle:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// PUT /detalle-pedidos/:id
export async function putDetallePedido(req: Request, res: Response) {
  try {
    const resultadoId = detallePedidoIdSchema.safeParse(req.params);

    if (!resultadoId.success) {
      res.status(400).json({
        error: resultadoId.error.issues,
      });
      return;
    }

    const resultadoDatos = updateDetallePedidoSchema.safeParse(req.body);

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

    const detalle = await DetallePedidoModel.update(id, datos);

    if (!detalle) {
      res.status(404).json({
        error: "Detalle de pedido no encontrado",
      });
      return;
    }

    res.json(detalle);
  } catch (error: any) {
    console.error("Error al actualizar detalle:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// DELETE /detalle-pedidos/:id
export async function deleteDetallePedido(req: Request, res: Response) {
  try {
    const resultado = detallePedidoIdSchema.safeParse(req.params);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const { id } = resultado.data;

    const eliminado = await DetallePedidoModel.delete(id);

    if (!eliminado) {
      res.status(404).json({
        error: "Detalle de pedido no encontrado",
      });
      return;
    }

    res.json({
      message: "Detalle de pedido eliminado correctamente",
    });
  } catch (error: any) {
    console.error("Error al eliminar detalle:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}
