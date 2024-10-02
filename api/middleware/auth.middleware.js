import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

// Ensure you have 'cookie-parser' middleware setup
const authMiddleware = (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.access_token; 

        // Log the token to ensure it's being retrieved
        console.log('Token from cookies:', token);

        // Check if the token exists
        if (!token) {
            return next(new ApiError(401, "Unauthorized, token not provided"));
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Log decoded token to check its contents
        console.log('Decoded token:', decoded);

        // Attach decoded user information to request
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Check if the error is due to an expired token
        if (error.name === 'TokenExpiredError') {
            return next(new ApiError(403, "Token expired"));
        }

        // For other errors (e.g., invalid token)
        console.error('Token verification error:', error);
        return next(new ApiError(403, "Invalid or expired token"));
    }
};

export default authMiddleware;
