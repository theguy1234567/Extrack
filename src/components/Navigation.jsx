import Link from "next/link";

export default function Navigation() {
  return (
    <div className="bg-white inset-0 inset-shadow-lg h-screen w-[15%] rounded-sm text-black p-2 flex flex-col justify-between items-center">
      <div className="mt-5 flex justify-center p-2 w-full">
        <h1 className="text-5xl font-extrabold text-shadow-lg">EXtrack</h1>
      </div>

      <div className="h-full mt-5 w-full flex flex-col justify-between p-2">
        <ul>
          <h1 className="text-2xl">General</h1>

          <Link
            href="/profile/dashboard"
            className="block p-2 hover:bg-gray-200 transition-all duration-500 ease-in-out w-full"
          >
            Dashboard
          </Link>

          <Link
            href="/profile/subscriptions"
            className="block p-2 hover:bg-gray-200 transition-all duration-500 ease-in-out w-full"
          >
            Subscriptions
          </Link>

          <Link
            href="/profile/budgets"
            className="block p-2 hover:bg-gray-200 transition-all duration-500 ease-in-out w-full"
          >
            Budgets
          </Link>

          <Link
            href="/profile/budgets"
            className="block p-2 hover:bg-gray-200 transition-all duration-500 ease-in-out w-full"
          >
            Goals
          </Link>

          <Link
            href="/profile/expensepage"
            className="block p-2 hover:bg-gray-200 transition-all duration-500 ease-in-out w-full"
          >
            Add Expense
          </Link>
          <Link
            href="/profile/incomepage"
            className="block p-2 hover:bg-gray-200 transition-all duration-500 ease-in-out w-full"
          >
            Add Income
          </Link>

          <hr />

          <h1 className="mt-2 text-2xl">Tools</h1>

          <Link
            href="/profile/insights"
            className="block p-2 hover:bg-gray-200 transition-all duration-500 ease-in-out w-full"
          >
            Insights
          </Link>

          <Link
            href="/profile/analytics"
            className="block p-2 mt-2 mb-2 hover:bg-gray-200 transition-all duration-500 ease-in-out w-full"
          >
            Analytics
          </Link>

          <hr />

          <h1 className="mt-2 text-2xl">Other</h1>

          <Link
            href="/profile/settings"
            className="block p-2 hover:bg-gray-200 transition-all duration-500 ease-in-out w-full"
          >
            Settings
          </Link>

          <Link
            href="/profile/profile"
            className="block p-2 hover:bg-gray-200 transition-all duration-500 ease-in-out w-full"
          >
            Profile
          </Link>

          <Link
            href="/profile/logout"
            className="block p-2 hover:bg-gray-200 transition-all duration-500 ease-in-out w-full"
          >
            Logout
          </Link>
        </ul>
      </div>

      <div className="p-4 mt-10 w-full flex justify-between items-center">
        <div className="bg-blue-400 mr-2 rounded-full h-15 w-15 flex justify-center items-center">
          G
        </div>

        <div className="flex-1 ml-1 flex-col">
          <h1 className="text-4xl">Jsondoe</h1>
          <h1>Jsondoe@gmail.com</h1>
        </div>
      </div>
    </div>
  );
}
