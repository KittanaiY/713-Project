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

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const appointments = ref([]);
const router = useRouter();

const fetchAppointments = async () => {
  try {
    const response = await axios.get('http://localhost:3000/appointments/appointments', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    appointments.value = response.data;
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

<style scoped>
.view-appointments-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 1rem;
}

.appointments-box {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 0.5rem;
}

.appointments-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #555;
}

.appointment-row:hover {
  background-color: #f9f9f9;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  color: white;
}

.status-badge.pending {
  background-color: #ffc107;
}

.status-badge.confirmed {
  background-color: #28a745;
}

.confirm-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
}

.confirm-button:hover {
  background-color: #0056b3;
}

.confirmed-text {
  font-size: 0.9rem;
  color: #28a745;
  font-weight: bold;
}

.return-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.return-button:hover {
  background-color: #5a6268;
}
</style>