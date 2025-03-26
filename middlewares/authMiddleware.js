import jwt from "jsonwebtoken";

//  Middleware: Verify JWT Token
export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

//  Middleware: Restrict Access to Admin Only
export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
    next();
};
