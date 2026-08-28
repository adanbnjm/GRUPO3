import { z } from "zod";

export const createDetallePedidoSchema = z.object({
  cantidad: z.coerce.number().int().positive("La cantidad debe ser mayor a 0"),
  precio_unitario: z.coerce
    .number()
    .positive("El precio_unitario debe ser mayor a 0"),
  pedido_id: z.coerce.number().int().positive("El pedido_id debe ser válido"),
  producto_id: z.coerce
    .number()
    .int()
    .positive("El producto_id debe ser válido"),
  repartidores_id: z.coerce
    .number()
    .int()
    .positive("El repartidores_id debe ser válido"),
});

export const updateDetallePedidoSchema = z.object({
  cantidad: z.coerce.number().int().positive("La cantidad debe ser mayor a 0"),
  precio_unitario: z.coerce
    .number()
    .positive("El precio_unitario debe ser mayor a 0"),
  pedido_id: z.coerce.number().int().positive("El pedido_id debe ser válido"),
  producto_id: z.coerce
    .number()
    .int()
    .positive("El producto_id debe ser válido"),
  repartidores_id: z.coerce
    .number()
    .int()
    .positive("El repartidores_id debe ser válido"),
});

export const detallePedidoIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
