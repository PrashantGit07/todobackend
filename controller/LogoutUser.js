const LogoutUser = (req, res) => {
    try {
        res.clearCookie("auth-token");
        res.status(200).json({ message: "Logout successful" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default LogoutUser;
