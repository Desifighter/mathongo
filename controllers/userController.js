import User from "../models/userModel.js";

export const unsubscribe = async (req, res) => {
  try {
    const { userid } = req.params;

    const result = await User.findByIdAndUpdate(userid,{subscribe:false},{new:true});

    console.log(result);
    res.json(
        "Your Email Has Been Unsubscribed"
    );
  } catch (error) {
    res.status(400).send({
        error
    });
  }
};
