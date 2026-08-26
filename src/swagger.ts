import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Sistema de Pedidos Restaurante",
    description:
      "API REST para gestionar productos, clientes, repartidores y pedidos",
    version: "1.0.0",
  },

  host: "localhost:3000",

  schemes: ["http"],

  tags: [
    {
      name: "Servidor",
      description: "Estado del servidor y conexión con la base de datos.",
    },
    {
      name: "Clientes",
      description: "Operaciones relacionadas con los clientes.",
    },
    {
      name: "Productos",
      description: "Operaciones relacionadas con los productos.",
    },
    {
      name: "Repartidores",
      description: "Operaciones relacionadas con los repartidores.",
    },
    {
      name: "Pedidos",
      description: "Operaciones relacionadas con los pedidos.",
    },
    {
      name: "Detalle de Pedidos",
      description: "Operaciones relacionadas con los detalles de los pedidos.",
    },
  ],
};

const outputFile = "./src/swagger_output.json";

const endpointsFiles = ["./src/index.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
