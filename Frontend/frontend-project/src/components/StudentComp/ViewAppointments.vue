<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { Appointment } from '@/type'; // Import the Appointment type

const appointments = ref<Appointment[]>([]); // Explicitly define the type as an array of Appointment
const router = useRouter();

const fetchAppointments = async () => {
  try {
    const response = await axios.get('http://localhost:3000/appointments/appointments', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the auth token
      },
    });
    appointments.value = response.data; // Populate the appointments list
  } catch (error) {
    console.error('Error fetching appointments:', error);
    alert('Failed to fetch appointments.');
  }
};

const confirmAppointment = async (id: number) => {
  try {
    const confirmedDate = new Date().toISOString(); // Use the current date and time as the confirmed date
    const response = await axios.put(
      `http://localhost:3000/appointments/appointments/${id}/confirm`,
      { confirmedDate },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );
    // Update the appointment status in the local state
    const index = appointments.value.findIndex((appointment) => appointment.id === id);
    if (index !== -1) {
      appointments.value[index] = response.data;
    }
    alert('Appointment confirmed successfully!');
  } catch (error) {
    console.error('Error confirming appointment:', error);
    alert('Failed to confirm appointment.');
  }
};

const goToDashboard = () => {
  router.push('/student/dashboard');
};

onMounted(() => {
  fetchAppointments();
});
</script>

<template>
  <div class="view-appointments-container">
    <div class="appointments-box">
      <h2>Your Appointments</h2>
      <table class="appointments-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Requested Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id" class="appointment-row">
            <td>{{ appointment.subject }}</td>
            <td>{{ new Date(appointment.requestedDate).toLocaleString() }}</td>
            <td>
              <span :class="['status-badge', appointment.status.toLowerCase()]">
                {{ appointment.status }}
              </span>
            </td>
            <td>
              <button
                v-if="appointment.status === 'PENDING'"
                @click="confirmAppointment(appointment.id)"
                class="confirm-button"
              >
                Confirm
              </button>
              <span v-else class="confirmed-text">Confirmed</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="goToDashboard" class="return-button">Return to Student Dashboard</button>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>