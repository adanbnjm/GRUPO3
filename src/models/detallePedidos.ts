import { pool } from "../config/database.js";

// TIPADO DE LA TABLA
export interface DetallePedido {
  id: number;
  cantidad: number;
  precio_unitario: number;
  pedido_id: number;
  producto_id: number;
  repartidores_id: number;
}

// TYPES
export type CreateDetallePedidoInput = Omit<DetallePedido, "id">;
export type UpdateDetallePedidoInput = Partial<CreateDetallePedidoInput>;

// MODELO
export const DetallePedidoModel = {
  // Obtener todos
  findAll: async (): Promise<DetallePedido[]> => {
    const { rows } = await pool.query(
      "SELECT * FROM detalle_pedidos ORDER BY id ASC;",
    );

    return rows;
  },

  // Obtener por ID
  findById: async (id: number): Promise<DetallePedido | null> => {
    const { rows } = await pool.query(
      "SELECT * FROM detalle_pedidos WHERE id = $1;",
      [id],
    );

    return rows[0] || null;
  },

  // Crear
  create: async (dato: CreateDetallePedidoInput): Promise<DetallePedido> => {
    const {
      cantidad,
      precio_unitario,
      pedido_id,
      producto_id,
      repartidores_id,
    } = dato;

    const query = `
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
    `;

    const { rows } = await pool.query(query, [
      cantidad,
      precio_unitario,
      pedido_id,
      producto_id,
      repartidores_id,
    ]);

    return rows[0];
  },

  // Actualizar
  update: async (
    id: number,
    dato: UpdateDetallePedidoInput,
  ): Promise<DetallePedido | null> => {
    const { rows } = await pool.query(
      `
        UPDATE detalle_pedidos
        SET
          cantidad = $1,
          precio_unitario = $2,
          pedido_id = $3,
          producto_id = $4,
          repartidores_id = $5
        WHERE id = $6
        RETURNING *;
      `,
      [
        dato.cantidad,
        dato.precio_unitario,
        dato.pedido_id,
        dato.producto_id,
        dato.repartidores_id,
        id,
      ],
    );

    return rows[0] || null;
  },

  // Eliminar
  delete: async (id: number): Promise<boolean> => {
    const { rowCount } = await pool.query(
      "DELETE FROM detalle_pedidos WHERE id = $1;",
      [id],
    );

    return (rowCount ?? 0) > 0;
  },
};
