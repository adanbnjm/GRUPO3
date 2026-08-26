import { z } from "zod";

export const repartidorIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createRepartidorSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  vehiculo: z
    .string()
    .trim()
    .min(2, "El vehículo debe tener al menos 2 caracteres")
    .max(50, "El vehículo no puede superar los 50 caracteres"),

  telefono: z
    .string()
    .trim()
    .min(8, "El teléfono debe tener al menos 8 caracteres")
    .max(20, "El teléfono no puede superar los 20 caracteres"),

  activo: z.boolean().default(true),
});

export const updateRepartidorSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  vehiculo: z
    .string()
    .trim()
    .min(2, "El vehículo debe tener al menos 2 caracteres")
    .max(50, "El vehículo no puede superar los 50 caracteres"),

  telefono: z
    .string()
    .trim()
    .min(8, "El teléfono debe tener al menos 8 caracteres")
    .max(20, "El teléfono no puede superar los 20 caracteres"),

  activo: z.boolean(),
});