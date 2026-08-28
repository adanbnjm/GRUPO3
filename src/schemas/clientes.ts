import { z } from "zod";

export const createClienteSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  apellidos: z
    .string()
    .min(1, "Los apellidos son obligatorios")
    .max(100, "Los apellidos no pueden superar los 100 caracteres"),

  telefono: z
    .string()
    .max(20, "El teléfono no puede superar los 20 caracteres")
    .optional()
    .nullable(),

  direccion: z.string().optional().nullable(),

  email: z
    .string()
    .email("El email no es válido")
    .max(150, "El email no puede superar los 150 caracteres")
    .optional()
    .nullable(),
});

export const updateClienteSchema = createClienteSchema.partial();

export const clienteIdSchema = z.object({
  id: z.coerce
    .number()
    .int("El ID debe ser un número entero")
    .positive("El ID debe ser mayor a 0"),
});
