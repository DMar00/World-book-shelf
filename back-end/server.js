import express from "express"
import cors from "cors"
import 'dotenv/config'
import { connectDB } from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import bookRoutes from './routes/bookRoutes.js'

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//connect db
connectDB();

//api endpoint
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);

//
app.get("/", (req, res) => {
    res.send("API Working") //this is showed on https://localhost:4000
})

app.listen(port, () => {
    console.log(`Server Started on https://localhost:${port}`)  //this is showed on terminal
})