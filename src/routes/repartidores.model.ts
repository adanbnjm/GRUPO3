import { pool } from "../config/database.js";

// TIPADO DE LA TABLA
export interface Repartidores {
  id: number;
  nombre: string;
  vehiculo: string;
  telefono: string | null;
  activo: boolean;
}

// A partir del tipado crear otros types
export type CreateRepartidorInput = Omit<Repartidores, "id">;
export type UpdateRepartidorInput = Partial<CreateRepartidorInput>;

// FUNCIONES QUE CONSULTAN A LA BASE DE DATOS
export const RepartidorModel = {
  // Obtener todos los repartidores
  findAll: async (): Promise<Repartidores[]> => {
    const { rows } = await pool.query(
      "SELECT * FROM repartidores ORDER BY id ASC;"
    );
    return rows;
  },

  // Obtener un repartidor por ID
  findById: async (id: number): Promise<Repartidores | null> => {
    const { rows } = await pool.query(
      "SELECT * FROM repartidores WHERE id = $1;", 
      [id]
    );
    return rows[0] || null;
  },

  // Crear un repartidor
  create: async (dato: CreateRepartidorInput): Promise<Repartidores> => {
    const { nombre, vehiculo, telefono, activo } = dato;

    const query = `
      INSERT INTO repartidores
        (nombre, vehiculo, telefono, activo)
      VALUES
        ($1, $2, $3, COALESCE($4, TRUE))
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

  // Actualizar un repartidor
  update: async (
    id: number,
    dato: UpdateRepartidorInput
  ): Promise<Repartidores | null> => {
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
      [
        dato.nombre,
        dato.vehiculo,
        dato.telefono,
        dato.activo,
        id
      ]
    );
    return rows[0] || null;
  },

  // Eliminar un repartidor
  delete: async (id: number): Promise<boolean> => {
    const { rowCount } = await pool.query(
      "DELETE FROM repartidores WHERE id = $1;",
      [id]
    );
    return (rowCount ?? 0) > 0;
  },
};