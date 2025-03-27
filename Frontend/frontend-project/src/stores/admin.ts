import { defineStore } from 'pinia';
import axios from 'axios';
import type { Admin, Advisor } from '@/type';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    admins: [] as Admin[], // State to store all admins
    advisors: [] as Advisor[], // State to store all advisors
    admin: null as Admin | null, // State to store a single admin
    advisor: null as Advisor | null, // State to store a single advisor
  }),
  actions: {
    // Fetch all admins
    async fetchAdmins() {
      try {
        const token = localStorage.getItem('authToken'); // Ensure the correct key is used
        if (!token) {
          console.error('No token found. Please log in.');
          return; // Exit the function if no token is found
        }

        const response = await axios.get('http://localhost:3000/admin/admins', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.admins = response.data;
      } catch (error) {
        console.error('Error fetching admins:', error);
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Please check your token or log in again.');
        }
      }
    },

    // Create a new admin
    async createAdmin(data: { username: string; password: string }) {
      try {
        const response = await axios.post('http://localhost:3000/admin/create-admin', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.admins.push(response.data); // Add the new admin to the state
        this.admin = response.data; // Set the newly created admin as the current admin
      } catch (error) {
        console.error('Error creating admin:', error);
      }
    },

    // Fetch a single admin by ID
    async fetchAdminById(id: number) {
      try {
        const response = await axios.get(`http://localhost:3000/admin/admins/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.admin = response.data;
      } catch (error) {
        console.error('Error fetching admin by ID:', error);
      }
    },

    // Delete an admin by ID
    async deleteAdmin(id: number) {
      try {
        await axios.delete(`http://localhost:3000/admin/admins/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.admins = this.admins.filter((admin) => admin.id !== id); // Remove the admin from the state
      } catch (error) {
        console.error('Error deleting admin:', error);
      }
    },

    // Create a new advisor
    async createAdvisor(data: { username: string; password: string; firstName: string; lastName: string; department: string; position: string }) {
      try {
        const response = await axios.post('http://localhost:3000/admin/create-advisor', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.advisors.push(response.data); // Add the new advisor to the state
        this.advisor = response.data; // Set the newly created advisor as the current advisor
      } catch (error) {
        console.error('Error creating advisor:', error);
      }
    },

    // Fetch all advisors
    async fetchAdvisors() {
      try {
        const response = await axios.get('http://localhost:3000/admin/advisors', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.advisors = response.data;
      } catch (error) {
        console.error('Error fetching advisors:', error);
      }
    },

    // Update an advisor by ID
    async updateAdvisor(id: number, data: Partial<{ username: string; password: string; firstName: string; lastName: string; department: string; position: string }>) {
      try {
        const response = await axios.put(`http://localhost:3000/admin/advisors/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const index = this.advisors.findIndex((advisor) => advisor.id === id);
        if (index !== -1) {
          this.advisors[index] = response.data; // Update the advisor in the state
        }
      } catch (error) {
        console.error('Error updating advisor:', error);
      }
    },

    // Delete an advisor by ID
    async deleteAdvisor(id: number) {
      try {
        await axios.delete(`http://localhost:3000/admin/advisors/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.advisors = this.advisors.filter((advisor) => advisor.id !== id); // Remove the advisor from the state
      } catch (error) {
        console.error('Error deleting advisor:', error);
      }
    },
  },
});