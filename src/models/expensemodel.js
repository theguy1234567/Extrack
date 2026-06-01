import mongoose, { Schema } from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    expenseName: {
      type: String,
      required: true,
    },
    expenseAmount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurrencePeriod: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
    },
    nextBillingDate: {
      type: Date,
      //for subscriptions
    },
    expenseCategory: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true },
);

const Expense =
  mongoose.models.expenses || mongoose.model("expenses", ExpenseSchema);
export default Expense;
