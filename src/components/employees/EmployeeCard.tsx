
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface EmployeeCardProps {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  department: string;
  email: string;
  utilization: number;
  currentProject?: string;
  skills?: string[];
  className?: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  id,
  name,
  role,
  avatarUrl,
  department,
  email,
  utilization,
  currentProject,
  skills,
  className,
}) => {
  // Generate initials if no avatar URL provided
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const utilizationColor = 
    utilization >= 80 ? "bg-green-500" :
    utilization >= 60 ? "bg-blue-500" :
    "bg-amber-500";

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex flex-col md:flex-row">
        {/* Avatar/Info Section */}
        <div className="p-5 flex flex-col items-center md:items-start">
          <div className="flex flex-col items-center text-center md:text-left gap-3 md:flex-row">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-16 h-16 rounded-full object-cover mb-2 md:mb-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-nexus-blue-100 flex items-center justify-center text-nexus-blue-600 font-semibold text-xl">
                {initials}
              </div>
            )}
            <div>
              <h3 className="text-lg font-medium">{name}</h3>
              <p className="text-sm text-gray-500">{role}</p>
              <p className="text-xs text-gray-500">{department}</p>
            </div>
          </div>
          
          <div className="w-full mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Utilization</span>
              <span className="text-xs font-medium">{utilization}%</span>
            </div>
            <Progress 
              value={utilization} 
              className="h-1.5" 
              indicatorClassName={utilizationColor}
            />
          </div>
          
          {currentProject && (
            <div className="mt-3 text-sm">
              <span className="font-medium">Current Project:</span> {currentProject}
            </div>
          )}
          
          {skills && skills.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    +{skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCard;
