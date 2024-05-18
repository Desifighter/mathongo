import mongoose from "mongoose";
const { Schema } = mongoose;
import {CustomPropertySchema} from "./customPropertyModel.js";
// import { ListSchema } from "./listModel.js";
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    customProperties: [CustomPropertySchema],
    subscribe: { type: Boolean, default: true },
    list: { type: Schema.Types.ObjectId, ref: "List", required: true },
  },
  { timestamps: true }
);

export {userSchema};
export default mongoose.model("User",userSchema);
