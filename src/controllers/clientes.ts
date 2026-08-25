import { pool } from "../db.js";
import type { Request, Response } from "express";

export async function getClientes(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM clientes;");

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

export async function getClienteById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numerico",
      });
      return;
    }

    const result = await pool.query("SELECT * FROM clientes WHERE id = $1;", [
      id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Cliente no encontrado",
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

export async function postCliente(req: Request, res: Response) {
  try {
    const { nombre, apellidos, telefono, direccion, email } = req.body;

    const result = await pool.query(
      `INSERT INTO clientes
      (nombre, apellidos, telefono, direccion, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`,
      [nombre, apellidos, telefono, direccion, email],
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function putCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numerico",
      });
      return;
    }

    const { nombre, apellidos, telefono, direccion, email } = req.body;

    const result = await pool.query(
      `UPDATE clientes
       SET nombre = $1,
           apellidos = $2,
           telefono = $3,
           direccion = $4,
           email = $5
       WHERE id = $6
       RETURNING *;`,
      [nombre, apellidos, telefono, direccion, email, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Cliente no encontrado",
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

export async function deleteCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numerico",
      });
      return;
    }

    const result = await pool.query(
      "DELETE FROM clientes WHERE id = $1 RETURNING *;",
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Cliente no encontrado",
      });
      return;
    }

    res.json({
      message: "Cliente eliminado exitosamente",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}
