
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import RevenueChart from "@/components/finance/RevenueChart";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock data
const revenueData = [
  { name: "Jan", revenue: 60000, expenses: 40000, profit: 20000 },
  { name: "Feb", revenue: 50000, expenses: 35000, profit: 15000 },
  { name: "Mar", revenue: 70000, expenses: 45000, profit: 25000 },
  { name: "Apr", revenue: 80000, expenses: 50000, profit: 30000 },
  { name: "May", revenue: 90000, expenses: 55000, profit: 35000 },
  { name: "Jun", revenue: 100000, expenses: 60000, profit: 40000 },
];

const revenueByClient = [
  { name: "TechCorp Inc.", value: 120000 },
  { name: "InnovateCo", value: 80000 },
  { name: "DataSecure", value: 65000 },
  { name: "ShopEasy", value: 95000 },
  { name: "Others", value: 60000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const invoices = [
  {
    id: "INV-2023-001",
    client: "TechCorp Inc.",
    amount: 15000,
    status: "paid",
    date: "2023-03-15",
  },
  {
    id: "INV-2023-002",
    client: "InnovateCo",
    amount: 32000,
    status: "paid",
    date: "2023-03-28",
  },
  {
    id: "INV-2023-003",
    client: "DataSecure",
    amount: 18500,
    status: "pending",
    date: "2023-04-05",
  },
  {
    id: "INV-2023-004",
    client: "ShopEasy",
    amount: 43000,
    status: "pending",
    date: "2023-04-10",
  },
  {
    id: "INV-2023-005",
    client: "SalesPro",
    amount: 12000,
    status: "overdue",
    date: "2023-03-01",
  },
];

const Finance = () => {
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = revenueData.reduce((sum, item) => sum + item.profit, 0);
  const profitMargin = (totalProfit / totalRevenue) * 100;
  
  const clientChartConfig = {
    client1: {
      label: "TechCorp Inc.",
      theme: {
        light: "#0088FE",
        dark: "#0088FE"
      }
    },
    client2: {
      label: "InnovateCo",
      theme: {
        light: "#00C49F",
        dark: "#00C49F"
      }
    },
    client3: {
      label: "DataSecure",
      theme: {
        light: "#FFBB28",
        dark: "#FFBB28"
      }
    },
    client4: {
      label: "ShopEasy",
      theme: {
        light: "#FF8042",
        dark: "#FF8042"
      }
    },
    client5: {
      label: "Others",
      theme: {
        light: "#8884d8",
        dark: "#8884d8"
      }
    }
  };
  
  // Map data to include client keys for the chart config
  const clientData = [
    { name: "TechCorp Inc.", value: 120000, client: "client1" },
    { name: "InnovateCo", value: 80000, client: "client2" },
    { name: "DataSecure", value: 65000, client: "client3" },
    { name: "ShopEasy", value: 95000, client: "client4" },
    { name: "Others", value: 60000, client: "client5" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Financial Management</h1>
        </div>
        
        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">${totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-nexus-blue-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-nexus-blue-500" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">+12.5%</span>
                <span className="text-xs text-gray-500 ml-1">vs last quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                  <h3 className="text-2xl font-bold mt-1">${totalExpenses.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <TrendingDown className="h-6 w-6 text-red-500" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-500">+8.3%</span>
                <span className="text-xs text-gray-500 ml-1">vs last quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Profit Margin</p>
                  <h3 className="text-2xl font-bold mt-1">{profitMargin.toFixed(1)}%</h3>
                </div>
                <div className="p-3 bg-nexus-teal-100 rounded-full">
                  <AlertCircle className="h-6 w-6 text-nexus-teal-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">Target: 40%</span>
                  <span>Current: {profitMargin.toFixed(1)}%</span>
                </div>
                <Progress value={profitMargin} max={40} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData} title="Monthly Financial Overview" />
          </div>
          
          {/* Revenue by Client */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Revenue by Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ChartContainer config={clientChartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={clientData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        dataKey="value"
                        nameKey="client"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {clientData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`var(--color-${entry.client}, ${COLORS[index % COLORS.length]})`} 
                          />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent 
                            formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                            nameKey="client"
                          />
                        } 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Invoices Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-2 font-medium">Invoice ID</th>
                    <th className="pb-2 font-medium">Client</th>
                    <th className="pb-2 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b last:border-0">
                      <td className="py-3 text-sm font-medium">{invoice.id}</td>
                      <td className="py-3 text-sm">{invoice.client}</td>
                      <td className="py-3 text-sm">${invoice.amount.toLocaleString()}</td>
                      <td className="py-3 text-sm">{invoice.date}</td>
                      <td className="py-3">
                        <span 
                          className={cn(
                            "px-2 py-1 text-xs font-medium rounded-full",
                            invoice.status === "paid" && "bg-green-100 text-green-800",
                            invoice.status === "pending" && "bg-amber-100 text-amber-800",
                            invoice.status === "overdue" && "bg-red-100 text-red-800"
                          )}
                        >
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Finance;
