import React from "react";

function ExpenseCard(props) {
  return (
    <>
      <div className="bg-white rounded-2xl flex flex-row gap-3.5 justify-between">
        <div>{props.expenseName}</div>
        <div>{props.expenseAmount}</div>
        <div>{props.expenseCategory.categoryName}</div>
      </div>
    </>
  );
}

export default ExpenseCard;
