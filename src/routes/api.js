import express from "express";
import APIControler from "../controllers/APIControler";

// const { EnkaClient } = require("enka-network-api");

let router = express.Router();

const initApiRouter = (app) => {
  router.get("/data", APIControler.getData);
  return app.use("/api/v1/", router);
};

export default initApiRouter;
// module.exports = initWebRouter;
