import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Category =
  mongoose.models.categories || mongoose.model("categories", CategorySchema);

export default Category;
