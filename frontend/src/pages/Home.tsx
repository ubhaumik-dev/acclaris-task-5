import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCard from "../components/cards/StatsCard";
import  { useState, useEffect } from "react";
import { Wallet,  Bot, Pencil } from "lucide-react";

import ExpensePieChart from '../components/charts/ExpensePieChart'
import axios from "axios";
import ExpenseBarChart from "../components/charts/ExpenseBarChart";

interface Expense{
  id: number,
  amount: number,
  category: string,
  source: string,
  expense_date: string,
  description: string
}

const Home = () => {
  const API = "http://127.0.0.1:8000";
  const[expenses, setExpenses] = useState<Expense[]>([])
  const [summary, setSummary] = useState<Record<string, number>>({});
   const fetchExpenses = async() =>{
    const response = await axios.get(`${API}/expenses`)
    setExpenses(response.data)
  }
  useEffect(() => {
    fetchExpenses();
  }, []);
  const totalSpend = expenses.reduce(
  (sum, expense) => sum + expense.amount,
  0
);

const aiScanned = expenses.filter(
  (expense) => expense.source === "AI"
).length;

const manualAdded = expenses.filter(
  (expense) => expense.source === "MANUAL"
).length;

useEffect(() => {
  axios
    .get("http://127.0.0.1:8000/expenses/summary")
    .then((res) => setSummary(res.data));
}, []);

const chartData = Object.entries(summary).map(
  ([category, amount]) => ({
    category,
    amount,
  })
);
  return (
    <div className="flex bg-black">
      <Sidebar />
      <main className="flex-1">
        <Header />

        <div className="grid grid-cols-3 gap-6 mt-8">
          <StatsCard
            title="Total Spend"
            value={`₹${totalSpend.toFixed(2)}`}
            subtitle="Total money spend"
            icon={<Wallet size={26} />}
            iconBg="bg-violet-600"
          />
         

          <StatsCard
            title="AI Scanned"
            value={aiScanned}
            subtitle="Expenses added by AI"
            icon={<Bot size={26} />}
            iconBg="bg-green-600"
          />

          <StatsCard
            title="Manual Added"
            value={manualAdded}
            subtitle="Expenses added manually"
            icon={<Pencil size={26} />}
            iconBg="bg-orange-600"
          />
        </div>
              <div className="grid grid-cols-2 gap-6 mt-6">
          <ExpensePieChart data={chartData}/>
          <ExpenseBarChart data={chartData} />
        </div>
      </main>
    </div>
  );
};

export default Home;
