<template>
  <div class="appointment-container">
    <div class="appointment-box">
      <h2>Create Appointment</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="subject">Subject:</label>
          <input type="text" id="subject" v-model="subject" required />
        </div>
        <div class="form-group">
          <label for="requestedDate">Requested Date:</label>
          <input type="datetime-local" id="requestedDate" v-model="requestedDate" required />
        </div>
        <div class="form-group">
          <label for="advisorId">Advisor ID:</label>
          <input type="text" id="advisorId" v-model="advisorId" required />
        </div>
        <button type="submit" class="submit-button">Create</button>
      </form>
      <button @click="returnToDashboard" class="return-button">Return to Student Dashboard</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLoginStore } from '@/stores/login'; // Import the login store

const subject = ref('');
const requestedDate = ref('');
const advisorId = ref('');
const router = useRouter();
const loginStore = useLoginStore(); // Access the login store

const submitForm = async () => {
  try {
    // Extract student details from the login store
    const student = loginStore.user;
    if (!student || student.role !== 'STUDENT') {
      alert('Unable to retrieve student information. Please log in again.');
      return;
    }

    // Prepare the data to match the structure in appointmentService
    const appointmentData = {
      subject: subject.value,
      requestedDate: new Date(requestedDate.value), // Convert to Date object
      advisorId: Number(advisorId.value), // Ensure advisorId is a number
      studentId: student.studentId, // Use the logged-in student's ID
    };

    // Send the appointment data to the backend
    const response = await axios.post('http://localhost:3000/appointments/create-appointment', appointmentData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the auth token
      },
    });

    alert('Appointment created successfully');
    console.log('Created appointment:', response.data);
  } catch (error) {
    console.error('Error creating appointment:', error);
    alert('Failed to create appointment');
  }
};

const returnToDashboard = () => {
  router.push('/student/dashboard'); // Redirect to the student dashboard
};
</script>

<style scoped>
.appointment-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 1rem;
}

.appointment-box {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #0056b3;
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
  margin-top: 1rem;
}

.return-button:hover {
  background-color: #5a6268;
}
</style>