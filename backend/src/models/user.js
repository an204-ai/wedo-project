import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userEmail: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    avatarId: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true,
        maxLength: 500
    },
    phone: {
        type: String,
        sparse: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;
