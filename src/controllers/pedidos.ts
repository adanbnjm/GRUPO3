import type { Request, Response } from "express";

import { PedidoModel, type CreatePedidoInput } from "../models/pedidos.js";

// GET /pedidos
export async function getPedidos(req: Request, res: Response) {
  try {
    const pedidos = await PedidoModel.findAll();

    res.json({
      message: "Pedidos obtenidos correctamente",
      total: pedidos.length,
      data: pedidos,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// GET /pedidos/:id
export async function getPedidoById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser numérico",
      });
      return;
    }

    const pedido = await PedidoModel.findById(id);

    if (!pedido) {
      res.status(404).json({
        error: "Pedido no encontrado",
      });
      return;
    }

    res.json(pedido);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// POST /pedidos
export async function postPedido(req: Request, res: Response) {
  try {
    const { total, estado, cliente_id } = req.body;

    if (total === undefined || !estado || cliente_id === undefined) {
      res.status(400).json({
        error: "Total, estado y cliente_id son obligatorios",
      });
      return;
    }

    if (Number(total) < 0) {
      res.status(400).json({
        error: "El total no puede ser negativo",
      });
      return;
    }

    const datos: CreatePedidoInput = {
      total: Number(total),
      estado,
      cliente_id: Number(cliente_id),
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
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser numérico",
      });
      return;
    }

    const { total, estado, cliente_id } = req.body;

    if (total === undefined || !estado || cliente_id === undefined) {
      res.status(400).json({
        error: "Faltan datos obligatorios",
      });
      return;
    }

    if (Number(total) < 0) {
      res.status(400).json({
        error: "El total no puede ser negativo",
      });
      return;
    }

    const pedido = await PedidoModel.update(id, {
      total: Number(total),
      estado,
      cliente_id: Number(cliente_id),
    });

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
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser numérico",
      });
      return;
    }

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
