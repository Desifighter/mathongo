import mongoose from "mongoose";
const { Schema } = mongoose;
import {CustomPropertySchema} from "./customPropertyModel.js";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    customProperties: [CustomPropertySchema],
    subscribe:{type:Boolean, default:true}
  },
  { timestamps: true }
);

export {userSchema};
export default mongoose.model("User",userSchema);
