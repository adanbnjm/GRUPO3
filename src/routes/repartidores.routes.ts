import { Router } from "express";

import {
  getRepartidores,
  getRepartidorById,
  postRepartidor,
  putRepartidor,
  deleteRepartidor,
} from "../controllers/repartidores.js";

import {
  validarRepartidor,
  validarRepartidorId,
  validarRepartidorUpdate,
} from "../middlewares/repartidores.validacion.js";

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
  validarRepartidorId,
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
    #swagger.responses[201] = {
      description: 'Repartidor creado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'Datos inválidos.'
    }
  */
  validarRepartidor,
  postRepartidor,
);

router.put(
  "/:id",
  /*
    #swagger.tags = ['Repartidores']
    #swagger.summary = 'Actualizar un repartidor'
    #swagger.description = 'Actualiza uno o varios datos de un repartidor existente.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del repartidor',
      example: 1
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        nombre: 'Juan Pérez Modificado',
        vehiculo: 'Automóvil',
        telefono: '70099999',
        activo: false
      }
    }
  */
  validarRepartidorId,
  validarRepartidorUpdate,
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
      description: 'ID del repartidor',
      example: 1
    }
  */
  validarRepartidorId,
  deleteRepartidor,
);

export default router;
