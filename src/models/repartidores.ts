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

  // Obtener por disponibilidad
  findByActivo: async (activo: boolean): Promise<Repartidor[]> => {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM repartidores
      WHERE activo = $1
      ORDER BY id ASC;
      `,
      [activo],
    );

    return rows;
  },

  // Obtener paginados
  findPaginated: async (
    limit: number,
    offset: number,
    activo?: boolean,
  ): Promise<Repartidor[]> => {
    let query = `
      SELECT *
      FROM repartidores
    `;

    const valores: unknown[] = [];

    if (activo !== undefined) {
      query += `
        WHERE activo = $1
      `;

      valores.push(activo);
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

  // Contar repartidores
  count: async (activo?: boolean): Promise<number> => {
    let query = `
      SELECT COUNT(*)::int AS total
      FROM repartidores
    `;

    const valores: unknown[] = [];

    if (activo !== undefined) {
      query += `
        WHERE activo = $1
      `;

      valores.push(activo);
    }

    const { rows } = await pool.query(query, valores);

    return rows[0].total;
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
    const campos = Object.keys(dato);

    if (campos.length === 0) {
      return null;
    }

    const valores = Object.values(dato);

    const set = campos
      .map((campo, index) => `${campo} = $${index + 1}`)
      .join(", ");

    const query = `
      UPDATE repartidores
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
      "DELETE FROM repartidores WHERE id = $1;",
      [id],
    );

    return (rowCount ?? 0) > 0;
  },
};
