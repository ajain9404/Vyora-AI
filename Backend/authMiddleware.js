import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No authentication token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Invalid authentication format"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.error("JWT verification failed:", error);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;