import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.routes";
// import routerPayment from "./routes/payment.routes";
dotenv.config();
import AppDataSource from "./config/database";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
AppDataSource
const PORT = process.env.PORT;
app.use("/api/v1", router.routerUser);
app.use("/api/v1", router.routerAuth);
app.use("/api/v1", router.routerCategory);
app.use("/api/v1", router.routerAddress);
app.use("/api/v1", router.routerCart);
app.use("/api/v1", router.routerOrder);
app.use("/api/v1", router.routerOrderItem);
app.use("/api/v1", router.routerProduct);
app.use("/api/v1", router.routerReview)
// app.use("/api/v1", routerPayment)
app.use("/api/v1", router.routerPayment)
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});