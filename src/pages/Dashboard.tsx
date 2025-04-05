
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Activity, Briefcase, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import StatusCard from "@/components/dashboard/StatusCard";
import ProjectCard from "@/components/projects/ProjectCard";
import RevenueChart from "@/components/finance/RevenueChart";

// Mock data for the dashboard
const projectStats = [
  { name: "On Track", value: 12 },
  { name: "Delayed", value: 5 },
  { name: "At Risk", value: 2 },
  { name: "Completed", value: 34 },
];

const revenueData = [
  { name: "Jan", revenue: 60000, expenses: 40000, profit: 20000 },
  { name: "Feb", revenue: 50000, expenses: 35000, profit: 15000 },
  { name: "Mar", revenue: 70000, expenses: 45000, profit: 25000 },
  { name: "Apr", revenue: 80000, expenses: 50000, profit: 30000 },
  { name: "May", revenue: 90000, expenses: 55000, profit: 35000 },
  { name: "Jun", revenue: 100000, expenses: 60000, profit: 40000 },
];

const recentProjects = [
  {
    id: "proj-1",
    name: "Website Redesign",
    client: "TechCorp Inc.",
    progress: 75,
    status: "on-track" as const,
    dueDate: "June 15",
    teamSize: 5,
    budget: { current: 15000, total: 20000 },
  },
  {
    id: "proj-2",
    name: "Mobile App Development",
    client: "InnovateCo",
    progress: 45,
    status: "delayed" as const,
    dueDate: "July 30",
    teamSize: 8,
    budget: { current: 40000, total: 60000 },
  },
  {
    id: "proj-3",
    name: "Cloud Migration",
    client: "DataSecure",
    progress: 20,
    status: "at-risk" as const,
    dueDate: "August 10",
    teamSize: 6,
    budget: { current: 30000, total: 45000 },
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, John</h1>
            <p className="text-gray-500">Here's what's happening today</p>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Active Projects" 
            value={19} 
            icon={Briefcase} 
            trend={{ value: 12, isPositive: true }} 
            iconClassName="bg-nexus-blue-500"
          />
          <StatCard 
            title="Total Revenue" 
            value="$421,500" 
            icon={DollarSign} 
            trend={{ value: 8, isPositive: true }} 
            iconClassName="bg-green-500"
          />
          <StatCard 
            title="Team Members" 
            value={42} 
            icon={Users} 
            description="+3 this month" 
            iconClassName="bg-amber-500"
          />
          <StatCard 
            title="Billable Hours" 
            value="1,280" 
            icon={Activity} 
            trend={{ value: 5, isPositive: false }} 
            iconClassName="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Status Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <StatusCard title="On Track Projects" count={12} status="on-track" />
                <StatusCard title="Delayed Projects" count={5} status="delayed" />
                <StatusCard title="At Risk Projects" count={2} status="at-risk" />
                <StatusCard title="Completed Projects" count={34} status="completed" />
              </div>

              <div className="mt-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectStats}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2673ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData} />
          </div>
        </div>

        {/* Recent Projects and Activity Section */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList>
            <TabsTrigger value="projects">Recent Projects</TabsTrigger>
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {recentProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <p className="font-medium">Website Redesign milestone completed</p>
                      <p className="text-sm text-gray-500">Today at 9:30 AM</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div>
                      <p className="font-medium">New team member Jane Smith added</p>
                      <p className="text-sm text-gray-500">Yesterday at 5:12 PM</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
                    <div>
                      <p className="font-medium">Project budget updated for Cloud Migration</p>
                      <p className="text-sm text-gray-500">Yesterday at 3:45 PM</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                    <div>
                      <p className="font-medium">Client meeting scheduled with InnovateCo</p>
                      <p className="text-sm text-gray-500">April 3 at 2:00 PM</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                    <div>
                      <p className="font-medium">Risk alert: Mobile App Development behind schedule</p>
                      <p className="text-sm text-gray-500">April 2 at 11:23 AM</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
