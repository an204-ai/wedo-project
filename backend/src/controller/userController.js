import User from "../models/user.js";

export const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "Không tìm thấy người dùng"});
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Lỗi khi lấy thông tin người dùng"});
    }
}