import { memo, useState, useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Sprint, CreateSprintRequest, UpdateSprintRequest, Project, SprintStatus } from "@/services/api/types";
import { projectApi } from "@/services/api/projectApi";

/* ======================================================
   🔹 INTERFACE
====================================================== */

interface SprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSprintRequest | UpdateSprintRequest) => Promise<void>;
  sprint?: Sprint | null;
  projects?: Project[];
}

/* ======================================================
   🔹 COMPONENT
====================================================== */

export const SprintModal = memo<SprintModalProps>(
  ({ isOpen, onClose, onSubmit, sprint, projects: propsProjects }) => {
    const isEditMode = !!sprint;
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState<Project[]>(propsProjects || []);
    const [formData, setFormData] = useState({
      name: "",
      project_id: 0,
      start_date: "",
      end_date: "",
      status: "todo" as SprintStatus,
    });

    useEffect(() => {
      if (isOpen) {
        if (propsProjects && propsProjects.length > 0) {
          setProjects(propsProjects);
        } else {
          const fetchProjects = async () => {
            try {
              const data = await projectApi.getProjects();
              setProjects(data);
            } catch (error) {
              console.error("Failed to fetch projects:", error);
            }
          };
          fetchProjects();
        }

        if (sprint) {
          setFormData({
            name: sprint.name,
            project_id: sprint.project_id,
            start_date: sprint.start_date || "",
            end_date: sprint.end_date || "",
            status: sprint.status,
          });
        } else {
          setFormData({
            name: "",
            project_id: 0,
            start_date: "",
            end_date: "",
            status: "todo",
          });
        }
      }
    }, [isOpen, sprint, propsProjects]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name.trim() || formData.project_id === 0) {
        return;
      }

      setLoading(true);
      try {
        const payload = {
          name: formData.name.trim(),
          project_id: formData.project_id,
          start_date: formData.start_date || null,
          end_date: formData.end_date || null,
          status: formData.status,
        };

        await onSubmit(payload);
        onClose();
      } catch (error) {
        console.error("Failed to submit sprint:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {isEditMode ? "Edit Sprint" : "Create Sprint"}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Sprint Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sprint Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Sprint 1 - Q1 2024"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Project */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.project_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          project_id: Number(e.target.value),
                        })
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={0}>Select a project</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) =>
                        setFormData({ ...formData, start_date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) =>
                        setFormData({ ...formData, end_date: e.target.value })
                      }
                      min={formData.start_date || undefined}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as SprintStatus,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="transferred">Transferred</option>
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !formData.name.trim() || formData.project_id === 0}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

SprintModal.displayName = "SprintModal";

