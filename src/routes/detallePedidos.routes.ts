import { Router } from "express";

import {
  getDetallePedidos,
  getDetallePedidoById,
  postDetallePedido,
  putDetallePedido,
  deleteDetallePedido,
} from "../controllers/detallePedidos.js";

const router = Router();

router.get(
  "/",
  /*
    #swagger.tags = ['Detalle de Pedidos']
    #swagger.summary = 'Obtener todos los detalles'
    #swagger.description = 'Obtiene todos los detalles de pedidos registrados.'
    #swagger.responses[200] = {
      description: 'Detalles obtenidos correctamente.'
    }
    #swagger.responses[500] = {
      description: 'Error al consultar la base de datos.'
    }
  */
  getDetallePedidos,
);

router.get(
  "/:id",
  /*
    #swagger.tags = ['Detalle de Pedidos']
    #swagger.summary = 'Obtener detalle por ID'
    #swagger.description = 'Obtiene un detalle específico mediante su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del detalle'
    }
    #swagger.responses[200] = {
      description: 'Detalle encontrado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'El ID debe ser numérico.'
    }
    #swagger.responses[404] = {
      description: 'Detalle no encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Error al consultar la base de datos.'
    }
  */
  getDetallePedidoById,
);

router.post(
  "/",
  /*
    #swagger.tags = ['Detalle de Pedidos']
    #swagger.summary = 'Crear detalle de pedido'
    #swagger.description = 'Registra un nuevo detalle asociado a un pedido, producto y repartidor.'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        cantidad: 2,
        precio_unitario: 100,
        pedido_id: 1,
        producto_id: 1,
        repartidores_id: 1
      }
    }
    #swagger.responses[201] = {
      description: 'Detalle creado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'Faltan datos obligatorios.'
    }
    #swagger.responses[500] = {
      description: 'Error al crear el detalle.'
    }
  */
  postDetallePedido,
);

router.put(
  "/:id",
  /*
    #swagger.tags = ['Detalle de Pedidos']
    #swagger.summary = 'Actualizar detalle de pedido'
    #swagger.description = 'Actualiza un detalle de pedido existente.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del detalle'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        cantidad: 3,
        precio_unitario: 120,
        pedido_id: 1,
        producto_id: 2,
        repartidores_id: 1
      }
    }
    #swagger.responses[200] = {
      description: 'Detalle actualizado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'El ID debe ser numérico.'
    }
    #swagger.responses[404] = {
      description: 'Detalle no encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Error al actualizar el detalle.'
    }
  */
  putDetallePedido,
);

router.delete(
  "/:id",
  /*
    #swagger.tags = ['Detalle de Pedidos']
    #swagger.summary = 'Eliminar detalle de pedido'
    #swagger.description = 'Elimina un detalle de pedido mediante su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del detalle'
    }
    #swagger.responses[200] = {
      description: 'Detalle eliminado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'El ID debe ser numérico.'
    }
    #swagger.responses[404] = {
      description: 'Detalle no encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Error al eliminar el detalle.'
    }
  */
  deleteDetallePedido,
);

export default router;
