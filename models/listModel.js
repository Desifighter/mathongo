import mongoose from "mongoose";
const { Schema } = mongoose;
import {CustomPropertySchema} from "./customPropertyModel.js";
import {userSchema} from "./userModel.js";

const ListSchema = new Schema({
  title: { type: String, required: true },
  customProperties: [CustomPropertySchema],
  users:[userSchema],
  createdAt: { type: Date, default: Date.now },
});

export {ListSchema} // Export the schema directly
export default mongoose.model("List",ListSchema);
