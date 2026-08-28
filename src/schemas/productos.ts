import { z } from "zod";

export const createProductoSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  categoria: z
    .string()
    .min(1, "La categoría es obligatoria")
    .max(100, "La categoría no puede superar los 100 caracteres"),

  precio: z.coerce.number().positive("El precio debe ser mayor a 0"),

  disponible: z.boolean({
    message: "Disponible debe ser verdadero o falso",
  }),
});

export const updateProductoSchema = createProductoSchema.partial();

export const productoIdSchema = z.object({
  id: z.coerce
    .number()
    .int("El ID debe ser un número entero")
    .positive("El ID debe ser mayor a 0"),
});
