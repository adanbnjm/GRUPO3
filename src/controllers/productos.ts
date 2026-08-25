import { pool } from "../db.js";
import type { Request, Response } from "express";

export async function getProductos(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM productos;");

    res.json({
      message: "Conexion exitosa a la base de datos :D",
      total: result.rowCount,
      data: result.rows,
    });
  } catch (error: any) {
    console.error("Error al consultar PostgreSQL:", error);

    res.status(500).json({
      message: "Error al intentar consultar la base de datos",
      error: error.message,
    });
  }
}
export async function getProductosdeId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numérico",
      });
      return;
    }

    const result = await pool.query("SELECT * FROM productos WHERE id = $1;", [
      id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Producto no encontrado",
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
export async function postProducto(req: Request, res: Response) {
  try {
    const { nombre, categoria, precio, disponible } = req.body;

    if (
      !nombre ||
      !categoria ||
      precio === undefined ||
      disponible === undefined
    ) {
      res.status(400).json({
        error: "Faltan datos obligatorios",
      });
      return;
    }

    const query = `
      INSERT INTO productos (nombre, categoria, precio, disponible)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      nombre,
      categoria,
      precio,
      disponible,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}
/* {
 "nombre": "Coca Cola",
  "categoria": "Bebidas",
  "precio": 10.50,
  "disponible": true
} */
//para probar
export async function putProducto(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numérico",
      });
      return;
    }

    const { nombre, categoria, precio, disponible } = req.body;

    if (
      !nombre ||
      !categoria ||
      precio === undefined ||
      disponible === undefined
    ) {
      res.status(400).json({
        error: "Faltan datos obligatorios",
      });
      return;
    }

    const query = `
      UPDATE productos
      SET nombre = $1,
          categoria = $2,
          precio = $3,
          disponible = $4
      WHERE id = $5
      RETURNING *;
    `;

    const result = await pool.query(query, [
      nombre,
      categoria,
      precio,
      disponible,
      id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Producto no encontrado",
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
export async function deleteProducto(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numérico",
      });
      return;
    }

    const result = await pool.query(
      "DELETE FROM productos WHERE id = $1 RETURNING *;",
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }

    res.json({
      message: "Producto eliminado exitosamente",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}
