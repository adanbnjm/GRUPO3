import { Router } from "express";

import {
  getClientes,
  getClienteById,
  postCliente,
  putCliente,
  deleteCliente,
} from "../controllers/clientes.js";

const router = Router();

// Obtener todos los clientes
router.get(
  "/",
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Obtener todos los clientes'
    #swagger.description = 'Obtiene la lista completa de clientes registrados.'
  */
  getClientes,
);

// Obtener cliente por ID
router.get(
  "/:id",
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Obtener cliente por ID'
    #swagger.description = 'Busca un cliente específico mediante su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del cliente'
    }
  */
  getClienteById,
);

// Crear cliente
router.post(
  "/",
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Crear cliente'
    #swagger.description = 'Registra un nuevo cliente.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              nombre: {
                type: "string",
                example: "Juan"
              },
              apellidos: {
                type: "string",
                example: "Pérez"
              },
              telefono: {
                type: "string",
                example: "70012345"
              },
              direccion: {
                type: "string",
                example: "Av. Principal #123"
              },
              email: {
                type: "string",
                example: "juan@gmail.com"
              }
            }
          }
        }
      }
    }
  */
  postCliente,
);

// Actualizar cliente
router.put(
  "/:id",
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Actualizar cliente'
    #swagger.description = 'Actualiza los datos de un cliente existente.'
  */
  putCliente,
);

// Eliminar cliente
router.delete(
  "/:id",
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Eliminar cliente'
    #swagger.description = 'Elimina un cliente mediante su ID.'
  */
  deleteCliente,
);

export default router;
