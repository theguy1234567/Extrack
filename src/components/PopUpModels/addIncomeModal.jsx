"use client";

import React, { useState } from "react";
import axios from "axios";

function AddIncomeModal() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    IncomeSource: "",
    IncomeAmount: "",
    description: "",
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
        IncomeAmount: Number(form.IncomeAmount),
      };

      const res = await axios.post("/api/users/addincome", payload, {
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
        Add Income
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Add income</h1>

            <input
              type="number"
              name="IncomeAmount"
              placeholder="IncomeAmount"
              value={form.IncomeAmount}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />

            <input
              name="IncomeSource"
              value={form.IncomeSource}
              placeholder="incomeSourcew"
              onChange={handleChange}
              className="border p-2 rounded-md"
            />

            <input
              name="description"
              value={form.description}
              placeholder="description"
              onChange={handleChange}
              className="border p-2 rounded-md"
            />

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save income
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

export default AddIncomeModal;
