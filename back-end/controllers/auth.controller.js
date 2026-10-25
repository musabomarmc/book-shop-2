import userTable from "../models/auth.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const sign_in = async (req, res) => {
    // Destructure the required fields from the request body
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "credentials are required"
        })
    }
    try {
        // Check if the email already exists in the database
        const user = await userTable.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        // compare the provided password with the hashed password in the database
        const ispasswordCOrrect = await bcrypt.compare(password, user.password);
        if (!ispasswordCOrrect) {
            return res.status(401) - json({
                success: false,
                message: "password is invalid",
            })
        }

        //generate a jwt token for the authenticated user
        const token = jwt.sign({ id: user._id }, process.env.JSON_SECRET)

        // Remove password from response
        const { password: pass, ...userwithoutpassword } = user._doc;

        return res.status(200).json({
            success: true,
            message: "sign in was successfull",
            data: userwithoutpassword,
            token: token
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}

export const sign_up = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }

    try {
        const existingUser = await userTable.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userTable({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // Remove password from response
        const { password: pass, ...userWithoutPassword } = savedUser._doc;

        return res.status(201).json({
            success: true,
            message: "Sign up successful",
            data: userWithoutPassword
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};