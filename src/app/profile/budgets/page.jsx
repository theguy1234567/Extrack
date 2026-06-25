"use client";
import AddBudgetModal from "@/components/PopUpModels/addbudgetModal";
import axios from "axios";
import React from "react";

function Budgets() {
  async function handgleGetBudgets() {
    try {
      const res = await axios.get("/api/users/addbudget", {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data?.message || "something went wrong");
    }
  }

  return (
    <>
      <AddBudgetModal />;<button onClick={handgleGetBudgets}>Getbudgets</button>
    </>
  );
}

export default Budgets;
