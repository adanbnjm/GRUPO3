import type { Request, Response } from "express";

import {
  RepartidorModel,
  type CreateRepartidorInput,
} from "../models/repartidores.js";
// GET /repartidores
export async function getRepartidores(req: Request, res: Response) {
  try {
    // #swagger.tags = ['Repartidores']
    // #swagger.summary = 'Obtener todos los repartidores'
    // #swagger.description = 'Retorna una lista con todos los repartidores registrados en la base de datos.'
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
    // #swagger.tags = ['Repartidores']
    // #swagger.summary = 'Obtener un repartidor por ID'
    // #swagger.description = 'Busca un repartidor específico utilizando su ID numérico.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del repartidor',
        required: true,
        type: 'integer'
    } */
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
    // #swagger.tags = ['Repartidores']
    // #swagger.summary = 'Crear un nuevo repartidor'
    // #swagger.description = 'Registra un nuevo repartidor en el sistema.'
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos del nuevo repartidor',
        required: true,
        schema: {
            nombre: 'Juan Pérez',
            vehiculo: 'Motocicleta Honda',
            telefono: '+56912345678',
            activo: true
        }
    } */
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

export async function putRepartidor(req: Request, res: Response) {
  try {
    // #swagger.tags = ['Repartidores']
    // #swagger.summary = 'Actualizar un repartidor'
    // #swagger.description = 'Modifica los datos de un repartidor existente.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del repartidor a modificar',
        required: true,
        type: 'integer'
    } */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos a actualizar del repartidor',
        required: true,
        schema: {
            nombre: 'Juan Pérez Modificado',
            vehiculo: 'Automóvil Sedan',
            telefono: '+56987654321',
            activo: false
        }
    } */
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

export async function deleteRepartidor(req: Request, res: Response) {
  try {
    // #swagger.tags = ['Repartidores']
    // #swagger.summary = 'Eliminar un repartidor'
    // #swagger.description = 'Elimina de forma permanente un repartidor por su ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del repartidor a eliminar',
        required: true,
        type: 'integer'
    } */
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
