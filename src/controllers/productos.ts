import type { Request, Response } from "express";

import {
  ProductoModel,
  type CreateProductoInput,
} from "../models/productos.js";

// GET /productos
export async function getProductos(req: Request, res: Response) {
  try {
    const productos = await ProductoModel.findAll();

    res.json({
      message: "Productos obtenidos correctamente",
      total: productos.length,
      data: productos,
    });
  } catch (error: any) {
    console.error("Error al consultar productos:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// GET /productos/:id
export async function getProductosdeId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numérico",
      });
      return;
    }

    const producto = await ProductoModel.findById(id);

    if (!producto) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }

    res.json(producto);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// POST /productos
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

    const datos: CreateProductoInput = {
      nombre,
      categoria,
      precio,
      disponible,
    };

    const producto = await ProductoModel.create(datos);

    res.status(201).json(producto);
  } catch (error: any) {
    console.error("Error al crear producto:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// PUT /productos/:id
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

    const producto = await ProductoModel.update(id, {
      nombre,
      categoria,
      precio,
      disponible,
    });

    if (!producto) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }

    res.json(producto);
  } catch (error: any) {
    console.error("Error al actualizar producto:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// DELETE /productos/:id
export async function deleteProducto(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser un valor numérico",
      });
      return;
    }

    const eliminado = await ProductoModel.delete(id);

    if (!eliminado) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }

    res.json({
      message: "Producto eliminado exitosamente",
    });
  } catch (error: any) {
    console.error("Error al eliminar producto:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}
