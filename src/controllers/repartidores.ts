import type { Request, Response } from "express";

import {
  RepartidorModel,
  type CreateRepartidorInput,
} from "../models/repartidores.js";

// GET /repartidores
export async function getRepartidores(req: Request, res: Response) {
  try {
    const repartidores = await RepartidorModel.findAll();

    res.json({
      message: "Repartidores obtenidos correctamente",
      total: repartidores.length,
      data: repartidores,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// GET /repartidores/:id
export async function getRepartidorById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser numérico",
      });
      return;
    }

    const repartidor = await RepartidorModel.findById(id);

    if (!repartidor) {
      res.status(404).json({
        error: "Repartidor no encontrado",
      });
      return;
    }

    res.json(repartidor);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// POST /repartidores
export async function postRepartidor(req: Request, res: Response) {
  try {
    const { nombre, vehiculo, telefono, activo } = req.body;

    if (!nombre || !vehiculo || !telefono) {
      res.status(400).json({
        error: "Nombre, vehículo y teléfono son obligatorios",
      });
      return;
    }

    const datos: CreateRepartidorInput = {
      nombre,
      vehiculo,
      telefono,
      activo: activo ?? true,
    };

    const repartidor = await RepartidorModel.create(datos);

    res.status(201).json(repartidor);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// PUT /repartidores/:id
export async function putRepartidor(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser numérico",
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

    const repartidor = await RepartidorModel.update(id, {
      nombre,
      vehiculo,
      telefono,
      activo,
    });

    if (!repartidor) {
      res.status(404).json({
        error: "Repartidor no encontrado",
      });
      return;
    }

    res.json(repartidor);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

// DELETE /repartidores/:id
export async function deleteRepartidor(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        error: "El ID debe ser numérico",
      });
      return;
    }

    const eliminado = await RepartidorModel.delete(id);

    if (!eliminado) {
      res.status(404).json({
        error: "Repartidor no encontrado",
      });
      return;
    }

    res.json({
      message: "Repartidor eliminado correctamente",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}
