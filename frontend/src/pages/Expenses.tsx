import  { useEffect, useState } from "react";
import axios from "axios";

interface Expense{
    id:number,
    amount:number,
    category: string,
    expense_date: string,
    description: string
}

const Expenses = () => {
const API = "https://api.udita.me";
  
 const[expenses, setExpenses] = useState<Expense[]>([])
  const fetchExpenses = async() =>{
    const response = await axios.get(`${API}/expenses`)
    setExpenses(response.data)
  }
  useEffect(() => {
    fetchExpenses();
  }, []);
 return (
  <div className="min-h-screen bg-slate-100 p-8">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Transactions
          </h1>
          <p className="text-slate-500 mt-2">
            View and manage all your expenses.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <div className="bg-white px-6 py-4 rounded-2xl shadow">
            <p className="text-sm text-slate-500">
              Total Transactions
            </p>
            <h2 className="text-2xl font-bold text-violet-600">
              {expenses.length}
            </h2>
          </div>
        </div>
      </div>


      {/* Table */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-semibold">
            Expense History
          </h2>
        </div>

        {expenses.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">
              💸
            </div>

            <h3 className="text-xl font-semibold text-slate-700">
              No Expenses Found
            </h3>

            <p className="text-slate-500 mt-2">
              Start by adding your first expense.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>
                  <th className="text-left px-6 py-4">
                    Amount
                  </th>

                  <th className="text-left px-6 py-4">
                    Category
                  </th>

                  <th className="text-left px-6 py-4">
                    Date
                  </th>

                  <th className="text-left px-6 py-4">
                    Description
                  </th>
                </tr>

              </thead>

              <tbody>

                {expenses.map((expense) => (

                  <tr
                    key={expense.id}
                    className=" hover:bg-slate-50 transition"
                  >

                    <td className="px-6 py-4 font-semibold text-green-600">
                      ₹{expense.amount}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          expense.category === "Food"
                            ? "bg-orange-100 text-orange-700"
                            : expense.category === "Travel"
                            ? "bg-blue-100 text-blue-700"
                            : expense.category === "Shopping"
                            ? "bg-purple-100 text-purple-700"
                            : expense.category === "Utilities"
                            ? "bg-yellow-100 text-yellow-700"
                            : expense.category === "Health"
                            ? "bg-green-100 text-green-700"
                            : expense.category === "Entertainment"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {expense.category}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {expense.expense_date}
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {expense.description}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Expenses;
