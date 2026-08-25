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
    #swagger.summary = 'Crear un nuevo cliente'
    #swagger.description = 'Registra un nuevo cliente en la base de datos.'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Datos del nuevo cliente',
      schema: {
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '70012345',
        direccion: 'Av. Principal #123',
        email: 'juan@gmail.com'
      }
    }
    #swagger.responses[201] = {
      description: 'Cliente creado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'Nombre y apellidos son obligatorios.'
    }
    #swagger.responses[500] = {
      description: 'Error al crear el cliente.'
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
