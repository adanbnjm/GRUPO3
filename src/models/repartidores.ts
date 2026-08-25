import { pool } from "../config/database.js";

// TIPADO DE LA TABLA
export interface Repartidor {
  id: number;
  nombre: string;
  vehiculo: string;
  telefono: string;
  activo: boolean;
}

// TYPES
export type CreateRepartidorInput = Omit<Repartidor, "id">;
export type UpdateRepartidorInput = Partial<CreateRepartidorInput>;

// MODELO
export const RepartidorModel = {
  // Obtener todos
  findAll: async (): Promise<Repartidor[]> => {
    const { rows } = await pool.query(
      "SELECT * FROM repartidores ORDER BY id ASC;",
    );

    return rows;
  },

  // Obtener por ID
  findById: async (id: number): Promise<Repartidor | null> => {
    const { rows } = await pool.query(
      "SELECT * FROM repartidores WHERE id = $1;",
      [id],
    );

    return rows[0] || null;
  },

  // Crear
  create: async (dato: CreateRepartidorInput): Promise<Repartidor> => {
    const { nombre, vehiculo, telefono, activo } = dato;

    const query = `
      INSERT INTO repartidores
        (nombre, vehiculo, telefono, activo)
      VALUES
        ($1, $2, $3, $4)
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [
      nombre,
      vehiculo,
      telefono,
      activo,
    ]);

    return rows[0];
  },

  // Actualizar
  update: async (
    id: number,
    dato: UpdateRepartidorInput,
  ): Promise<Repartidor | null> => {
    const { rows } = await pool.query(
      `
        UPDATE repartidores
        SET
          nombre = $1,
          vehiculo = $2,
          telefono = $3,
          activo = $4
        WHERE id = $5
        RETURNING *;
      `,
      [dato.nombre, dato.vehiculo, dato.telefono, dato.activo, id],
    );

    return rows[0] || null;
  },

  // Eliminar
  delete: async (id: number): Promise<boolean> => {
    const { rowCount } = await pool.query(
      "DELETE FROM repartidores WHERE id = $1;",
      [id],
    );

    return (rowCount ?? 0) > 0;
  },
};
