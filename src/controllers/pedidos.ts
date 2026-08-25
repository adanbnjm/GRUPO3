import { pool } from "../db.js";
import type { Request, Response } from "express";

export async function getPedidos(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM pedidos;");

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

export async function getPedidoById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numerico",
      });
      return;
    }

    const result = await pool.query("SELECT * FROM pedidos WHERE id = $1;", [
      id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Pedido no encontrado",
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

export async function postPedido(req: Request, res: Response) {
  try {
    const { total, estado, cliente_id } = req.body;

    if (total === undefined || !estado || cliente_id === undefined) {
      res.status(400).json({
        error: "Faltan datos obligatorios",
      });
      return;
    }

    const result = await pool.query(
      `INSERT INTO pedidos (total, estado, cliente_id)
       VALUES ($1, $2, $3)
       RETURNING *;`,
      [total, estado, cliente_id],
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function putPedido(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numerico",
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

    const result = await pool.query(
      `UPDATE pedidos
       SET total = $1,
           estado = $2,
           cliente_id = $3
       WHERE id = $4
       RETURNING *;`,
      [total, estado, cliente_id, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Pedido no encontrado",
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

export async function deletePedido(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numerico",
      });
      return;
    }

    const result = await pool.query(
      "DELETE FROM pedidos WHERE id = $1 RETURNING *;",
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Pedido no encontrado",
      });
      return;
    }

    res.json({
      message: "Pedido eliminado exitosamente",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}
