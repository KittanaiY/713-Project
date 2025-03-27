import { defineStore } from 'pinia';
import axios from 'axios';
import type { Advisor } from '@/type';

export const useAdvisorStore = defineStore('advisor', {
  state: () => ({
    advisors: [] as Advisor[], // State to store all advisors
    advisor: null as Advisor | null, // State to store a single advisor
  }),
  actions: {
    // Fetch all advisors
    async fetchAdvisors() {
      try {
        const response = await axios.get('http://localhost:3000/admin/advisors', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.advisors = response.data;
      } catch (error) {
        console.error('Error fetching advisors:', error);
      }
    },

    // Fetch a single advisor by ID
    async fetchAdvisorById(id: number) {
      try {
        const response = await axios.get(`http://localhost:3000/advisors/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.advisor = response.data;
      } catch (error) {
        console.error('Error fetching advisor by ID:', error);
      }
    },

    // Create a new advisor
    async createAdvisor(data: {
      username: string;
      password: string;
      firstName: string;
      lastName: string;
      department: string;
      position: string;
    }) {
      try {
        const response = await axios.post('http://localhost:3000/advisors/create-advisor', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.advisors.push(response.data); // Add the new advisor to the state
        this.advisor = response.data; // Set the newly created advisor as the current advisor
      } catch (error) {
        console.error('Error creating advisor:', error);
      }
    },

    // Update an advisor
    async updateAdvisor(id: number, data: Partial<Advisor>) {
      try {
        const response = await axios.put(`http://localhost:3000/advisors/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        // Update the advisor in the state
        const index = this.advisors.findIndex((advisor) => advisor.id === id);
        if (index !== -1) {
          this.advisors[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating advisor:', error);
      }
    },

    // Delete an advisor
    async deleteAdvisor(id: number) {
      try {
        await axios.delete(`http://localhost:3000/advisors/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        // Remove the advisor from the state
        this.advisors = this.advisors.filter((advisor) => advisor.id !== id);
      } catch (error) {
        console.error('Error deleting advisor:', error);
      }
    },
  },
});