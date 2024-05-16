import  jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.HASH_SECRET; // Replace with your actual secret key

export default function jwtMiddleware(req, res, next) {
    // Get the token from the cookie
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach user information to the request object
        req.user = decoded;
        next();
    });
};


