import Link from "next/link";

export default function Toolbar() {
  return (
    <>
      <div className="bg-sky-100 w-full shadow-sm h-[12%]    flex flex-row justify-between items-center p-4 ">
        <div>
          <h1 className="text-4xl ">Hi,Kaushik</h1>
          <h1 className="text-1xl font-extralight">
            track you all your expenses and transactions
          </h1>
        </div>
        <span className="flex  items-center ">
          <Link
            href="/profile/expensepage"
            className="bg-emerald-300 rounded-md p-2"
          >
            Add expense
          </Link>{" "}
          <Link
            href="/profile/incomepage"
            className="bg-emerald-300 rounded-md p-2 ml-5"
          >
            Add income
          </Link>{" "}
          🕜 9:45 pm | 24 Feb 2026 | In
        </span>
      </div>
    </>
  );
}
