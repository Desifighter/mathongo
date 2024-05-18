import mongoose from "mongoose";
const { Schema } = mongoose;

const CustomPropertySchema = new Schema({
  title: { type: String, required: true },
  fallbackValue: { type: String, required: true },
});

export {CustomPropertySchema} // Export the schema directly

// export default mongoose.model("Custom",CustomPropertySchema);