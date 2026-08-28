import { pool } from "../config/database.js";

// TIPADO DE LA TABLA
export interface Cliente {
  id: number;
  nombre: string;
  apellidos: string;
  telefono: string | null;
  direccion: string | null;
  email: string | null;
}

// TYPES
export type CreateClienteInput = Omit<Cliente, "id">;
export type UpdateClienteInput = Partial<CreateClienteInput>;

// MODELO
export const ClienteModel = {
  // Obtener todos
  findAll: async (): Promise<Cliente[]> => {
    const { rows } = await pool.query(
      "SELECT * FROM clientes ORDER BY id ASC;",
    );

    return rows;
  },

  // Obtener clientes paginados
  findPaginated: async (limit: number, offset: number): Promise<Cliente[]> => {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM clientes
      ORDER BY id ASC
      LIMIT $1
      OFFSET $2;
      `,
      [limit, offset],
    );

    return rows;
  },

  // Contar clientes
  count: async (): Promise<number> => {
    const { rows } = await pool.query(
      `
      SELECT COUNT(*)::int AS total
      FROM clientes;
      `,
    );

    return rows[0].total;
  },

  // Obtener por ID
  findById: async (id: number): Promise<Cliente | null> => {
    const { rows } = await pool.query("SELECT * FROM clientes WHERE id = $1;", [
      id,
    ]);

    return rows[0] || null;
  },

  // Crear
  create: async (dato: CreateClienteInput): Promise<Cliente> => {
    const query = `
      INSERT INTO clientes
        (
          nombre,
          apellidos,
          telefono,
          direccion,
          email
        )
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [
      dato.nombre,
      dato.apellidos,
      dato.telefono,
      dato.direccion,
      dato.email,
    ]);

    return rows[0];
  },

  // Actualizar
  update: async (
    id: number,
    dato: UpdateClienteInput,
  ): Promise<Cliente | null> => {
    const campos = Object.keys(dato);

    if (campos.length === 0) {
      return null;
    }

    const valores = Object.values(dato);

    const set = campos
      .map((campo, index) => `${campo} = $${index + 1}`)
      .join(", ");

    const query = `
      UPDATE clientes
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
      "DELETE FROM clientes WHERE id = $1;",
      [id],
    );

    return (rowCount ?? 0) > 0;
  },
};
