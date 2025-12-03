import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { db } from "./config/db.js";

// env file config
dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// simple request logger for debugging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
    next();
});

//db connection
db.getConnection((err) => {
    if (err) {
        console.log("Database connection failed", err);
    } else {
        console.log("Database connected successfully");
    }
});
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);


// app listening port
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});