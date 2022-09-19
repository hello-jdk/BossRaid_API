const express = require("express");
const config = require("./config");
const { loader } = require("./loaders");

async function startServer() {
  const app = express();

  //loader
  await loader(app);

  //listening
  app
    .listen(config.PORT, () => {
      console.log(`
    ################################################
      🛡️  Server listening on port: ${config.PORT} 🛡️
    ################################################`);
    })
    .on("error", (err) => {
      console.error("Internal Server Error");
      console.error(err.message);
      process.exit(1);
    });
}

startServer();
