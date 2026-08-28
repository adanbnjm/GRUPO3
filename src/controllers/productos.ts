import type { Request, Response } from "express";

import {
  ProductoModel,
  type CreateProductoInput,
} from "../models/productos.js";

import {
  createProductoSchema,
  updateProductoSchema,
  productoIdSchema,
} from "../schemas/productos.js";

// GET /productos
export async function getProductos(req: Request, res: Response) {
  try {
    const categoria =
      typeof req.query.categoria === "string"
        ? req.query.categoria.trim()
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

    const productos = await ProductoModel.findPaginated(
      limit,
      offset,
      categoria,
    );

    const total = await ProductoModel.count(categoria);

    const totalPages = Math.ceil(total / limit);

    res.json({
      message: "Productos obtenidos correctamente",
      page,
      limit,
      total,
      totalPages,
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
export async function getProductoById(req: Request, res: Response) {
  try {
    const resultado = productoIdSchema.safeParse(req.params);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const { id } = resultado.data;

    const producto = await ProductoModel.findById(id);

    if (!producto) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }

    res.json(producto);
  } catch (error: any) {
    console.error("Error al consultar producto:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// POST /productos
export async function postProducto(req: Request, res: Response) {
  try {
    const resultado = createProductoSchema.safeParse(req.body);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const datos: CreateProductoInput = resultado.data;

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
    const resultadoId = productoIdSchema.safeParse(req.params);

    if (!resultadoId.success) {
      res.status(400).json({
        error: resultadoId.error.issues,
      });
      return;
    }

    const resultadoDatos = updateProductoSchema.safeParse(req.body);

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
      nombre?: string;
      categoria?: string;
      precio?: number;
      disponible?: boolean;
    } = {};

    if (datos.nombre !== undefined) {
      datosUpdate.nombre = datos.nombre;
    }

    if (datos.categoria !== undefined) {
      datosUpdate.categoria = datos.categoria;
    }

    if (datos.precio !== undefined) {
      datosUpdate.precio = datos.precio;
    }

    if (datos.disponible !== undefined) {
      datosUpdate.disponible = datos.disponible;
    }

    const producto = await ProductoModel.update(id, datosUpdate);

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
    const resultado = productoIdSchema.safeParse(req.params);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const { id } = resultado.data;

    const eliminado = await ProductoModel.delete(id);

    if (!eliminado) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }

    res.json({
      message: "Producto eliminado correctamente",
    });
  } catch (error: any) {
    console.error("Error al eliminar producto:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}
