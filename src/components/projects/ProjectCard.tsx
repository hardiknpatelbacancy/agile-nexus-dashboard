
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { StatusBadge, ProjectStatus } from "../dashboard/StatusCard";
import { cn } from "@/lib/utils";
import { CalendarDays, Users } from "lucide-react";

export interface ProjectCardProps {
  id: string;
  name: string;
  client: string;
  progress: number;
  status: ProjectStatus;
  dueDate: string;
  teamSize: number;
  budget?: {
    current: number;
    total: number;
  };
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  client,
  progress,
  status,
  dueDate,
  teamSize,
  budget,
  className,
}) => {
  return (
    <Card className={cn("p-5 hover:shadow-md transition-shadow", className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{client}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      
      <div className="mt-4 space-y-2">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex justify-between pt-2">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <CalendarDays className="w-4 h-4" />
            <span>Due {dueDate}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{teamSize} members</span>
          </div>
        </div>
        
        {budget && (
          <div className="pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Budget</span>
              <span className="font-medium">
                ${budget.current.toLocaleString()} / ${budget.total.toLocaleString()}
              </span>
            </div>
            <Progress 
              value={(budget.current / budget.total) * 100} 
              className="h-1.5 mt-1.5" 
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;
