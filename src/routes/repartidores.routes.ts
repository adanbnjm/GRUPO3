import { Router } from "express";

import {
  getRepartidores,
  getRepartidorById,
  postRepartidor,
  putRepartidor,
  deleteRepartidor,
} from "../controllers/repartidores.js";

const router = Router();

router.get(
  "/",
  /*
    #swagger.tags = ['Repartidores']
    #swagger.summary = 'Obtener todos los repartidores'
    #swagger.description = 'Retorna todos los repartidores registrados.'
  */
  getRepartidores,
);

router.get(
  "/:id",
  /*
    #swagger.tags = ['Repartidores']
    #swagger.summary = 'Obtener repartidor por ID'
    #swagger.description = 'Busca un repartidor mediante su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del repartidor',
      example: 1
    }
  */
  getRepartidorById,
);

router.post(
  "/",
  /*
    #swagger.tags = ['Repartidores']
    #swagger.summary = 'Crear un repartidor'
    #swagger.description = 'Registra un nuevo repartidor.'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        nombre: 'Juan Pérez',
        vehiculo: 'Motocicleta Honda',
        telefono: '70012345',
        activo: true
      }
    }
  */
  postRepartidor,
);

router.put(
  "/:id",
  /*
    #swagger.tags = ['Repartidores']
    #swagger.summary = 'Actualizar un repartidor'
    #swagger.description = 'Modifica los datos de un repartidor existente.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      example: 1
    }
  */
  putRepartidor,
);

router.delete(
  "/:id",
  /*
    #swagger.tags = ['Repartidores']
    #swagger.summary = 'Eliminar un repartidor'
    #swagger.description = 'Elimina un repartidor mediante su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      example: 1
    }
  */
  deleteRepartidor,
);

export default router;
