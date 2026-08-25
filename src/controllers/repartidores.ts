import { pool } from "../db.js";
import type { Request, Response } from "express";

export async function getRepartidores(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM repartidores;");

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

export async function getRepartidorById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numerico",
      });
      return;
    }

    const result = await pool.query(
      "SELECT * FROM repartidores WHERE id = $1;",
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Repartidor no encontrado",
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

export async function postRepartidor(req: Request, res: Response) {
  try {
    const { nombre, vehiculo, telefono, activo } = req.body;

    if (!nombre || !vehiculo || !telefono) {
      res.status(400).json({
        error: "Faltan datos obligatorios",
      });
      return;
    }

    const result = await pool.query(
      `INSERT INTO repartidores
      (nombre, vehiculo, telefono, activo)
      VALUES ($1, $2, $3, COALESCE($4, TRUE))
      RETURNING *;`,
      [nombre, vehiculo, telefono, activo],
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function putRepartidor(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numerico",
      });
      return;
    }

    const { nombre, vehiculo, telefono, activo } = req.body;

    if (!nombre || !vehiculo || !telefono || activo === undefined) {
      res.status(400).json({
        error: "Faltan datos obligatorios",
      });
      return;
    }

    const result = await pool.query(
      `UPDATE repartidores
       SET nombre = $1,
           vehiculo = $2,
           telefono = $3,
           activo = $4
       WHERE id = $5
       RETURNING *;`,
      [nombre, vehiculo, telefono, activo, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Repartidor no encontrado",
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

export async function deleteRepartidor(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numerico",
      });
      return;
    }

    const result = await pool.query(
      "DELETE FROM repartidores WHERE id = $1 RETURNING *;",
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Repartidor no encontrado",
      });
      return;
    }

    res.json({
      message: "Repartidor eliminado exitosamente",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}
