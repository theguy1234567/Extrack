import mongoose, { Schema } from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    budgetAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    budgetCategory: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    // Expense categories will act as the budget categories

    periodType: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["progress", "completed"],
      default: "progress",
    },
  },
  { timestamps: true },
);
BudgetSchema.index(
  {
    createdBy: 1,
    budgetCategory: 1,
    startDate: 1,
    endDate: 1,
  },
  {
    unique: true,
  },
);

const Budget =
  mongoose.models.budgets || mongoose.model("budgets", BudgetSchema);

export default Budget;
