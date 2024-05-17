import mongoose from "mongoose";
const { Schema } = mongoose;
import {ListSchema} from "./listModel.js"; // Import the schema

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lists: [ListSchema], // Use the imported schema directly
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema); // Create the model from the schema
