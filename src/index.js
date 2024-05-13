import express from "express";
//import bodyParser from "body-parser"
const app = express();
import { PORT } from "./config.js";
import router from "./routes/user.routes.js";
import morgan from "morgan";

app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
