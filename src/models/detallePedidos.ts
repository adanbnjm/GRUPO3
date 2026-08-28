import { pool } from "../config/database.js";

export interface DetallePedido {
  id: number;
  cantidad: number;
  precio_unitario: number;
  pedido_id: number;
  producto_id: number;
  repartidores_id: number;
}

export type CreateDetallePedidoInput = Omit<DetallePedido, "id">;

export type UpdateDetallePedidoInput = Partial<CreateDetallePedidoInput>;

export const DetallePedidoModel = {
  // Obtener todos
  findAll: async (): Promise<DetallePedido[]> => {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM detalle_pedidos
      ORDER BY id ASC;
      `,
    );

    return rows;
  },

  // Obtener detalles paginados
  findPaginated: async (
    limit: number,
    offset: number,
  ): Promise<DetallePedido[]> => {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM detalle_pedidos
      ORDER BY id ASC
      LIMIT $1
      OFFSET $2;
      `,
      [limit, offset],
    );

    return rows;
  },

  // Contar detalles
  count: async (): Promise<number> => {
    const { rows } = await pool.query(
      `
      SELECT COUNT(*)::int AS total
      FROM detalle_pedidos;
      `,
    );

    return rows[0].total;
  },

  // Buscar por ID
  findById: async (id: number): Promise<DetallePedido | null> => {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM detalle_pedidos
      WHERE id = $1;
      `,
      [id],
    );

    return rows[0] || null;
  },

  // Crear
  create: async (dato: CreateDetallePedidoInput): Promise<DetallePedido> => {
    const { rows } = await pool.query(
      `
      INSERT INTO detalle_pedidos
      (
        cantidad,
        precio_unitario,
        pedido_id,
        producto_id,
        repartidores_id
      )
      VALUES
      ($1, $2, $3, $4, $5)
      RETURNING *;
      `,
      [
        dato.cantidad,
        dato.precio_unitario,
        dato.pedido_id,
        dato.producto_id,
        dato.repartidores_id,
      ],
    );

    return rows[0];
  },

  // Actualizar
  update: async (
    id: number,
    dato: UpdateDetallePedidoInput,
  ): Promise<DetallePedido | null> => {
    const campos = Object.keys(dato);

    if (campos.length === 0) {
      return null;
    }

    const valores = Object.values(dato);

    const set = campos
      .map((campo, index) => `${campo} = $${index + 1}`)
      .join(", ");

    const { rows } = await pool.query(
      `
      UPDATE detalle_pedidos
      SET ${set}
      WHERE id = $${valores.length + 1}
      RETURNING *;
      `,
      [...valores, id],
    );

    return rows[0] || null;
  },

  // Eliminar
  delete: async (id: number): Promise<boolean> => {
    const { rowCount } = await pool.query(
      `
      DELETE FROM detalle_pedidos
      WHERE id = $1;
      `,
      [id],
    );

    return (rowCount ?? 0) > 0;
  },
};
