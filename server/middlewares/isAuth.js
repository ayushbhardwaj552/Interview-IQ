import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User does not have token",
        success: false,
      });
    }

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.userId = verifyToken.id;

    next();

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: `Authentication error ${err.message}`,
      success: false,
    });
  }
};

export default isAuth;
