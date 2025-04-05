
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface EmployeeCardProps {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  utilization: number;
  currentProject: string;
  skills: string[];
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name,
  role,
  department,
  email,
  utilization,
  currentProject,
  skills,
}) => {
  // Determine utilization color
  const getUtilizationColor = (value: number) => {
    if (value < 60) return "text-amber-500";
    if (value < 80) return "text-blue-500";
    return "text-green-500";
  };

  const getProgressColor = (value: number) => {
    if (value < 60) return "bg-amber-500";
    if (value < 80) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
              {department}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{role}</p>
          <div className="mt-2 text-xs text-gray-500">{email}</div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Utilization</span>
              <span className={`text-xs font-medium ${getUtilizationColor(utilization)}`}>
                {utilization}%
              </span>
            </div>
            <div className="relative h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <Progress value={utilization} className="h-full" />
            </div>
          </div>

          <div className="mb-4">
            <span className="text-xs font-medium block mb-1">Current Project</span>
            <span className="text-sm">{currentProject}</span>
          </div>

          <div>
            <span className="text-xs font-medium block mb-2">Skills</span>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
