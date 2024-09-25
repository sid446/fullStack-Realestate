import User from "../models/user-model.js";
import bcryptjs from 'bcryptjs';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
// Adjust the import based on your structure

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(new ApiError(400, "All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    const existedUser = await User.findOne({
      $or: [{ email }, { username }]
  });
  
  if (existedUser) {
      return next(new ApiError(400, "Email or Username Already Exist"));
  }
  

    try {
        await newUser.save();
        const response = new ApiResponse(201, { message: "User created successfully" });
        res.status(response.statusCode).json(response);
    } catch (error) {
       return next(new ApiError(500, "An error occurred while creating the user", error.errors));
    }
};
export const signIn =async(req,res,next)=>{
    const {email,password}=req.body;

   
    try {
        if(!email || !password){
            return next(new ApiError(400,"All fields are required"))
        }
        
        const validUser = await User.findOne({
            $or:[{email}]
        })

        if(!validUser){
          return  next(new ApiError(404,"User Not Found"))
        }
        const validPassword=bcryptjs.compareSync(password,validUser.password)

        if(!validPassword){
            return next(new ApiError(401,"Wrong Password"))
        }
         const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)

        const {password:pas,...rest}=validUser._doc//not showing the password
        res.cookie('acces_token',token,{httpOnly:true}).status(200).json(rest);

    } catch (error) {
        return next(new ApiError(500,"An error occurred while signing in"))
        
    }
}