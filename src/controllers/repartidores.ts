import type { Request, Response } from "express";

import {
  RepartidorModel,
  type CreateRepartidorInput,
} from "../models/repartidores.js";

import {
  createRepartidorSchema,
  updateRepartidorSchema,
  repartidorIdSchema,
} from "../schemas/repartidores.js";

// GET /repartidores
export async function getRepartidores(req: Request, res: Response) {
  try {
    const activoQuery = req.query.activo;

    let activo: boolean | undefined;

    if (typeof activoQuery === "string") {
      if (activoQuery !== "true" && activoQuery !== "false") {
        res.status(400).json({
          error: "El parámetro activo debe ser true o false",
        });
        return;
      }

      activo = activoQuery === "true";
    }

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

    const repartidores = await RepartidorModel.findPaginated(
      limit,
      offset,
      activo,
    );

    const total = await RepartidorModel.count(activo);

    const totalPages = Math.ceil(total / limit);

    res.json({
      message: "Repartidores obtenidos correctamente",
      page,
      limit,
      total,
      totalPages,
      data: repartidores,
    });
  } catch (error: any) {
    console.error("Error al consultar repartidores:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// GET /repartidores/:id
export async function getRepartidorById(req: Request, res: Response) {
  try {
    const resultado = repartidorIdSchema.safeParse(req.params);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const { id } = resultado.data;

    const repartidor = await RepartidorModel.findById(id);

    if (!repartidor) {
      res.status(404).json({
        error: "Repartidor no encontrado",
      });
      return;
    }

    res.json(repartidor);
  } catch (error: any) {
    console.error("Error al consultar repartidor:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// POST /repartidores
export async function postRepartidor(req: Request, res: Response) {
  try {
    const resultado = createRepartidorSchema.safeParse(req.body);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const datos: CreateRepartidorInput = {
      nombre: resultado.data.nombre,
      vehiculo: resultado.data.vehiculo,
      telefono: resultado.data.telefono,
      activo: resultado.data.activo,
    };

    const repartidor = await RepartidorModel.create(datos);

    res.status(201).json(repartidor);
  } catch (error: any) {
    console.error("Error al crear repartidor:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// PUT /repartidores/:id
export async function putRepartidor(req: Request, res: Response) {
  try {
    const resultadoId = repartidorIdSchema.safeParse(req.params);

    if (!resultadoId.success) {
      res.status(400).json({
        error: resultadoId.error.issues,
      });
      return;
    }

    const resultadoDatos = updateRepartidorSchema.safeParse(req.body);

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
      vehiculo?: string;
      telefono?: string;
      activo?: boolean;
    } = {};

    if (datos.nombre !== undefined) {
      datosUpdate.nombre = datos.nombre;
    }

    if (datos.vehiculo !== undefined) {
      datosUpdate.vehiculo = datos.vehiculo;
    }

    if (datos.telefono !== undefined) {
      datosUpdate.telefono = datos.telefono;
    }

    if (datos.activo !== undefined) {
      datosUpdate.activo = datos.activo;
    }

    const { id } = resultadoId.data;

    const repartidor = await RepartidorModel.update(id, datosUpdate);

    if (!repartidor) {
      res.status(404).json({
        error: "Repartidor no encontrado",
      });
      return;
    }

    res.json(repartidor);
  } catch (error: any) {
    console.error("Error al actualizar repartidor:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

// DELETE /repartidores/:id
export async function deleteRepartidor(req: Request, res: Response) {
  try {
    const resultado = repartidorIdSchema.safeParse(req.params);

    if (!resultado.success) {
      res.status(400).json({
        error: resultado.error.issues,
      });
      return;
    }

    const { id } = resultado.data;

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
    console.error("Error al eliminar repartidor:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}
