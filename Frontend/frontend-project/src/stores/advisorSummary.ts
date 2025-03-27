import { defineStore } from 'pinia';
import axios from 'axios';

interface Appointment {
  id: number;
  subject: string;
  requestedDate: string;
  confirmedDate: string;
  status: string;
  studentId: number;
}

interface Advisor {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  studentCount: number;
  appointments: Appointment[];
}

export const useAdvisorSummaryStore = defineStore('advisorSummary', {
  state: () => ({
    advisors: [] as Advisor[], // Store advisors' summary data
    totalAdvisors: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
  }),
  actions: {
    async fetchAdvisorsSummary(page = 1, pageSize = 10) {
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:3000/summary/advisors-summary`, {
          params: { page, pageSize },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const data = response.data;
        this.advisors = data.advisors;
        this.totalAdvisors = data.totalAdvisors;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
      } catch (error) {
        console.error('Error fetching advisors summary:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});