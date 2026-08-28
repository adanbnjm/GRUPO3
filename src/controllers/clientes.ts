import type { Request, Response } from "express";

import { ClienteModel, type CreateClienteInput } from "../models/clientes.js";

import {
  createClienteSchema,
  updateClienteSchema,
  clienteIdSchema,
} from "../schemas/clientes.js";

// GET /clientes
export async function getClientes(req: Request, res: Response) {
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

    const clientes = await ClienteModel.findPaginated(limit, offset);

    const total = await ClienteModel.count();

    const totalPages = Math.ceil(total / limit);

    res.json({
      message: "Clientes obtenidos correctamente",
      page,
      limit,
      total,
      totalPages,
      data: clientes,
    });
  } catch (error: any) {
    console.error("Error al consultar clientes:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// GET /clientes/:id
export async function getClienteById(req: Request, res: Response) {
  try {
    const resultado = clienteIdSchema.safeParse(req.params);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const { id } = resultado.data;

    const cliente = await ClienteModel.findById(id);

    if (!cliente) {
      res.status(404).json({
        error: "Cliente no encontrado",
      });
      return;
    }

    res.json(cliente);
  } catch (error: any) {
    console.error("Error al consultar cliente:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// POST /clientes
export async function postCliente(req: Request, res: Response) {
  try {
    const resultado = createClienteSchema.safeParse(req.body);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const datos: CreateClienteInput = {
      nombre: resultado.data.nombre,
      apellidos: resultado.data.apellidos,
      telefono: resultado.data.telefono ?? null,
      direccion: resultado.data.direccion ?? null,
      email: resultado.data.email ?? null,
    };

    const cliente = await ClienteModel.create(datos);

    res.status(201).json(cliente);
  } catch (error: any) {
    console.error("Error al crear cliente:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// PUT /clientes/:id
export async function putCliente(req: Request, res: Response) {
  try {
    const resultadoId = clienteIdSchema.safeParse(req.params);

    if (!resultadoId.success) {
      res.status(400).json({
        error: resultadoId.error.issues,
      });
      return;
    }

    const resultadoDatos = updateClienteSchema.safeParse(req.body);

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

    const datosUpdate: {
      nombre?: string;
      apellidos?: string;
      telefono?: string | null;
      direccion?: string | null;
      email?: string | null;
    } = {};

    if (datos.nombre !== undefined) {
      datosUpdate.nombre = datos.nombre;
    }

    if (datos.apellidos !== undefined) {
      datosUpdate.apellidos = datos.apellidos;
    }

    if (datos.telefono !== undefined) {
      datosUpdate.telefono = datos.telefono;
    }

    if (datos.direccion !== undefined) {
      datosUpdate.direccion = datos.direccion;
    }

    if (datos.email !== undefined) {
      datosUpdate.email = datos.email;
    }

    const { id } = resultadoId.data;

    const cliente = await ClienteModel.update(id, datosUpdate);

    if (!cliente) {
      res.status(404).json({
        error: "Cliente no encontrado",
      });
      return;
    }

    res.json(cliente);
  } catch (error: any) {
    console.error("Error al actualizar cliente:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// DELETE /clientes/:id
export async function deleteCliente(req: Request, res: Response) {
  try {
    const resultado = clienteIdSchema.safeParse(req.params);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const { id } = resultado.data;

    const eliminado = await ClienteModel.delete(id);

    if (!eliminado) {
      res.status(404).json({
        error: "Cliente no encontrado",
      });
      return;
    }

    res.json({
      message: "Cliente eliminado correctamente",
    });
  } catch (error: any) {
    console.error("Error al eliminar cliente:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}
