
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

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
  const chartConfig = {
    revenue: {
      label: "Revenue",
      theme: {
        light: "#2673ff",
        dark: "#2673ff"
      }
    },
    expenses: {
      label: "Expenses",
      theme: {
        light: "#ff6b6b",
        dark: "#ff6b6b"
      }
    },
    profit: {
      label: "Profit",
      theme: {
        light: "#00e6a0",
        dark: "#00e6a0"
      }
    }
  };

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
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-revenue, #2673ff)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-revenue, #2673ff)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-expenses, #ff6b6b)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-expenses, #ff6b6b)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-profit, #00e6a0)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-profit, #00e6a0)" stopOpacity={0} />
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
                <ChartTooltip content={<ChartTooltipContent formatter={(value: number) => [`${formatCurrency(value)}`, undefined]} />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue, #2673ff)"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="var(--color-expenses, #ff6b6b)"
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="var(--color-profit, #00e6a0)"
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
