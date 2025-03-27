import { defineStore } from 'pinia';
import axios from 'axios';
import type { Appointment } from '@/type';

export const useAppointmentStore = defineStore('appointment', {
  state: () => ({
    appointments: [] as Appointment[], // State to store all appointments
  }),
  actions: {
    // Fetch all appointments
    async fetchAppointments() {
      try {
        const response = await axios.get('http://localhost:3000/appointments/appointments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.appointments = response.data;
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },

    // Fetch a single appointment by ID
    async fetchAppointmentById(id: number) {
      try {
        const response = await axios.get(`http://localhost:3000/appointments/appointments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching appointment by ID:', error);
        return null;
      }
    },

    // Create a new appointment
    async createAppointment(data: { subject: string; requestedDate: string; studentId: string; advisorId: number }) {
      try {
        const response = await axios.post('http://localhost:3000/appointments/create-appointment', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.appointments.push(response.data); // Add the new appointment to the state
      } catch (error) {
        console.error('Error creating appointment:', error);
      }
    },

    // Update an appointment
    async updateAppointment(id: number, data: { status?: string; confirmedDate?: Date }) {
      try {
        const response = await axios.put(`http://localhost:3000/appointments/appointments/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        // Update the appointment in the state
        const index = this.appointments.findIndex((appointment) => appointment.id === id);
        if (index !== -1) {
          this.appointments[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating appointment:', error);
      }
    },

    // Confirm an appointment
    async confirmAppointment(id: number, confirmedDate: string) {
      try {
        const response = await axios.put(
          `http://localhost:3000/appointments/appointments/${id}/confirm`,
          { confirmedDate },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        // Update the appointment in the state
        const index = this.appointments.findIndex((appointment) => appointment.id === id);
        if (index !== -1) {
          this.appointments[index] = response.data;
        }
      } catch (error) {
        console.error('Error confirming appointment:', error);
      }
    },

    // Delete an appointment
    async deleteAppointment(id: number) {
      try {
        await axios.delete(`http://localhost:3000/appointments/appointments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        // Remove the appointment from the state
        this.appointments = this.appointments.filter((appointment) => appointment.id !== id);
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    },
  },
});