import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    expiredAt: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
});

sessionSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Session", sessionSchema);