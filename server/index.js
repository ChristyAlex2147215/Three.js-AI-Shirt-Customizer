import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import router from "./routes/dalle_routes.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/dalle", router);  // Using the corrected router

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Form M.E" });
});

app.listen(8000, () => console.log(`Server is running at port 8000`));
