require("dotenv").config();
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
// import APIControler from "./route/api";
// import initApiRouter from "./routes/api";
var cors = require("cors");

const app = express();

const corsOptions = {
  origin: "https://fe-honkai-star-rail-react.vercel.app/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.options(
  "*",
  cors({
    origin: "https://fe-honkai-star-rail-react.vercel.app/",
    credentials: true,
  })
);

app.use(
  cors({
    origin: "https://fe-honkai-star-rail-react.vercel.app/",
    credentials: true,
  })
);
//Config view engine
configViewEngine(app);

// init all web routes
initWebRoutes(app);

//deployvvvg
app.use(express.static(__dirname + "/build"));

let port = process.env.PORT || 3333;
app.listen(port, () =>
  console.log(`Building a login system with NodeJS is running on port ${port}!`)
);
