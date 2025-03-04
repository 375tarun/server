import jwt from "jsonwebtoken";

// Middleware to protect routes (ensure user is authenticated)
export const requireAuth = (req, res, next) => {
    const token = req.cookies.token; // Extract token from cookies

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. Please login first.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token. Please login again.",
        });
    }
};

// Middleware to prevent access to login/signup if user is already logged in
export const preventAuthAccess = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET); // Verify token
            return res.status(403).json({
                success: false,
                message: "You are already logged in.",
            });
        } catch (error) {
            next(); // Token is invalid, allow access to login/signup
        }
    } else {
        next(); // No token, allow access to login/signup
    }
};
