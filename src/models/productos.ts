import { pool } from "../config/database.js";

// TIPADO DE LA TABLA
export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  disponible: boolean;
}

// TYPES
export type CreateProductoInput = Omit<Producto, "id">;
export type UpdateProductoInput = Partial<CreateProductoInput>;

// MODELO
export const ProductoModel = {
  // Obtener todos
  findAll: async (): Promise<Producto[]> => {
    const { rows } = await pool.query(
      "SELECT * FROM productos ORDER BY id ASC;",
    );

    return rows;
  },

  // Obtener productos paginados
  findPaginated: async (
    limit: number,
    offset: number,
    categoria?: string,
  ): Promise<Producto[]> => {
    let query = `
      SELECT *
      FROM productos
    `;

    const valores: unknown[] = [];

    if (categoria) {
      query += `
        WHERE LOWER(categoria) = LOWER($1)
      `;
      valores.push(categoria);
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

  // Contar productos
  count: async (categoria?: string): Promise<number> => {
    let query = `
      SELECT COUNT(*)::int AS total
      FROM productos
    `;

    const valores: unknown[] = [];

    if (categoria) {
      query += `
        WHERE LOWER(categoria) = LOWER($1)
      `;

      valores.push(categoria);
    }

    const { rows } = await pool.query(query, valores);

    return rows[0].total;
  },

  // Obtener por ID
  findById: async (id: number): Promise<Producto | null> => {
    const { rows } = await pool.query(
      "SELECT * FROM productos WHERE id = $1;",
      [id],
    );

    return rows[0] || null;
  },

  // Crear
  create: async (dato: CreateProductoInput): Promise<Producto> => {
    const { nombre, categoria, precio, disponible } = dato;

    const query = `
      INSERT INTO productos
        (nombre, categoria, precio, disponible)
      VALUES
        ($1, $2, $3, $4)
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [
      nombre,
      categoria,
      precio,
      disponible,
    ]);

    return rows[0];
  },

  // Actualizar
  update: async (
    id: number,
    dato: UpdateProductoInput,
  ): Promise<Producto | null> => {
    const campos = Object.keys(dato);

    if (campos.length === 0) {
      return null;
    }

    const valores = Object.values(dato);

    const set = campos
      .map((campo, index) => `${campo} = $${index + 1}`)
      .join(", ");

    const query = `
      UPDATE productos
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
      "DELETE FROM productos WHERE id = $1;",
      [id],
    );

    return (rowCount ?? 0) > 0;
  },
};
