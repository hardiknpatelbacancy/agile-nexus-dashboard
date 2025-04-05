
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface RevenueData {
  name: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface RevenueChartProps {
  data: RevenueData[];
  title?: string;
  className?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  title = "Revenue Overview",
  className,
}) => {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2673ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2673ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00e6a0" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00e6a0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tickLine={false}
                axisLine={false}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                tickFormatter={formatCurrency} 
                tickLine={false}
                axisLine={false}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                formatter={(value: number) => [`${formatCurrency(value)}`, undefined]} 
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2673ff"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#ff6b6b"
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#00e6a0"
                fillOpacity={1}
                fill="url(#colorProfit)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 gap-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-nexus-blue-500 mr-2" />
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
            <span className="text-sm text-gray-600">Expenses</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-nexus-teal-500 mr-2" />
            <span className="text-sm text-gray-600">Profit</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
