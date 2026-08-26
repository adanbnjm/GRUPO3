import { z } from "zod";

export const pedidoSchema = z.object({
  total: z.number().positive(),

  estado: z.string().trim().min(1).max(50),

  cliente_id: z.number().int().positive(),
});

export const pedidoUpdateSchema = pedidoSchema.partial();
