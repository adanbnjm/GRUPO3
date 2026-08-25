import { Router } from "express";

import {
  getPedidos,
  getPedidoById,
  postPedido,
  putPedido,
  deletePedido,
} from "../controllers/pedidos.js";

const router = Router();

router.get(
  "/",
  /*
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Obtener todos los pedidos'
    #swagger.description = 'Obtiene todos los pedidos registrados.'
    #swagger.responses[200] = {
      description: 'Pedidos obtenidos correctamente.'
    }
    #swagger.responses[500] = {
      description: 'Error al consultar la base de datos.'
    }
  */
  getPedidos,
);

router.get(
  "/:id",
  /*
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Obtener un pedido por ID'
    #swagger.description = 'Obtiene un pedido específico mediante su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del pedido'
    }
    #swagger.responses[200] = {
      description: 'Pedido encontrado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'El ID debe ser numérico.'
    }
    #swagger.responses[404] = {
      description: 'Pedido no encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Error al consultar la base de datos.'
    }
  */
  getPedidoById,
);

router.post(
  "/",
  /*
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Crear un pedido'
    #swagger.description = 'Crea un nuevo pedido.'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        total: 1500.50,
        estado: 'pendiente',
        cliente_id: 1
      }
    }
    #swagger.responses[201] = {
      description: 'Pedido creado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'Faltan datos obligatorios.'
    }
    #swagger.responses[500] = {
      description: 'Error al crear el pedido.'
    }
  */
  postPedido,
);

router.put(
  "/:id",
  /*
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Actualizar un pedido'
    #swagger.description = 'Actualiza un pedido existente.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del pedido'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        total: 1500.50,
        estado: 'pendiente',
        cliente_id: 1
      }
    }
    #swagger.responses[200] = {
      description: 'Pedido actualizado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'El ID debe ser numérico.'
    }
    #swagger.responses[404] = {
      description: 'Pedido no encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Error al actualizar el pedido.'
    }
  */
  putPedido,
);

router.delete(
  "/:id",
  /*
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Eliminar un pedido'
    #swagger.description = 'Elimina un pedido mediante su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del pedido'
    }
    #swagger.responses[200] = {
      description: 'Pedido eliminado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'El ID debe ser numérico.'
    }
    #swagger.responses[404] = {
      description: 'Pedido no encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Error al eliminar el pedido.'
    }
  */
  deletePedido,
);

export default router;
