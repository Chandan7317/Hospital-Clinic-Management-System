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
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
  },

  apis: ["./src/routes/user.route.js" ,"./src/routes/doctor.route.js"], // yaha routes folder ka path dena
  
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
