import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.routes";
import { AppDataSource } from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", router.routerUser);
app.use("/api/v1", router.routerAuth);
app.use("/api/v1", router.routerCategory);
app.use("/api/v1", router.routerAddress);
app.use("/api/v1", router.routerCart);
app.use("/api/v1", router.routerOrder);
app.use("/api/v1", router.routerOrderItem);
app.use("/api/v1", router.routerProduct);
app.use("/api/v1", router.routerReview);
app.use("/api/v1", router.routerPayment);

// Start server after database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to database successfully");

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
