import type { Request, Response } from "express";

import { ClienteModel, type CreateClienteInput } from "../models/clientes.js";

// GET /clientes
export async function getClientes(req: Request, res: Response) {
  try {
    const clientes = await ClienteModel.findAll();

    res.json({
      message: "Clientes obtenidos correctamente",
      total: clientes.length,
      data: clientes,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// GET /clientes/:id
export async function getClienteById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser numérico",
      });
      return;
    }

    const cliente = await ClienteModel.findById(id);

    if (!cliente) {
      res.status(404).json({
        error: "Cliente no encontrado",
      });
      return;
    }

    res.json(cliente);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// POST /clientes
export async function postCliente(req: Request, res: Response) {
  try {
    const { nombre, apellidos, telefono, direccion, email } = req.body;

    if (!nombre || !apellidos) {
      res.status(400).json({
        error: "Nombre y apellidos son obligatorios",
      });
      return;
    }

    const datos: CreateClienteInput = {
      nombre,
      apellidos,
      telefono: telefono ?? null,
      direccion: direccion ?? null,
      email: email ?? null,
    };

    const cliente = await ClienteModel.create(datos);

    res.status(201).json(cliente);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// PUT /clientes/:id
export async function putCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser numérico",
      });
      return;
    }

    const { nombre, apellidos, telefono, direccion, email } = req.body;

    if (!nombre || !apellidos) {
      res.status(400).json({
        error: "Nombre y apellidos son obligatorios",
      });
      return;
    }

    const cliente = await ClienteModel.update(id, {
      nombre,
      apellidos,
      telefono: telefono ?? null,
      direccion: direccion ?? null,
      email: email ?? null,
    });

    if (!cliente) {
      res.status(404).json({
        error: "Cliente no encontrado",
      });
      return;
    }

    res.json(cliente);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// DELETE /clientes/:id
export async function deleteCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser numérico",
      });
      return;
    }

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
    res.status(500).json({
      error: error.message,
    });
  }
}
