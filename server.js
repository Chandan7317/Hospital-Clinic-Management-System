const app = require("./app");
const connectDB = require("./src/config/db");

connectDB()
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      if (err) {
        console.log("Error while starting a server", err);
        process.exit(1); //close the server /process with failure
      }
      console.log("Server running port No", process.env.PORT);
    });
  })
  .catch(() => {
    console.log("Error while connecting Database", process.env.MONGODB_URL);
    process.exit(1);
  });
