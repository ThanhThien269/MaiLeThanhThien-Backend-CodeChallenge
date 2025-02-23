import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import resourceRoutes from "./routes/resource.route";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/resource", resourceRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port " + PORT);
});
