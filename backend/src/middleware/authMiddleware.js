import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
    try {
        // Lấy token từ header
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(' ')[1];

        // Xác thực token hợp lệ
        if (!token) {
            return res.status(401).json({message: "Token không tồn tại"});
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decodedUser) => {
            if (error) {
                return res.status(401).json({message: "Token không tồn tại hoặc không đúng"});
            }
            const user = await User.findById(decodedUser.userId);
            if (!user) {
                return res.status(401).json({message: "User không tồn tại"});
            }
            req.user = user;
            next();
        })

    } catch (error) {
        console.error("Lỗi khi xác thực:", error);
        return res.status(500).json({ message: "Lỗi khi xác thực" });
    }
}