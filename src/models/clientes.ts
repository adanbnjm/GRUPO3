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

  // Obtener por ID
  findById: async (id: number): Promise<Cliente | null> => {
    const { rows } = await pool.query("SELECT * FROM clientes WHERE id = $1;", [
      id,
    ]);

    return rows[0] || null;
  },

  // Crear
  create: async (dato: CreateClienteInput): Promise<Cliente> => {
    const { nombre, apellidos, telefono, direccion, email } = dato;

    const query = `
      INSERT INTO clientes
        (nombre, apellidos, telefono, direccion, email)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [
      nombre,
      apellidos,
      telefono,
      direccion,
      email,
    ]);

    return rows[0];
  },

  // Actualizar
  update: async (
    id: number,
    dato: UpdateClienteInput,
  ): Promise<Cliente | null> => {
    const { rows } = await pool.query(
      `
        UPDATE clientes
        SET
          nombre = $1,
          apellidos = $2,
          telefono = $3,
          direccion = $4,
          email = $5
        WHERE id = $6
        RETURNING *;
      `,
      [
        dato.nombre,
        dato.apellidos,
        dato.telefono,
        dato.direccion,
        dato.email,
        id,
      ],
    );

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
