"use client";

import axios from "axios";
import { useState } from "react";
import ExpenseCard from "@/components/ExpenseCard";

export default function AddExpensePage() {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    expenseName: "",
    expenseAmount: "",
    description: "",
    expenseCategory: "",
    isRecurring: false,
    recurrencePeriod: "",
    nextBillingDate: "",
  });

  async function getExp() {
    try {
      const res = await axios.get("/api/users/addexpense", {
        withCredentials: true,
      });

      console.log(res.data);

      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "something went wrong");
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleClick() {
    try {
      const payload = {
        ...form,
        expenseAmount: Number(form.expenseAmount),
      };

      const res = await axios.post("/api/users/addexpense", payload, {
        withCredentials: true,
      });

      console.log("Expense Added:", res.data);

      alert("Expense Added Successfully");

      setForm({
        expenseName: "",
        expenseAmount: "",
        description: "",
        expenseCategory: "",
        isRecurring: false,
        recurrencePeriod: "",
        nextBillingDate: "",
      });
    } catch (error) {
      console.error(error.response?.data || error.message);

      alert("Something went wrong");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-gray-100 gap-5 p-5">
      {/* FORM */}
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Add Expense
        </h1>

        {/* Expense Name */}
        <input
          name="expenseName"
          value={form.expenseName}
          onChange={handleChange}
          className="border p-2 rounded-md"
          placeholder="Expense Name"
        />

        {/* Amount */}
        <input
          name="expenseAmount"
          type="number"
          value={form.expenseAmount}
          onChange={handleChange}
          className="border p-2 rounded-md"
          placeholder="Amount"
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded-md"
          placeholder="Description"
        />

        {/* Category */}
        <input
          name="expenseCategory"
          value={form.expenseCategory}
          onChange={handleChange}
          className="border p-2 rounded-md"
          placeholder="Category"
        />

        {/* Recurring */}
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="isRecurring"
            checked={form.isRecurring}
            onChange={handleChange}
          />

          <label>Recurring Expense</label>
        </div>

        {/* Recurring Fields */}
        {form.isRecurring && (
          <>
            <select
              name="recurrencePeriod"
              value={form.recurrencePeriod}
              onChange={handleChange}
              className="border p-2 rounded-md"
            >
              <option value="">Select</option>

              <option value="weekly">Weekly</option>

              <option value="monthly">Monthly</option>

              <option value="yearly">Yearly</option>
            </select>

            <input
              type="date"
              name="nextBillingDate"
              value={form.nextBillingDate}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </>
        )}

        <button
          onClick={handleClick}
          className="bg-blue-500 text-white py-2 rounded-md"
        >
          Add Expense
        </button>
      </div>

      {/* DASHBOARD */}
      <div className="w-full max-w-lg">
        <button
          onClick={getExp}
          className="bg-black text-white px-4 py-2 rounded-md mb-4"
        >
          Get Expenses
        </button>

        <div className="flex flex-col gap-3">
          {data.map((exp) => (
            <ExpenseCard
              key={exp._id}
              expenseName={exp.expenseName}
              expenseAmount={exp.expenseAmount}
              expenseCategory={exp.expenseCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
