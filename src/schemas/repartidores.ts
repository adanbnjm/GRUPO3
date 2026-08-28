import { z } from "zod";

export const createRepartidorSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  vehiculo: z
    .string()
    .min(1, "El vehículo es obligatorio")
    .max(50, "El vehículo no puede superar los 50 caracteres"),

  telefono: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .max(20, "El teléfono no puede superar los 20 caracteres"),

  activo: z.boolean().default(true),
});

export const updateRepartidorSchema = createRepartidorSchema.partial();

export const repartidorIdSchema = z.object({
  id: z.coerce
    .number()
    .int("El ID debe ser un número entero")
    .positive("El ID debe ser mayor a 0"),
});
