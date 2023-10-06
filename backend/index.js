import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import connectDB from "./database/Connection.js";
import adminRoutes from "./router/admin.js";


//*  CONFIGURATION *//
const app = express();
const PORT = process.env.PORT || 6001;
app.use(bodyParser.json({limit:'50mb'}));

app.use(express.json())
app.use(cors())
//*  ROUTES   *//
app.use("/", adminRoutes);


//*  Databases *//
connectDB();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});