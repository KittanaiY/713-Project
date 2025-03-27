<template>
  <div>
    <h1>Feature Summary</h1>
    <div v-if="advisorSummaryStore.loading">Loading...</div>
    <div v-else>
      <div class="summary-container">
        <h2>Advisors Summary</h2>
        <div v-for="advisor in advisorSummaryStore.advisors" :key="advisor.id" class="advisor-section">
          <h3>{{ advisor.firstName }} {{ advisor.lastName }} - {{ advisor.department }}</h3>
          <p><strong>Position:</strong> {{ advisor.position }}</p>
          <p><strong>Students:</strong> {{ advisor.studentCount }}</p>
          <table class="appointments-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Requested Date</th>
                <th>Confirmed Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appointment in advisor.appointments" :key="appointment.id">
                <td>{{ appointment.studentId }}</td>
                <td>{{ appointment.subject }}</td>
                <td>{{ appointment.status }}</td>
                <td>{{ appointment.requestedDate }}</td>
                <td>{{ appointment.confirmedDate || 'Not Confirmed' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination Controls -->
        <div class="pagination-controls">
          <button :disabled="currentPage === 1" @click="prevPage">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
        </div>
      </div>
    </div>
    <router-link to="/admin/dashboard">
      <button>Return to Admin Dashboard</button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAdvisorSummaryStore } from '@/stores/advisorSummary';

const advisorSummaryStore = useAdvisorSummaryStore();
const currentPage = ref(1);
const itemsPerPage = 1; // Number of advisors per page

onMounted(() => {
  advisorSummaryStore.fetchAdvisorsSummary(currentPage.value, itemsPerPage); // Fetch advisors summary on page load
});

// Watch for page changes and fetch data accordingly
const fetchPageData = () => {
  advisorSummaryStore.fetchAdvisorsSummary(currentPage.value, itemsPerPage);
};

// Total pages
const totalPages = computed(() => advisorSummaryStore.totalPages);

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchPageData();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchPageData();
  }
};
</script>

<style scoped>
.summary-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.summary-container h2 {
  margin-bottom: 12px;
  font-size: 1.5rem;
  color: #333;
}

.advisor-section {
  margin-bottom: 24px;
}

.appointments-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
}

.appointments-table th,
.appointments-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.appointments-table th {
  background-color: #f0f0f0;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}

.pagination-controls button {
  margin: 0 8px;
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>