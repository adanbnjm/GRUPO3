import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import type { Request, Response } from "express";
import { totalmem } from "node:os";
import { error } from "node:console";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

// PROBANDO CONEXCION A LA BASE DE DATOS
//http://localhost:3000/db-test para probar
app.get("/db-test", async function (req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM productos;");
    res.json({
      message: "Conexion exitosa a la base de datos :D",
      total: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error("error al consultar PostgreSQL: ");
    res.status(500).json({
      message: "error al intentar conectar a la base de datos :c",
    });
  }
});

app.get("/", function (req: Request, res: Response) {
  res.json({
    message: "servidor corriendo exitosamente",
  });
});
// REPARTIDORES
app.get("/repartidores", async function (req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM repartidores;");
    res.json({
      message: "Conexion exitosa a la base de datos :D",
      total: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error("error al consultar PostgreSQL: ");
    res.status(500).json({
      message: "error al intentar conectar a la base de datos :c",
    });
  }
});
// PRODUCTOS
app.get("/productos", async function (req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM productos;");
    res.json({
      message: "Conexion exitosa a la base de datos :D",
      total: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error("error al consultar PostgreSQL: ");
    res.status(500).json({
      message: "error al intentar conectar a la base de datos :c",
    });
  }
});
// PEDIDOS
app.get("/pedidos", async function (req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM pedidos;");
    res.json({
      message: "Conexion exitosa a la base de datos :D",
      total: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error("error al consultar PostgreSQL: ");
    res.status(500).json({
      message: "error al intentar conectar a la base de datos :c",
    });
  }
});

app.get( "/pedidos/:id", async function (req:Request, res: Response) 
{ 
// #swagger.description = 'Obtiene la información de un pedido por su ID' 
const idBuscado = Number(req.params.id); 
if (isNaN(idBuscado)) { 
  return res.status(400).json({ error: "El parámetro id debe ser un número válido", });
} try { 
const result = await pool.query( "SELECT id, cliente_id, fecha, estado FROM pedidos WHERE id = $1", [idBuscado], );
if (result.rowCount === 0){
return res.status(404).json({ error: "No existe un pedido con ese ID", });
} 
return res.json(result.rows[0]); } 
catch (error) { console.error(error); return res.status(500).json({ error: "Error al obtener el pedido", }); } }, );

app.post('/pedidos', async (req, res) => {
  try {
    const { cliente_id, total, estado } = req.body;
    const nuevoPedido = await pool.query(
      'INSERT INTO pedidos (cliente_id, total, estado) VALUES ($1, $2, $3) RETURNING *',
      [cliente_id, total, estado]
    );
    res.status(201).json(nuevoPedido.rows[0]);
  } catch (err: any) {
    console.error("Error en PostgreSQL (Pedidos):", err);
    res.status(500).json({ error: err.message || err });
  }
});
// CLIENTES
app.get("/clientes", async function (req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM clientes;");
    res.json({
      message: "Conexion exitosa a la base de datos :D",
      total: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error("error al consultar PostgreSQL: ");
    res.status(500).json({
      message: "error al intentar conectar a la base de datos :c",
    });
  }
});
app.post('/clientes', async (req, res) => {
  const { nombre, apellidos, email, telefono, direccion } = req.body;
  try {
    const nuevoCliente = await pool.query(
      'INSERT INTO clientes (nombre, apellidos, email, telefono, direccion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, apellidos, email, telefono, direccion]
    );
    res.status(201).json(nuevoCliente.rows[0]);
  } catch (err) {
    console.error("Error en PostgreSQL:", err);
    res.status(500).json({ error });
  }
});

app.listen(PORT, async function () {
  console.log("servidor corriendo en http://localhost" + PORT);
  try {
    const res = await pool.query("SELECT NOW()");
    console.log(
      `CONECTADO A POSTGRESQL CON EXITO HORA DEL SERVIDOR ${res.rows[0].now}`,
    );
  } catch (error) {
    console.log("ERROR EN LA CONEXION");
  }
});
