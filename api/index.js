import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected to MongoDB!")
}).catch((err)=>{
    console.log(err)
})


const app=express();

app.listen(process.env.PORT,()=>{
    console.log(`Server Running on port ${process.env.PORT}`)
})

app.use("/api/user",userRouter)