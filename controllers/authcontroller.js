import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import adminModel from "../models/adminModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    // console.log(req.body);

    const { name, email, password} = req.body;

    // console.log(name);

    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    
    // check user
    const existingUser = await adminModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new adminModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error is reg",
      error,
    });
  }
};



export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(201).send({
        success: false,
        message: "Invalid credential",
      });
    }

    // validation
    const user = await adminModel.findOne({ email });

    if (!user) {
      console.log("User not find");
      return res.status(200).send({
        success: false,
        message: "You are not Registered",
      });
    }

    //const match = await bcrypt.compare(password, user.passwordHash);

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Wrong Password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


