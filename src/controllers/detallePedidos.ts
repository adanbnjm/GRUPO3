import type { Request, Response } from "express";

import {
  DetallePedidoModel,
  type CreateDetallePedidoInput,
} from "../models/detallePedidos.js";

// GET /detalle-pedidos
export async function getDetallePedidos(req: Request, res: Response) {
  try {
    const detalles = await DetallePedidoModel.findAll();

    res.json({
      message: "Detalles de pedidos obtenidos correctamente",
      total: detalles.length,
      data: detalles,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// GET /detalle-pedidos/:id
export async function getDetallePedidoById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser numérico",
      });
      return;
    }

    const detalle = await DetallePedidoModel.findById(id);

    if (!detalle) {
      res.status(404).json({
        error: "Detalle de pedido no encontrado",
      });
      return;
    }

    res.json(detalle);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// POST /detalle-pedidos
export async function postDetallePedido(req: Request, res: Response) {
  try {
    const {
      cantidad,
      precio_unitario,
      pedido_id,
      producto_id,
      repartidores_id,
    } = req.body;

    if (
      cantidad === undefined ||
      precio_unitario === undefined ||
      pedido_id === undefined ||
      producto_id === undefined ||
      repartidores_id === undefined
    ) {
      res.status(400).json({
        error: "Faltan datos obligatorios",
      });
      return;
    }

    if (Number(cantidad) <= 0) {
      res.status(400).json({
        error: "La cantidad debe ser mayor a 0",
      });
      return;
    }

    if (Number(precio_unitario) <= 0) {
      res.status(400).json({
        error: "El precio_unitario debe ser mayor a 0",
      });
      return;
    }

    const datos: CreateDetallePedidoInput = {
      cantidad: Number(cantidad),
      precio_unitario: Number(precio_unitario),
      pedido_id: Number(pedido_id),
      producto_id: Number(producto_id),
      repartidores_id: Number(repartidores_id),
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
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser numérico",
      });
      return;
    }

    const {
      cantidad,
      precio_unitario,
      pedido_id,
      producto_id,
      repartidores_id,
    } = req.body;

    if (
      cantidad === undefined ||
      precio_unitario === undefined ||
      pedido_id === undefined ||
      producto_id === undefined ||
      repartidores_id === undefined
    ) {
      res.status(400).json({
        error: "Faltan datos obligatorios",
      });
      return;
    }

    if (Number(cantidad) <= 0) {
      res.status(400).json({
        error: "La cantidad debe ser mayor a 0",
      });
      return;
    }

    if (Number(precio_unitario) <= 0) {
      res.status(400).json({
        error: "El precio_unitario debe ser mayor a 0",
      });
      return;
    }

    const detalle = await DetallePedidoModel.update(id, {
      cantidad: Number(cantidad),
      precio_unitario: Number(precio_unitario),
      pedido_id: Number(pedido_id),
      producto_id: Number(producto_id),
      repartidores_id: Number(repartidores_id),
    });

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
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser numérico",
      });
      return;
    }

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
