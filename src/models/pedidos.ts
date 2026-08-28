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

  // Obtener por estado
  findByEstado: async (estado: string): Promise<Pedido[]> => {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM pedidos
      WHERE LOWER(estado) = LOWER($1)
      ORDER BY id ASC;
      `,
      [estado],
    );

    return rows;
  },

  // Obtener pedidos paginados
  findPaginated: async (
    limit: number,
    offset: number,
    estado?: string,
  ): Promise<Pedido[]> => {
    let query = `
      SELECT *
      FROM pedidos
    `;

    const valores: unknown[] = [];

    if (estado) {
      query += `
        WHERE LOWER(estado) = LOWER($1)
      `;

      valores.push(estado);
    }

    query += `
      ORDER BY id ASC
      LIMIT $${valores.length + 1}
      OFFSET $${valores.length + 2};
    `;

    valores.push(limit, offset);

    const { rows } = await pool.query(query, valores);

    return rows;
  },

  // Contar pedidos
  count: async (estado?: string): Promise<number> => {
    let query = `
      SELECT COUNT(*)::int AS total
      FROM pedidos
    `;

    const valores: unknown[] = [];

    if (estado) {
      query += `
        WHERE LOWER(estado) = LOWER($1)
      `;

      valores.push(estado);
    }

    const { rows } = await pool.query(query, valores);

    return rows[0].total;
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
    const campos = Object.keys(dato);

    if (campos.length === 0) {
      return null;
    }

    const valores = Object.values(dato);

    const set = campos
      .map((campo, index) => `${campo} = $${index + 1}`)
      .join(", ");

    const query = `
      UPDATE pedidos
      SET ${set}
      WHERE id = $${valores.length + 1}
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [...valores, id]);

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
