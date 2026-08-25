import { pool } from "../config/database.js";

// TIPADO DE LA TABLA
export interface Pedido {
  id: number;
  total: number;
  estado: string;
  cliente_id: number;
}

// TYPES
export type CreatePedidoInput = Omit<Pedido, "id">;
export type UpdatePedidoInput = Partial<CreatePedidoInput>;

// MODELO
export const PedidoModel = {
  // Obtener todos
  findAll: async (): Promise<Pedido[]> => {
    const { rows } = await pool.query("SELECT * FROM pedidos ORDER BY id ASC;");

    return rows;
  },

  // Obtener por ID
  findById: async (id: number): Promise<Pedido | null> => {
    const { rows } = await pool.query("SELECT * FROM pedidos WHERE id = $1;", [
      id,
    ]);

    return rows[0] || null;
  },

  // Crear
  create: async (dato: CreatePedidoInput): Promise<Pedido> => {
    const { total, estado, cliente_id } = dato;

    const query = `
      INSERT INTO pedidos
        (total, estado, cliente_id)
      VALUES
        ($1, $2, $3)
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [total, estado, cliente_id]);

    return rows[0];
  },

  // Actualizar
  update: async (
    id: number,
    dato: UpdatePedidoInput,
  ): Promise<Pedido | null> => {
    const { rows } = await pool.query(
      `
        UPDATE pedidos
        SET
          total = $1,
          estado = $2,
          cliente_id = $3
        WHERE id = $4
        RETURNING *;
      `,
      [dato.total, dato.estado, dato.cliente_id, id],
    );

    return rows[0] || null;
  },

  // Eliminar
  delete: async (id: number): Promise<boolean> => {
    const { rowCount } = await pool.query(
      "DELETE FROM pedidos WHERE id = $1;",
      [id],
    );

    return (rowCount ?? 0) > 0;
  },
};
