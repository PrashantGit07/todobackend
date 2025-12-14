
import User from "../model/userModel.js";
import bcrypt from "bcryptjs"
const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save();
        res.status(200).json({ message: "User registered successfully", name: newUser.name })
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }

}

export default RegisterUser