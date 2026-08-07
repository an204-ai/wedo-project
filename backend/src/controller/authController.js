import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "../models/session.js";
import crypto from "crypto";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

export const signUp = async (req, res) => {
    try {
        const {
            userName,
            userEmail,
            password,
            displayName,
            avatar,
            avatarId,
            bio,
            phone,
            role
        } = req.body;

        //Kiểm tra thông tin bắt buộc
        if (!userName || !password || !displayName || !userEmail) {
            return res.status(400).json({message: "Vui lòng nhập đầy đủ thông tin"});
        }

        //Kiểm tra username đã tồn tại chưa
        const existingUser = await User.findOne({$or: [{userName}, {userEmail}]});
        if (existingUser) {
            return res.status(400).json({message: "Username hoặc email đã tồn tại"});
        }
        //Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //Tạo tài khoản mới
        const user = new User({
            userName,
            userEmail,
            hashedPassword,
            displayName,
            avatar,
            avatarId,
            bio,
            phone,
            role
        });
        await user.save();
        return res.status(201).send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Lỗi Khi đăng ký tài khoản"});
    }
}

export const signIn = async (req, res) => {
    try {
        //Lấy thông tin đăng nhập
        const {userName, password} = req.body;
        if(!userName || !password) {
            return res.status(400).json({message: "Vui lòng nhập đầy đủ thông tin đăng nhập"});
        }
        
        //Lấy hashedPassWord trong db so với input
        const user = await User.findOne({userName});
        if (!user) {
            return res.status(401).json({message: "Username hoặc password không chính xác"});
        }

        //So sánh
        const passwordIsCorrect = await bcrypt.compare(password, user.hashedPassword);
        if (!passwordIsCorrect) {
            return res.status(401).json({message: "Username hoặc password không chính xác"});
        }
        
        //Nếu khớp, tạo acesstoken và JWT
        const accessToken = jwt.sign(
            {userId: user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: ACCESS_TOKEN_TTL}
        )

        // Tạo refresh token và lưu vào db
        const refreshToken = crypto.randomBytes(64).toString("hex");

        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL)
        })

        //Trả refresh token qua cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: REFRESH_TOKEN_TTL
        })

        // Trả về acessyoken qua res
        return res.status(200).json({message: `User ${user.displayName} đăng nhập thành công`, accessToken})

    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        return res.status(500).json({message: `Lỗi khi đăng nhập`});
    }
}

export const signOut = async (req, res) => {
    try {
        //Lấy refresh token trong cookie
        const token = req.cookies?.refreshToken;

        //Xóa refresh token trong db
        if (token) {
            await Session.deleteOne({refreshToken: token});
        }
        //XÓa refresh token trong trình duyệt
        res.clearCookie("refreshToken");
        return res.status(204).send();
    } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
        return res.status(500).json({message: `Lỗi hệ thống`});
    }
}