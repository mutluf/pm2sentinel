import express from "express";
import pm2Routes from "./modules/pm2/pm2Routes";
import {errorHandler} from "./middleware/errorHandler";
import {connectDB} from "./config/db";
import applicationRoutes from "./modules/application/applicationRoutes";

const app = express();
//This is a built-in middleware function in Express. It parses incoming requests with Buffer
// payloads and is based on body-parser.
app.use(express.json());

//app.use(express.urlencoded({ extended: true }));
// form-data or urlencoded
connectDB();

app.use("/pm2", pm2Routes);
app.use("/apps",applicationRoutes);
app.use(errorHandler);
app.listen(5000, () => console.log("Server listening on http://localhost:5000"));
