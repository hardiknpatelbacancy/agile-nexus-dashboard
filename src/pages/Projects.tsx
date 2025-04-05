
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusCard";
import { Progress } from "@/components/ui/progress";

// Mock data
const projects = [
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
  {
    id: "proj-4",
    name: "E-commerce Platform",
    client: "ShopEasy",
    progress: 60,
    status: "on-track" as const,
    dueDate: "September 22",
    teamSize: 7,
    budget: { current: 35000, total: 75000 },
  },
  {
    id: "proj-5",
    name: "CRM Implementation",
    client: "SalesPro",
    progress: 90,
    status: "on-track" as const,
    dueDate: "June 5",
    teamSize: 4,
    budget: { current: 18000, total: 20000 },
  },
  {
    id: "proj-6",
    name: "Security Audit",
    client: "BankSecure",
    progress: 100,
    status: "completed" as const,
    dueDate: "March 30",
    teamSize: 3,
    budget: { current: 10000, total: 10000 },
  },
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Projects</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search projects..."
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
                New Project
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects
                .filter((project) => project.status !== "completed")
                .map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects
                .filter((project) => project.status === "completed")
                .map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {filteredProjects.slice(0, 3).map((project) => (
                <div key={`timeline-${project.id}`} className="flex flex-col">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="font-medium">{project.name}</span>
                      <span className="text-gray-500 text-sm ml-2">({project.client})</span>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>
                  <div className="w-full bg-gray-100 h-8 rounded-md relative">
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-nexus-blue-500 rounded-md"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-between px-3">
                      <span className="text-xs font-medium text-white">Start</span>
                      <span className="text-xs font-medium">Due: {project.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
