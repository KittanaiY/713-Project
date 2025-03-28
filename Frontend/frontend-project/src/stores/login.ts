import { defineStore } from 'pinia';
import type { Admin, Advisor, Student } from '@/type';

export const useLoginStore = defineStore('login', {
  state: () => ({
    token: null as string | null, // JWT token
    role: null as string | null,  // User role (ADMIN, ADVISOR, STUDENT)
    user: null as Admin | Advisor | Student | null, // User details
  }),
  actions: {
    // Logout action
    logout() {
      this.token = null;
      this.role = null;
      this.user = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
    },
  },
});