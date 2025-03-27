import { defineStore } from 'pinia';
import axios from 'axios';
import type { Announcement } from '@/type';

export const useAnnouncementStore = defineStore('announcement', {
  state: () => ({
    announcements: [] as Announcement[],
  }),
  actions: {
    // Fetch all announcements
    async fetchAnnouncements() {
      try {
        const response = await axios.get('http://localhost:3000/announcements/announcements', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.announcements = response.data;
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    },

    // Create a new announcement
    async createAnnouncement(data: { title: string; content: string; fileUrl?: string }) {
      try {
        const response = await axios.post('http://localhost:3000/announcements/create', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.announcements.push(response.data); // Add the new announcement to the state
      } catch (error) {
        console.error('Error creating announcement:', error);
      }
    },

    // Delete an announcement by ID
    async deleteAnnouncement(id: number) {
      try {
        await axios.delete(`http://localhost:3000/announcements/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.announcements = this.announcements.filter((announcement) => announcement.id !== id);
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    },

    // Fetch a single announcement by ID
    async fetchAnnouncementById(id: number) {
      try {
        const response = await axios.get(`http://localhost:3000/announcements/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching announcement by ID:', error);
        return null;
      }
    },
  },
});