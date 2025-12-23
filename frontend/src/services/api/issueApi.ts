// Using mock data instead of actual API calls

// Mock data for issues
const mockIssues = [
  {
    id: 1,
    name: "Fix Login Page Error",
    status: "in_progress",
    priority: "high",
    description: "Users are unable to login with valid credentials. Error occurs after password validation.",
    type: "bug",
    sprint_id: 1,
    assigned_to: 1,
    assigned_by: 2,
    created_at: "2023-02-20T10:30:00Z",
    updated_at: "2023-02-21T14:45:00Z"
  },
  {
    id: 2,
    name: "Add Dark Mode Feature",
    status: "todo",
    priority: "medium",
    description: "Implement dark mode toggle in user preferences section.",
    type: "feature",
    sprint_id: 2,
    assigned_to: null,
    assigned_by: 2,
    created_at: "2023-02-19T09:15:00Z",
    updated_at: "2023-02-19T09:15:00Z"
  },
  {
    id: 3,
    name: "Update Documentation",
    status: "completed",
    priority: "low",
    description: "Update API documentation with new endpoints and parameters.",
    type: "task",
    sprint_id: 1,
    assigned_to: 3,
    assigned_by: 2,
    created_at: "2023-02-18T13:20:00Z",
    updated_at: "2023-02-20T16:00:00Z"
  },
  {
    id: 4,
    name: "Database Performance Issue",
    status: "hold",
    priority: "high",
    description: "Slow query response times affecting user experience. Requires investigation.",
    type: "bug",
    sprint_id: 3,
    assigned_to: 4,
    assigned_by: 2,
    created_at: "2023-02-17T14:30:00Z",
    updated_at: "2023-02-19T10:15:00Z"
  },
  {
    id: 5,
    name: "Mobile Responsive Issues",
    status: "in_progress",
    priority: "medium",
    description: "Layout breaks on mobile devices below 768px width.",
    type: "bug",
    sprint_id: 2,
    assigned_to: 5,
    assigned_by: 2,
    created_at: "2023-02-21T08:45:00Z",
    updated_at: "2023-02-22T11:30:00Z"
  },
  {
    id: 6,
    name: "Implement Payment Gateway",
    status: "todo",
    priority: "high",
    description: "Integrate Stripe payment processing for subscription plans.",
    type: "feature",
    sprint_id: 4,
    assigned_to: null,
    assigned_by: 2,
    created_at: "2023-02-20T12:00:00Z",
    updated_at: "2023-02-20T12:00:00Z"
  },
];

// Issue API functions
export const issueApi = {
  // GET all issues
  getIssues: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockIssues;
    } catch (error) {
      console.error('Error fetching issues:', error);
      throw error;
    }
  },

  // GET issue by ID
  getIssueById: async (id: number) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const issue = mockIssues.find(i => i.id === id);
      if (!issue) {
        throw new Error(`Issue with id ${id} not found`);
      }
      return issue;
    } catch (error) {
      console.error(`Error fetching issue with id ${id}:`, error);
      throw error;
    }
  },

  // POST create issue
  createIssue: async (issueData: any) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const newIssue = {
        id: mockIssues.length + 1,
        ...issueData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockIssues.push(newIssue);
      return newIssue;
    } catch (error) {
      console.error('Error creating issue:', error);
      throw error;
    }
  },

  // PUT update issue
  updateIssue: async (id: number, issueData: any) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const issueIndex = mockIssues.findIndex(i => i.id === id);
      if (issueIndex === -1) {
        throw new Error(`Issue with id ${id} not found`);
      }
      const updatedIssue = {
        ...mockIssues[issueIndex],
        ...issueData,
        updated_at: new Date().toISOString()
      };
      mockIssues[issueIndex] = updatedIssue;
      return updatedIssue;
    } catch (error) {
      console.error(`Error updating issue with id ${id}:`, error);
      throw error;
    }
  },

  // DELETE issue
  deleteIssue: async (id: number) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const issueIndex = mockIssues.findIndex(i => i.id === id);
      if (issueIndex === -1) {
        throw new Error(`Issue with id ${id} not found`);
      }
      const deletedIssue = mockIssues[issueIndex];
      mockIssues.splice(issueIndex, 1);
      return deletedIssue;
    } catch (error) {
      console.error(`Error deleting issue with id ${id}:`, error);
      throw error;
    }
  },

  // GET issues by status
  getIssuesByStatus: async (status: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const filteredIssues = mockIssues.filter(i => i.status.toLowerCase() === status.toLowerCase());
      return filteredIssues;
    } catch (error) {
      console.error(`Error fetching issues with status ${status}:`, error);
      throw error;
    }
  },

  // GET issues by priority
  getIssuesByPriority: async (priority: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const filteredIssues = mockIssues.filter(i => i.priority.toLowerCase() === priority.toLowerCase());
      return filteredIssues;
    } catch (error) {
      console.error(`Error fetching issues with priority ${priority}:`, error);
      throw error;
    }
  },

  // GET issues by project
  getIssuesByProject: async (projectId: number) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // For mock data, we'll filter by sprint_id which relates to projects
      const filteredIssues = mockIssues.filter(i => i.sprint_id === projectId);
      return filteredIssues;
    } catch (error) {
      console.error(`Error fetching issues for project ${projectId}:`, error);
      throw error;
    }
  },
};