// Using mock data instead of actual API calls

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    status: "active",
    description: "Complete redesign of the company website with modern UI/UX.",
    created_by: "Admin",
    start_date: "2023-01-15",
    end_date: "2023-04-15",
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2023-02-20T14:45:00Z"
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "in progress",
    description: "Building a cross-platform mobile application for iOS and Android.",
    created_by: "Manager",
    start_date: "2023-02-01",
    end_date: "2023-06-01",
    created_at: "2023-02-01T09:15:00Z",
    updated_at: "2023-02-22T11:30:00Z"
  },
  {
    id: 3,
    name: "Database Migration",
    status: "completed",
    description: "Migrating legacy database to new cloud infrastructure.",
    created_by: "Admin",
    start_date: "2022-11-01",
    end_date: "2022-12-15",
    created_at: "2022-11-01T13:20:00Z",
    updated_at: "2022-12-15T16:00:00Z"
  },
  {
    id: 4,
    name: "API Integration",
    status: "upcoming",
    description: "Integrating third-party services with our existing platform.",
    created_by: "Manager",
    start_date: "2023-03-01",
    end_date: "2023-05-01",
    created_at: "2023-02-20T08:45:00Z",
    updated_at: "2023-02-20T08:45:00Z"
  },
  {
    id: 5,
    name: "Security Audit",
    status: "delayed",
    description: "Comprehensive security audit of all systems and applications.",
    created_by: "Admin",
    start_date: "2023-01-01",
    end_date: "2023-02-01",
    created_at: "2022-12-15T14:30:00Z",
    updated_at: "2023-01-20T10:15:00Z"
  },
];

// Project API functions
export const projectApi = {
  // GET all projects
  getProjects: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockProjects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // GET project by ID
  getProjectById: async (id: number) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const project = mockProjects.find(p => p.id === id);
      if (!project) {
        throw new Error(`Project with id ${id} not found`);
      }
      return project;
    } catch (error) {
      console.error(`Error fetching project with id ${id}:`, error);
      throw error;
    }
  },

  // POST create project
  createProject: async (projectData: any) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const newProject = {
        id: mockProjects.length + 1,
        ...projectData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockProjects.push(newProject);
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // PUT update project
  updateProject: async (id: number, projectData: any) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const projectIndex = mockProjects.findIndex(p => p.id === id);
      if (projectIndex === -1) {
        throw new Error(`Project with id ${id} not found`);
      }
      const updatedProject = {
        ...mockProjects[projectIndex],
        ...projectData,
        updated_at: new Date().toISOString()
      };
      mockProjects[projectIndex] = updatedProject;
      return updatedProject;
    } catch (error) {
      console.error(`Error updating project with id ${id}:`, error);
      throw error;
    }
  },

  // DELETE project
  deleteProject: async (id: number) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const projectIndex = mockProjects.findIndex(p => p.id === id);
      if (projectIndex === -1) {
        throw new Error(`Project with id ${id} not found`);
      }
      const deletedProject = mockProjects[projectIndex];
      mockProjects.splice(projectIndex, 1);
      return deletedProject;
    } catch (error) {
      console.error(`Error deleting project with id ${id}:`, error);
      throw error;
    }
  },

  // GET projects by status
  getProjectsByStatus: async (status: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const filteredProjects = mockProjects.filter(p => p.status.toLowerCase() === status.toLowerCase());
      return filteredProjects;
    } catch (error) {
      console.error(`Error fetching projects with status ${status}:`, error);
      throw error;
    }
  },
};