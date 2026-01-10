import { memo, useMemo } from "react";
import { Sprint } from "@/services/api/types";
import { SprintCard } from "./SprintCard";
import { SPRINT_STATUS_CONFIG } from "../constants/sprintConfig";

/* ======================================================
   🔹 INTERFACE
====================================================== */

interface SprintBoardProps {
  sprints: Sprint[];
  onSprintClick: (sprint: Sprint) => void;
  onEdit?: (sprint: Sprint) => void;
  onDelete?: (sprint: Sprint) => void;
}

/* ======================================================
   🔹 COMPONENT
====================================================== */

export const SprintBoard = memo<SprintBoardProps>(
  ({ sprints, onSprintClick, onEdit, onDelete }) => {
    const sprintsByStatus = useMemo(() => {
      const grouped: Record<string, Sprint[]> = {
        todo: [],
        in_progress: [],
        completed: [],
        cancelled: [],
        transferred: [],
      };

      sprints.forEach((sprint) => {
        const status = sprint.status;
        if (grouped[status]) {
          grouped[status].push(sprint);
        }
      });

      return grouped;
    }, [sprints]);

    const statuses: Array<{ key: string; config: typeof SPRINT_STATUS_CONFIG[keyof typeof SPRINT_STATUS_CONFIG] }> = [
      { key: "todo", config: SPRINT_STATUS_CONFIG.todo },
      { key: "in_progress", config: SPRINT_STATUS_CONFIG.in_progress },
      { key: "completed", config: SPRINT_STATUS_CONFIG.completed },
      { key: "cancelled", config: SPRINT_STATUS_CONFIG.cancelled },
      { key: "transferred", config: SPRINT_STATUS_CONFIG.transferred },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statuses.map(({ key, config }) => {
          const columnSprints = sprintsByStatus[key] || [];
          return (
            <div key={key} className="flex flex-col">
              {/* Column Header */}
              <div
                className={`
                  ${config.bgColor} ${config.borderColor}
                  border-2 rounded-t-lg p-3 mb-2
                `}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold ${config.textColor}`}>
                    {config.label}
                  </h3>
                  <span
                    className={`
                      ${config.badgeColor}
                      px-2 py-0.5 rounded-full text-xs font-medium
                    `}
                  >
                    {columnSprints.length}
                  </span>
                </div>
              </div>

              {/* Sprint Cards */}
              <div className="flex-1 space-y-3 min-h-[200px]">
                {columnSprints.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm py-8">
                    No sprints
                  </div>
                ) : (
                  columnSprints.map((sprint) => (
                    <SprintCard
                      key={sprint.id}
                      sprint={sprint}
                      onClick={() => onSprintClick(sprint)}
                      onEdit={onEdit ? () => onEdit(sprint) : undefined}
                      onDelete={onDelete ? () => onDelete(sprint) : undefined}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

SprintBoard.displayName = "SprintBoard";

