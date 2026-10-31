import express from "express";
import dotenv from "dotenv";
import authRouter from "./routers/auth.router.js";
import { connectDb } from "./config/db.js";
import bookRouter from "./routers/book.router.js";

dotenv.config();

const app =express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    connectDb();
    console.log(`server is running at http://localhost:${PORT}`);
    
})