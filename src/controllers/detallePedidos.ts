import { pool } from "../db.js";
import type { Request, Response } from "express";

export async function getDetallePedidos(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM detalle_pedidos;");

    res.json({
      message: "Conexion exitosa a la base de datos :D",
      total: result.rowCount,
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function getDetallePedidoById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numerico",
      });
      return;
    }

    const result = await pool.query(
      "SELECT * FROM detalle_pedidos WHERE id = $1;",
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Detalle de pedido no encontrado",
      });
      return;
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

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

    const result = await pool.query(
      `INSERT INTO detalle_pedidos
      (cantidad, precio_unitario, pedido_id, producto_id, repartidores_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`,
      [cantidad, precio_unitario, pedido_id, producto_id, repartidores_id],
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function putDetallePedido(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numerico",
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

    const result = await pool.query(
      `UPDATE detalle_pedidos
       SET cantidad = $1,
           precio_unitario = $2,
           pedido_id = $3,
           producto_id = $4,
           repartidores_id = $5
       WHERE id = $6
       RETURNING *;`,
      [cantidad, precio_unitario, pedido_id, producto_id, repartidores_id, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Detalle de pedido no encontrado",
      });
      return;
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function deleteDetallePedido(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numerico",
      });
      return;
    }

    const result = await pool.query(
      "DELETE FROM detalle_pedidos WHERE id = $1 RETURNING *;",
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Detalle de pedido no encontrado",
      });
      return;
    }

    res.json({
      message: "Detalle de pedido eliminado exitosamente",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}
