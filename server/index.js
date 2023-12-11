import express, { json } from "express";
import dotenv from 'dotenv';
import client from "./database.js";
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
// import bodyParser from "body-parser";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import {v2 as cloudinary} from 'cloudinary';

// configure_env
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());


// app.get('/',(req,res)=>{
//     res.send({
//         msg: "Welcome!"
//     })
// })

// routes
app.use('/auth',authRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes)

// database connection;
client.connect();

// configure cloudinary

cloudinary.config({ 
    cloud_name: 'de8lmjg2m', 
    api_key: '255383985416881', 
    api_secret: '_Ou9KzOGXBsl-SR1xMXn1WODreA' 
  });

// server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT} successfully!`)
})