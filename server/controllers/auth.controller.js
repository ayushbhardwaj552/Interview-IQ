import User from "../models/user.models.js";
import genToken from "../config/token.js";

export const googleAuth = async (req, res) => {
  try {

    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login Successful",
      user,
      success: true,
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: `Google Auth error ${err.message}`,
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      message: "Logout Successful",
      success: true,
    });

  } catch (err) {

    return res.status(500).json({
      message: `Logout error ${err.message}`,
      success: false,
    });
  }
};
