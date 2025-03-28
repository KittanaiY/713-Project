<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { Announcement } from '@/type'; // Import the Announcement type

const announcements = ref<Announcement[]>([]); // Explicitly define the type as an array of Announcement
const router = useRouter();

const fetchAnnouncements = async () => {
  try {
    const response = await axios.get('http://localhost:3000/announcements/announcements', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the auth token
      },
    });
    announcements.value = response.data; // Populate the announcements list
  } catch (error) {
    console.error('Error fetching announcements:', error);
    alert('Failed to fetch announcements.');
  }
};

const returnToDashboard = () => {
  router.push('/student/dashboard'); // Redirect to the student dashboard
};

onMounted(fetchAnnouncements);
</script>

<template>
  <div>
    <h2>Announcements</h2>
    <ul>
      <li v-for="announcement in announcements" :key="announcement.id">
        <h3>{{ announcement.title }}</h3>
        <p>{{ announcement.content }}</p>
        <a :href="announcement.fileUrl" target="_blank">View File</a>
      </li>
    </ul>
    <button @click="returnToDashboard">Return to Student Dashboard</button>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

h3 {
  margin: 0;
}

a {
  color: blue;
  text-decoration: underline;
}
</style>