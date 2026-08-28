import { z } from "zod";

// Schema para crear un pedido
export const createPedidoSchema = z.object({
  total: z.coerce.number().min(0, "El total no puede ser negativo"),

  estado: z
    .string()
    .min(1, "El estado es obligatorio")
    .max(50, "El estado no puede superar los 50 caracteres"),

  cliente_id: z.coerce
    .number()
    .int("El cliente_id debe ser un número entero")
    .positive("El cliente_id debe ser mayor a 0"),
});

// Schema para actualizar un pedido
export const updatePedidoSchema = createPedidoSchema.partial();

// Schema para validar ID
export const pedidoIdSchema = z.object({
  id: z.coerce
    .number()
    .int("El ID debe ser un número entero")
    .positive("El ID debe ser mayor a 0"),
});

// Compatibilidad con el nombre anterior
export const pedidoSchema = createPedidoSchema;
