import mongoose, { Schema } from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    budgetAmount: {
      type: Number,
      required: true,
    },
    // budegetCategory: {
    //   type: Schema.Types.ObjectId,
    //   ref: categories,
    // }, add Budget Categories later as now expenses can have categories and also budgets they can have conflicts 

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
  },
  { timestamps: true },
);

const Budget =
  mongoose.models.budgets || mongoose.model("budgets", BudgetSchema);

export default Budget;
