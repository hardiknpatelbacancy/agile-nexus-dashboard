import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";
import EmployeeCard from "@/components/employees/EmployeeCard";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock data
const employees = [
  {
    id: "emp-1",
    name: "John Doe",
    role: "Senior Developer",
    department: "Engineering",
    email: "john.doe@example.com",
    utilization: 85,
    currentProject: "Website Redesign",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
  },
  {
    id: "emp-2",
    name: "Jane Smith",
    role: "UX Designer",
    department: "Design",
    email: "jane.smith@example.com",
    utilization: 75,
    currentProject: "Mobile App Development",
    skills: ["UI Design", "User Research", "Figma", "Sketch"],
  },
  {
    id: "emp-3",
    name: "Michael Johnson",
    role: "Project Manager",
    department: "Operations",
    email: "michael.johnson@example.com",
    utilization: 90,
    currentProject: "Cloud Migration",
    skills: ["Agile", "Scrum", "JIRA", "Risk Management"],
  },
  {
    id: "emp-4",
    name: "Sarah Williams",
    role: "Backend Developer",
    department: "Engineering",
    email: "sarah.williams@example.com",
    utilization: 70,
    currentProject: "E-commerce Platform",
    skills: ["Java", "Spring", "MySQL", "Docker"],
  },
  {
    id: "emp-5",
    name: "Robert Brown",
    role: "DevOps Engineer",
    department: "Infrastructure",
    email: "robert.brown@example.com",
    utilization: 65,
    currentProject: "Security Audit",
    skills: ["AWS", "Kubernetes", "Jenkins", "Terraform"],
  },
  {
    id: "emp-6",
    name: "Emily Davis",
    role: "QA Engineer",
    department: "Quality Assurance",
    email: "emily.davis@example.com",
    utilization: 80,
    currentProject: "CRM Implementation",
    skills: ["Selenium", "Jest", "Cypress", "Manual Testing"],
  },
];

const departmentData = [
  { name: "Engineering", value: 18, department: "engineering" },
  { name: "Design", value: 8, department: "design" },
  { name: "Operations", value: 6, department: "operations" },
  { name: "Infrastructure", value: 5, department: "infrastructure" },
  { name: "Quality Assurance", value: 5, department: "qa" },
];

const utilizationData = [
  { name: "Billable", value: 75, category: "billable" },
  { name: "Non-Billable", value: 15, category: "nonBillable" },
  { name: "PTO/Training", value: 10, category: "pto" },
];

const departmentConfig = {
  engineering: {
    label: "Engineering",
    theme: {
      light: "#0088FE",
      dark: "#0088FE"
    }
  },
  design: {
    label: "Design",
    theme: {
      light: "#00C49F",
      dark: "#00C49F"
    }
  },
  operations: {
    label: "Operations",
    theme: {
      light: "#FFBB28",
      dark: "#FFBB28"
    }
  },
  infrastructure: {
    label: "Infrastructure",
    theme: {
      light: "#FF8042",
      dark: "#FF8042"
    }
  },
  qa: {
    label: "Quality Assurance",
    theme: {
      light: "#8884d8",
      dark: "#8884d8"
    }
  }
};

const utilizationConfig = {
  billable: {
    label: "Billable",
    theme: {
      light: "#00C49F",
      dark: "#00C49F"
    }
  },
  nonBillable: {
    label: "Non-Billable",
    theme: {
      light: "#FFBB28",
      dark: "#FFBB28"
    }
  },
  pto: {
    label: "PTO/Training",
    theme: {
      light: "#FF8042",
      dark: "#FF8042"
    }
  }
};

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Employee Management</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search employees..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
              <Button>
                <Plus size={18} className="mr-2" />
                Add Employee
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ChartContainer config={departmentConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        dataKey="value"
                        nameKey="department"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`var(--color-${entry.department})`} 
                          />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent 
                            formatter={(value: number, name: string) => [`${value} employees`, name]}
                            nameKey="department"
                          />
                        } 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Employee Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ChartContainer config={utilizationConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={utilizationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        dataKey="value"
                        nameKey="category"
                      >
                        {utilizationData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`var(--color-${entry.category})`} 
                          />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent 
                            formatter={(value: number) => [`${value}%`, undefined]}
                            nameKey="category"
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
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Employees</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEmployees.map((employee) => (
                <EmployeeCard key={employee.id} {...employee} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="engineering" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEmployees
                .filter((employee) => employee.department === "Engineering")
                .map((employee) => (
                  <EmployeeCard key={employee.id} {...employee} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="design" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEmployees
                .filter((employee) => employee.department === "Design")
                .map((employee) => (
                  <EmployeeCard key={employee.id} {...employee} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="operations" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEmployees
                .filter((employee) => employee.department === "Operations")
                .map((employee) => (
                  <EmployeeCard key={employee.id} {...employee} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
