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
      //for subscriptions NOTE:SHOULD BE CALCULATED WITH A PREHOOK
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

// if the recurrencePeriod is true then based on the enums value the next billing date should be calculated 
// and the when the subscription date arrives a request should pop up on the subscription page when accepted a expense should be created with category subscription
