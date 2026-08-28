import { Router } from "express";

import {
  getPedidos,
  getPedidoById,
  postPedido,
  putPedido,
  deletePedido,
} from "../controllers/pedidos.js";

import {
  validarPedido,
  validarPedidoId,
  validarPedidoUpdate,
} from "../middlewares/pedidos.validacion.js";

const router = Router();

router.get(
  "/",
  /*
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Obtener todos los pedidos'
    #swagger.description = 'Obtiene todos los pedidos registrados.'
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
      description: 'ID del pedido',
      example: 1
    }
  */
  validarPedidoId,
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
  */
  validarPedido,
  postPedido,
);

router.put(
  "/:id",
  /*
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Actualizar un pedido'
    #swagger.description = 'Actualiza uno o varios datos de un pedido existente.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del pedido',
      example: 1
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        estado: 'entregado'
      }
    }
  */
  validarPedidoId,
  validarPedidoUpdate,
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
      description: 'ID del pedido',
      example: 1
    }
  */
  validarPedidoId,
  deletePedido,
);

export default router;
