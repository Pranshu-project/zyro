import { memo } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, CheckCircle2, AlertCircle, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { Sprint } from "@/services/api/types";
import { getStatusConfig, formatDateRange, getDaysRemaining, getSprintProgress } from "../constants/sprintConfig";
import { useState } from "react";

/* ======================================================
   🔹 INTERFACE
====================================================== */

interface SprintCardProps {
  sprint: Sprint;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

/* ======================================================
   🔹 COMPONENT
====================================================== */

export const SprintCard = memo<SprintCardProps>(({ sprint, onClick, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const statusConfig = getStatusConfig(sprint.status);
  const issues = sprint.issues || [];
  const totalIssues = issues.length;
  const completedIssues = issues.filter((i) => i.status === "completed").length;
  const progress = getSprintProgress(totalIssues, completedIssues);
  const daysRemaining = getDaysRemaining(sprint.end_date);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    onEdit?.();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    onDelete?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`
        cursor-pointer
        bg-white rounded-lg border-2 ${statusConfig.borderColor}
        p-4 shadow-sm hover:shadow-md
        transition-all duration-200
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate mb-1">
            {sprint.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            {sprint.project?.name || `Project ${sprint.project_id}`}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-2">
          <span
            className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${statusConfig.badgeColor}
              whitespace-nowrap
            `}
          >
            {statusConfig.label}
          </span>
          {(onEdit || onDelete) && (
            <div className="relative">
              <button
                onClick={handleMenuClick}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                onBlur={() => setTimeout(() => setShowMenu(false), 200)}
              >
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
                  {onEdit && (
                    <button
                      onClick={handleEditClick}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={handleDeleteClick}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dates */}
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <Calendar className="w-4 h-4 mr-1.5" />
        <span>{formatDateRange(sprint.start_date, sprint.end_date)}</span>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-gray-600">
          <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
          <span>{completedIssues}/{totalIssues}</span>
        </div>
        {daysRemaining !== null && (
          <div className="flex items-center">
            {daysRemaining < 0 ? (
              <>
                <AlertCircle className="w-4 h-4 mr-1 text-red-500" />
                <span className="text-red-600 font-medium">
                  {Math.abs(daysRemaining)} days overdue
                </span>
              </>
            ) : daysRemaining === 0 ? (
              <span className="text-orange-600 font-medium">Ends today</span>
            ) : (
              <span className="text-gray-600">
                {daysRemaining} days left
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
});

SprintCard.displayName = "SprintCard";

