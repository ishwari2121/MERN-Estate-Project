import { configDotenv } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config();
import cookieParser from 'cookie-parser';


mongoose.connect(process.env.mongo).then(() => {
    console.log('connected to MongoDB');
    }).catch((err)=> {
        console.log(err);
        
    })

const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(3000, () => {
    console.log('server is running');
    
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);


app.use((err,req,res,next) => {
    const statusCode =  err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});