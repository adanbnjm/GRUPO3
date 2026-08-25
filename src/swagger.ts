import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Sistema de Pedidos",
    description:
      "API REST para gestionar productos, clientes, repartidores y pedidos",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/index.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
