import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected to MongoDB!")
}).catch((err)=>{
    console.log(err)
})


const app=express();

app.use(express.json());

app.listen(process.env.PORT,()=>{
    console.log(`Server Running on port ${process.env.PORT}`)
})
app.use(cookieParser());
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)

//middleware for tackling error 
app.use((err,req,res,next)=>{
    const statusCode= err.statusCode || 500 ;
    const message =err.message || "Internal Server Error"
    return res.status(statusCode)
    .json({
        success:false,
        statusCode,
        message,
    })

})