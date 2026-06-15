"use client";

import React, { useState } from "react";
import axios from "axios";

function AddBudgetModal() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    budgetAmount: "",
    periodType: "",
    startDate: "",
    budgetCategory: "",
    endDate: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    try {
      const payload = {
        ...form,
        budgetAmount: Number(form.budgetAmount),
      };

      const res = await axios.post("/api/users/addbudget", payload, {
        withCredentials: true,
      });

      console.log(res.data);

      alert(res.data.message);

      setOpen(false);
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Add Budget
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Add Budget</h1>
            <input
              type="text"
              name="BudgetCategory"
              value={form.BudgetCategory}
              onChange={handleChange}
              placeholder="BudgetFor"
              className="border p-2 
              rounded-md"
            />

            <input
              type="number"
              name="budgetAmount"
              placeholder="Budget Amount"
              value={form.budgetAmount}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />

            <select
              name="periodType"
              value={form.periodType}
              onChange={handleChange}
              className="border p-2 rounded-md"
            >
              <option value="">Select Period</option>

              <option value="weekly">Weekly</option>

              <option value="monthly">Monthly</option>

              <option value="yearly">Yearly</option>
            </select>

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />

            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Budget
              </button>

              <button
                onClick={() => setOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddBudgetModal;
