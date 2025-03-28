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
        if (axios.isAxiosError(error)) {
          // Handle Axios-specific errors
          console.error('Error fetching admins:', error.message);
          if (error.response && error.response.status === 401) {
            console.error('Unauthorized: Please check your token or log in again.');
          }
        } else {
          // Handle generic errors
          console.error('An unexpected error occurred:', error);
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
        if (axios.isAxiosError(error)) {
          console.error('Error creating admin:', error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
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
        if (axios.isAxiosError(error)) {
          console.error('Error fetching admin by ID:', error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
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
        if (axios.isAxiosError(error)) {
          console.error('Error deleting admin:', error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    },
  },
});