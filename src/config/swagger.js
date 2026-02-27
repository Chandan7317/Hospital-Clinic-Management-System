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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: [
    "./src/routes/user.route.js",
    "./src/routes/doctor.route.js",
    "./src/routes/patient.routes.js",
  ], // yaha routes folder ka path dena
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
