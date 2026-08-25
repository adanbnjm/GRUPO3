import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import type { Request, Response } from "express";
import {
  getProductos,
  getProductosdeId,
  postProducto,
  putProducto,
  deleteProducto,
} from "./controllers/productos.js";
import {
  getClientes,
  getClienteById,
  postCliente,
  putCliente,
  deleteCliente,
} from "./controllers/clientes.js";
//repartidores
import {
  getRepartidores,
  getRepartidorById,
  postRepartidor,
  putRepartidor,
  deleteRepartidor,
} from "./controllers/repartidores.js";
dotenv.config();
//pedidos
import {
  getPedidos,
  getPedidoById,
  postPedido,
  putPedido,
  deletePedido,
} from "./controllers/pedidos.js";
//detallePedidos
import {
  getDetallePedidos,
  getDetallePedidoById,
  postDetallePedido,
  putDetallePedido,
  deleteDetallePedido,
} from "./controllers/detallePedidos.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// PRUEBA DE CONEXIÓN
app.get("/db-test", async function (req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM productos;");

    res.json({
      message: "Conexion exitosa a la base de datos :D",
      total: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error("error al consultar PostgreSQL:");

    res.status(500).json({
      message: "error al intentar conectar a la base de datos :c",
    });
  }
});
//CLIENTES
app.get("/clientes", getClientes);
app.get("/clientes/:id", getClienteById);
app.post("/clientes", postCliente);
app.put("/clientes/:id", putCliente);
app.delete("/clientes/:id", deleteCliente);
// PRODUCTOS
app.get("/productos", getProductos);
app.get("/productos/:id", getProductosdeId);
app.post("/productos", postProducto);
app.put("/productos/:id", putProducto);
app.delete("/productos/:id", deleteProducto);
//repartidores
app.use("/api", repartidoresRoutes);
//pedidos
app.get("/pedidos", getPedidos);
app.get("/pedidos/:id", getPedidoById);
app.post("/pedidos", postPedido);
app.put("/pedidos/:id", putPedido);
app.delete("/pedidos/:id", deletePedido);
//detallePedidos
app.get("/detalle-pedidos", getDetallePedidos);
app.get("/detalle-pedidos/:id", getDetallePedidoById);
app.post("/detalle-pedidos", postDetallePedido);
app.put("/detalle-pedidos/:id", putDetallePedido);
app.delete("/detalle-pedidos/:id", deleteDetallePedido);

app.get("/", function (req: Request, res: Response) {
  res.json({
    message: "servidor corriendo exitosamente",
  });
});

app.listen(PORT, async function () {
  console.log(`servidor corriendo en http://localhost:${PORT}`);

  try {
    const res = await pool.query("SELECT NOW()");

    console.log(
      `CONECTADO A POSTGRESQL CON EXITO HORA DEL SERVIDOR ${res.rows[0].now}`,
    );
  } catch (error) {
    console.log("ERROR EN LA CONEXION");
  }
});
