const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hospital Management System API",
      version: "1.0.0",
      description: "HMS Backend API Documentation",
    },
    servers: [
      {
        url: "http://localhost:9000",
      },
    ],
  },
  apis: ["./src/routes/user.route.js"], // yaha routes folder ka path dena
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
