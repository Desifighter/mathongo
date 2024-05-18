import mongoose from "mongoose";
const { Schema } = mongoose;
import { CustomPropertySchema } from "./customPropertyModel.js";
import { adminSchema } from "./adminModel.js";

const ListSchema = new Schema({
  title: { type: String, required: true },
  customProperties: [CustomPropertySchema],
  admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  createdAt: { type: Date, default: Date.now },
});

export { ListSchema }; // Export the schema directly
export default mongoose.model("List", ListSchema);
