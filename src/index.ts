import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import type { Request, Response } from "express";
import productosRouter from "./routes/product.routes.js";
import clientesRouter from "./routes/client.routes.js";
import repartidoresRouter from "./routes/repartidores.routes.js";
import pedidosRouter from "./routes/pedidos.routes.js";
import detallePedidosRouter from "./routes/detallePedidos.routes.js";
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
dotenv.config();
const swaggerDocument = JSON.parse(
  fs.readFileSync("./src/swagger_output.json", "utf-8"),
);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/productos", productosRouter);
app.use("/clientes", clientesRouter);
app.use("/repartidores", repartidoresRouter);
app.use("/pedidos", pedidosRouter);
app.use("/detalle-pedidos", detallePedidosRouter);
// PRUEBA DE CONEXIÓN
app.get(
  "/db-test",
  /*
    #swagger.tags = ['Servidor']
    #swagger.summary = 'Verificar conexión con la base de datos'
    #swagger.description = 'Comprueba que el servidor puede conectarse correctamente a PostgreSQL.'
    #swagger.responses[200] = {
      description: 'Conexión exitosa con PostgreSQL.'
    }
    #swagger.responses[500] = {
      description: 'Error al conectar con la base de datos.'
    }
  */ async function (req: Request, res: Response) {
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
  },
);

app.get(
  "/",
  /*
    #swagger.tags = ['Servidor']
    #swagger.summary = 'Verificar estado del servidor'
    #swagger.description = 'Comprueba que la API se encuentra funcionando correctamente.'
    #swagger.responses[200] = {
      description: 'Servidor funcionando correctamente.'
    }
  */ function (req: Request, res: Response) {
    res.json({
      message: "servidor corriendo exitosamente",
    });
  },
);

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
//pedidos http://localhost:3000/detalle-pedidos
