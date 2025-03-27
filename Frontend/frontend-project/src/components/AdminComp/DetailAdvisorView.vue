<template>
  <div class="detail-advisor">
    <h2>Advisors</h2>
    <!-- Check if advisors array has data -->
    <div v-if="advisors.length > 0" class="advisor-list">
      <!-- Loop through advisors and display their details -->
      <div v-for="advisor in advisors" :key="advisor.id" class="advisor-card">
        <p><strong>Username:</strong> {{ advisor.username }}</p>
        <p><strong>First Name:</strong> {{ advisor.firstName }}</p>
        <p><strong>Last Name:</strong> {{ advisor.lastName }}</p>
        <p><strong>Department:</strong> {{ advisor.department }}</p>
        <p><strong>Position:</strong> {{ advisor.position }}</p>
        <button class="delete-button" @click="deleteAdvisor(advisor.id)">Delete</button>
      </div>
    </div>
    <!-- Show a message if no advisors are found -->
    <p v-else>No advisors found.</p>
    <div>
      <RouterLink to="/admin/dashboard">
        <button class="back-button">Back to Admin Dashboard</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAdvisorStore } from '@/stores/advisor';
import { useRouter } from 'vue-router';

// Access the advisor store
const advisorStore = useAdvisorStore();
const router = useRouter();

// Bind the advisors state from the store
const advisors = advisorStore.advisors;

// Fetch advisors when the component is mounted
onMounted(() => {
  const token = localStorage.getItem('authToken'); // Ensure the correct key is used
  if (!token) {
    alert('No token found. Redirecting to login.');
    router.push('/'); // Redirect to login page if token is missing
    return;
  }
  advisorStore.fetchAdvisors(); // Fetch advisors from the store
});

// Delete an advisor using the store's action
function deleteAdvisor(advisorId: number) {
  advisorStore.deleteAdvisor(advisorId);
}
</script>

<style scoped>
.detail-advisor {
  text-align: center;
  padding: 20px;
}

.advisor-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.advisor-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  background-color: #f9f9f9;
}

.advisor-card p {
  margin: 5px 0;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c0392b;
}

.back-button {
  margin-top: 20px;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #2980b9;
}
</style>