// Using mock data instead of actual API calls

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    created_at: "2023-01-01T10:00:00Z",
    updated_at: "2023-01-01T10:00:00Z"
  },
  {
    id: 2,
    name: "Manager User",
    email: "manager@example.com",
    role: "manager",
    status: "active",
    created_at: "2023-01-02T10:00:00Z",
    updated_at: "2023-01-02T10:00:00Z"
  },
  {
    id: 3,
    name: "Employee User",
    email: "employee@example.com",
    role: "employee",
    status: "active",
    created_at: "2023-01-03T10:00:00Z",
    updated_at: "2023-01-03T10:00:00Z"
  },
];

// User API functions
export const userApi = {
  // GET current user profile
  getCurrentUser: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Return first user as mock current user
      return mockUsers[0];
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  // GET all users
  getUsers: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockUsers;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // GET user by ID
  getUserById: async (id: number) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = mockUsers.find(u => u.id === id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  // PUT update user profile
  updateUser: async (id: number, userData: any) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error(`User with id ${id} not found`);
      }
      const updatedUser = {
        ...mockUsers[userIndex],
        ...userData,
        updated_at: new Date().toISOString()
      };
      mockUsers[userIndex] = updatedUser;
      return updatedUser;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  // POST login
  login: async (credentials: { email: string; password: string }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Simple mock authentication
      const user = mockUsers.find(u => u.email === credentials.email);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      // In a real app, we would verify the password
      const mockToken = `mock_token_${user.id}`;
      localStorage.setItem('access_token', mockToken);
      return {
        status: "success",
        message: "Login successful",
        data: {
          access_token: mockToken,
          refresh_token: `mock_refresh_${user.id}`,
          user_data: user
        }
      };
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  // POST register
  register: async (userData: { email: string; password: string; name: string }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      // Create new user
      const newUser = {
        id: mockUsers.length + 1,
        name: userData.name,
        email: userData.email,
        role: "employee",
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockUsers.push(newUser);
      const mockToken = `mock_token_${newUser.id}`;
      localStorage.setItem('access_token', mockToken);
      return {
        status: "success",
        message: "Registration successful",
        data: {
          access_token: mockToken,
          refresh_token: `mock_refresh_${newUser.id}`,
          user_data: newUser
        }
      };
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },

  // POST logout
  logout: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Clear token
      localStorage.removeItem('access_token');
      return { success: true, message: "Logged out successfully" };
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },

  // POST refresh token
  refreshToken: async (refreshToken: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Mock token refresh
      const newToken = `mock_token_refreshed_${Date.now()}`;
      localStorage.setItem('access_token', newToken);
      return {
        access_token: newToken,
        refresh_token: refreshToken
      };
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  },
};