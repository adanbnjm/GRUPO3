import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
pool
  .connect()
  .then((client) => {
    console.log("✅ CONECTADO A POSTGRESQL");
    client.release();
  })
  .catch((error) => {
    console.error("❌ ERROR EN POSTGRESQL:", error.message);
  });
