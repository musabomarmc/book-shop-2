import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)


const userTable = mongoose.model("userTable", authSchema, "userTable");
export default userTable;