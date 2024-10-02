import User from "../models/user-model.js";
import bcryptjs from 'bcryptjs';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
  
    // Check if all fields are provided
    if (!username || !email || !password) {
      return next(new ApiError(400, "All fields are required"));
    }
  
    try {
      // Check if the user already exists
      const existedUser = await User.findOne({
        $or: [{ email }, { username }],
      });
  
      if (existedUser) {
        return next(new ApiError(400, "Email or Username Already Exist"));
      }
  
      // Hash the password asynchronously
      const hashedPassword = await bcryptjs.hash(password, 10);
  
      // Now define the new user object with the hashed password
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Respond with a success message
      const response = new ApiResponse(201, { message: "User created successfully" });
      console.log('User created successfully:', newUser);
      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error('Error details:', error); // Log the actual error
      return next(new ApiError(500, "An error occurred while creating the user", error.message));
    }
  };
  
  
export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return next(new ApiError(400, "All fields are required"));
        }

        // Find user by email
        const validUser = await User.findOne({ email });

        // Check if user exists
        if (!validUser) {
            return next(new ApiError(404, "User Not Found"));
        }

        // Check password validity
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(new ApiError(401, "Wrong Password"));
        }

        // Create a JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1d' // Token expires in 1 day
        });

        // Send the token as a cookie (if needed) and in the response
       // In your signIn function
            res.cookie('access_token', token, { httpOnly: true, secure: true }) // Add secure if using HTTPS
            .status(200)
            .json({
                success: true,
                user: { ...validUser._doc, password: undefined }, // Exclude password from the response
            });


    } catch (error) {
        console.error("Error while creating user:", error);
        return next(new ApiError(500, "An error occurred while signing in"));
    }
};

export const saveExtraUserInfo = async (req, res, next) => {
    const { firstName, lastName, mobile, dob } = req.body; // No email here
    const userId = req.user.id;  

    // Ensure that all fields are provided
    if (!firstName || !lastName || !mobile || !dob) {
        return next(new ApiError(400, "All fields are required"));
    }

    try {
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }

        // Update user information
        user.firstName = firstName;
        user.lastName = lastName;
        user.mobile = mobile;
        user.dob = dob;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User information updated successfully",
            user
        });
    } catch (error) {
        return next(new ApiError(500, "Internal server error"));
    }
};
