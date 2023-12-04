import express, { json } from "express";
import dotenv from 'dotenv';
import client from "./database.js";
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'


// configure_env
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// app.get('/',(req,res)=>{
//     res.send({
//         msg: "Welcome!"
//     })
// })

// routes
app.use('/auth',authRoutes);

// database connection;
client.connect();

// server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT} successfully!`)
})