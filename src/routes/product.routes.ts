import { Router } from "express";

import {
  getProductos,
  getProductoById,
  postProducto,
  putProducto,
  deleteProducto,
} from "../controllers/productos.js";

import {
  validarProducto,
  validarProductoId,
  validarProductoUpdate,
} from "../middlewares/productos.validacion.js";

const router = Router();

router.get(
  "/",
  /*
    #swagger.tags = ['Productos']
    #swagger.summary = 'Obtener todos los productos'
    #swagger.description = 'Obtiene todos los productos registrados en la base de datos.'
    #swagger.responses[200] = {
      description: 'Productos obtenidos correctamente.'
    }
    #swagger.responses[500] = {
      description: 'Error al consultar la base de datos.'
    }
  */
  getProductos,
);

router.get(
  "/:id",
  /*
    #swagger.tags = ['Productos']
    #swagger.summary = 'Obtener producto por ID'
    #swagger.description = 'Busca un producto específico mediante su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del producto',
      example: 1
    }
    #swagger.responses[200] = {
      description: 'Producto encontrado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'El ID debe ser numérico.'
    }
    #swagger.responses[404] = {
      description: 'Producto no encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Error al consultar la base de datos.'
    }
  */
  validarProductoId,
  getProductoById,
);

router.post(
  "/",
  /*
    #swagger.tags = ['Productos']
    #swagger.summary = 'Crear un producto'
    #swagger.description = 'Registra un nuevo producto en la base de datos.'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        nombre: 'Coca Cola',
        categoria: 'Bebidas',
        precio: 10.50,
        disponible: true
      }
    }
    #swagger.responses[201] = {
      description: 'Producto creado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'Datos inválidos.'
    }
    #swagger.responses[500] = {
      description: 'Error al crear el producto.'
    }
  */
  validarProducto,
  postProducto,
);

router.put(
  "/:id",
  /*
    #swagger.tags = ['Productos']
    #swagger.summary = 'Actualizar un producto'
    #swagger.description = 'Actualiza uno o varios datos de un producto existente.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del producto',
      example: 1
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        nombre: 'Coca Cola 2L',
        categoria: 'Bebidas',
        precio: 15.50,
        disponible: true
      }
    }
    #swagger.responses[200] = {
      description: 'Producto actualizado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'Datos inválidos.'
    }
    #swagger.responses[404] = {
      description: 'Producto no encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Error al actualizar el producto.'
    }
  */
  validarProductoId,
  validarProductoUpdate,
  putProducto,
);

router.delete(
  "/:id",
  /*
    #swagger.tags = ['Productos']
    #swagger.summary = 'Eliminar un producto'
    #swagger.description = 'Elimina un producto mediante su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del producto',
      example: 1
    }
    #swagger.responses[200] = {
      description: 'Producto eliminado correctamente.'
    }
    #swagger.responses[400] = {
      description: 'El ID debe ser numérico.'
    }
    #swagger.responses[404] = {
      description: 'Producto no encontrado.'
    }
    #swagger.responses[500] = {
      description: 'Error al eliminar el producto.'
    }
  */
  validarProductoId,
  deleteProducto,
);

export default router;
