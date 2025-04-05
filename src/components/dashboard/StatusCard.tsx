
import React from "react";
import { cn } from "@/lib/utils";

export type ProjectStatus = "on-track" | "delayed" | "at-risk" | "completed";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig = {
    "on-track": {
      label: "On Track",
      className: "bg-green-100 text-green-800",
    },
    "delayed": {
      label: "Delayed",
      className: "bg-amber-100 text-amber-800",
    },
    "at-risk": {
      label: "At Risk",
      className: "bg-red-100 text-red-800",
    },
    "completed": {
      label: "Completed",
      className: "bg-blue-100 text-blue-800",
    },
  };

  const { label, className: statusClassName } = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusClassName,
        className
      )}
    >
      {label}
    </span>
  );
};

interface StatusCardProps {
  title: string;
  count: number;
  status: ProjectStatus;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  count,
  status,
  className,
}) => {
  const statusColorMap = {
    "on-track": "border-l-green-500",
    "delayed": "border-l-amber-500",
    "at-risk": "border-l-red-500",
    "completed": "border-l-blue-500",
  };

  return (
    <div className={cn(
      "bg-white rounded-md border shadow-sm border-l-4 p-4",
      statusColorMap[status],
      className
    )}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <StatusBadge status={status} />
      </div>
      <p className="text-2xl font-bold mt-2">{count}</p>
    </div>
  );
};

export default StatusCard;
