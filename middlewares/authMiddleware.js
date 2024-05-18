import JWT from "jsonwebtoken";

// protected routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Token Problem",
      ok:false
    });
    console.log(error);
  }
};

