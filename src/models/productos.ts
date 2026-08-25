import { pool } from "../config/database.js";

// TIPADO DE LA TABLA
export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  disponible: boolean;
}

// TYPES PARA CREAR Y ACTUALIZAR
export type CreateProductoInput = Omit<Producto, "id">;
export type UpdateProductoInput = Partial<CreateProductoInput>;

// FUNCIONES QUE CONSULTAN A LA BASE DE DATOS
export const ProductoModel = {
  // Obtener todos los productos
  findAll: async (): Promise<Producto[]> => {
    const { rows } = await pool.query(
      "SELECT * FROM productos ORDER BY id ASC;",
    );

    return rows;
  },

  // Obtener un producto por ID
  findById: async (id: number): Promise<Producto | null> => {
    const { rows } = await pool.query(
      "SELECT * FROM productos WHERE id = $1;",
      [id],
    );

    return rows[0] || null;
  },

  // Crear un producto
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

  // Actualizar un producto
  update: async (
    id: number,
    dato: UpdateProductoInput,
  ): Promise<Producto | null> => {
    const { rows } = await pool.query(
      `
        UPDATE productos
        SET
          nombre = $1,
          categoria = $2,
          precio = $3,
          disponible = $4
        WHERE id = $5
        RETURNING *;
      `,
      [dato.nombre, dato.categoria, dato.precio, dato.disponible, id],
    );

    return rows[0] || null;
  },

  // Eliminar un producto
  delete: async (id: number): Promise<boolean> => {
    const { rowCount } = await pool.query(
      "DELETE FROM productos WHERE id = $1;",
      [id],
    );

    return (rowCount ?? 0) > 0;
  },
};
