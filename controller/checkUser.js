import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const checkUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const userId = verified.id;

        const checkUserExist = User.findById(userId);

        if (!checkUserExist) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        req.userId = userId;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Unauthorized" })
    }
}

export default checkUser;