<template>
  <div class="announcement-container">
    <div class="announcement-box">
      <h2>View Announcements</h2>
      <ul class="announcement-list">
        <li v-for="announcement in announcements" :key="announcement.id" class="announcement-item">
          <h3>{{ announcement.title }}</h3>
          <p class="announcement-content">{{ announcement.content }}</p>
          <p>
            <strong>Student:</strong>
            <span v-if="announcement.student">
              {{ announcement.student.firstName }} {{ announcement.student.lastName }} (ID: {{ announcement.student.studentId }})
            </span>
            <span v-else>
              Unknown (ID: {{ announcement.studentId }})
            </span>
          </p>
          <p>
            <strong>Advisor:</strong> {{ announcement.advisor.firstName }} {{ announcement.advisor.lastName }}
          </p>
          <a v-if="announcement.fileUrl" :href="announcement.fileUrl" target="_blank" class="file-link">View File</a>
        </li>
      </ul>
      <button @click="returnToDashboard" class="return-button">Return to Advisor Dashboard</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const announcements = ref([]);
const router = useRouter();

const fetchAnnouncements = async () => {
  try {
    const response = await axios.get('http://localhost:3000/announcements/announcements', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the auth token
      },
    });
    announcements.value = response.data;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    alert('Failed to fetch announcements.');
  }
};

onMounted(fetchAnnouncements);

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
  background-color: #f4f4f9;
  padding: 1rem;
}

.announcement-box {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 700px;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 0.5rem;
}

.announcement-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.announcement-item {
  margin-bottom: 20px;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fdfdfd;
  transition: transform 0.2s, box-shadow 0.2s;
}

.announcement-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

h3 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: #007bff;
}

.announcement-content {
  margin: 0.5rem 0;
  color: #555;
  font-style: italic;
}

p {
  margin: 0.5rem 0;
  color: #555;
}

.file-link {
  color: #007bff;
  text-decoration: underline;
  font-weight: bold;
}

.file-link:hover {
  color: #0056b3;
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