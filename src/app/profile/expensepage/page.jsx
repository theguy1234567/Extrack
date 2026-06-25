"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ExpensePage() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses();
  }, []);

  async function getExpenses() {
    try {
      const res = await axios.get("/api/users/addexpense", {
        withCredentials: true,
      });

      setExpenses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Table>
        <TableCaption>A list of your recent Expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell className="font-medium">
                {expense.expenseName}
              </TableCell>
              <TableCell>{expense.expenseCategory?.categoryName}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell className="text-right">
                ₹{expense.expenseAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ExpensePage;
