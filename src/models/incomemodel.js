import mongoose, { Schema } from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    IncomeSource: {
      type: String,
      required: true,
    },
    IncomeAmount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      length: 100,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true },
);
const Income =
  mongoose.models.incomes || mongoose.model("incomes", IncomeSchema);

export default Income;
