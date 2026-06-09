import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ExpenseData {
  category: string;
  amount: number;
}

interface ExpenseBarChartProps {
  data: ExpenseData[];
}

const ExpenseBarChart = ({ data }: ExpenseBarChartProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">
        Expenses by Category
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="category"
              tick={{ fontSize: 12 }}
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              radius={[8, 8, 0, 0]}
              fill="#8B5CF6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseBarChart;