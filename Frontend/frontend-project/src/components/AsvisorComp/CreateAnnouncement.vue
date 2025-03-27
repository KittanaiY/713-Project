<template>
  <div class="announcement-container">
    <div class="announcement-box">
      <h2>Create Announcement</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" required />
        </div>
        <div class="form-group">
          <label for="content">Content:</label>
          <textarea id="content" v-model="content" required></textarea>
        </div>
        <div class="form-group">
          <label for="fileUrl">File URL:</label>
          <input type="text" id="fileUrl" v-model="fileUrl" />
        </div>
        <div class="form-group">
          <label for="studentId">Student ID:</label>
          <input type="text" id="studentId" v-model="studentId" required />
        </div>
        <button type="submit" class="submit-button">Create</button>
      </form>
      <button @click="returnToDashboard" class="return-button">Return to Advisor Dashboard</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLoginStore } from '@/stores/login'; // Import the login store

const title = ref('');
const content = ref('');
const fileUrl = ref('');
const studentId = ref('');
const router = useRouter();
const loginStore = useLoginStore(); // Access the login store

const submitForm = async () => {
  try {
    // Extract advisor details from the login store
    const advisor = loginStore.user;
    if (!advisor || advisor.role !== 'ADVISOR') {
      alert('Unable to retrieve advisor information. Please log in again.');
      return;
    }

    // Prepare the data to match the structure in announcementService
    const announcementData = {
      title: title.value,
      content: content.value,
      fileUrl: fileUrl.value,
      studentId: studentId.value,
      advisorId: advisor.id, // Use the logged-in advisor's ID
    };

    // Send the announcement data to the backend
    const response = await axios.post('http://localhost:3000/announcements/create-announcement', announcementData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the auth token
      },
    });

    alert('Announcement created successfully!');
    console.log('Created announcement:', response.data);

    // Reset fields
    title.value = '';
    content.value = '';
    fileUrl.value = '';
    studentId.value = '';
  } catch (error) {
    console.error('Error creating announcement:', error);
    alert('Failed to create announcement. Please try again.');
  }
};

const returnToDashboard = () => {
  router.push('/advisor/dashboard'); // Redirect to the advisor dashboard
};
</script>

<style scoped>
.announcement-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 1rem;
}

.announcement-box {
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

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
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