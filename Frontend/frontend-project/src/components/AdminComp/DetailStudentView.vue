<template>
  <div class="detail-student">
    <h2>Students</h2>
    <!-- Check if students array has data -->
    <div v-if="paginatedStudents.length > 0" class="student-list">
      <!-- Loop through students and display their details -->
      <div v-for="student in paginatedStudents" :key="student.studentId" class="student-card">
        <p><strong>Name:</strong> {{ student.firstName }} {{ student.lastName }}</p>
        <p><strong>Department:</strong> {{ student.department }}</p>
        <p><strong>Advisor ID:</strong> {{ student.advisorId }}</p>
        <button class="delete-button" @click="deleteStudent(student.studentId)">Delete</button>
      </div>
    </div>
    <!-- Show a message if no students are found -->
    <p v-else>No students found.</p>

    <!-- Pagination controls -->
    <div class="pagination" v-if="totalPages > 1">
      <button
        class="pagination-button"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        class="pagination-button"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next
      </button>
    </div>

    <div>
      <RouterLink to="/admin/dashboard">
        <button class="back-button">Back to Admin Dashboard</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStudentStore } from '@/stores/student';
import { useRouter } from 'vue-router';

const studentStore = useStudentStore();
const router = useRouter();

// Access the state from the store
const students = studentStore.students;

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 5;

// Compute the total number of pages
const totalPages = computed(() => Math.ceil(unwrappedStudents.value.length / itemsPerPage));

// Compute the students to display on the current page
const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return unwrappedStudents.value.slice(start, end);
});

// Unwrap the reactive data if necessary
const unwrappedStudents = computed(() =>
  students.map((student) => student._custom?.value || student)
);

// Fetch students when the component is mounted
onMounted(() => {
  const token = localStorage.getItem('authToken'); // Ensure the correct key is used
  if (!token) {
    alert('No token found. Redirecting to login.');
    router.push('/'); // Redirect to login page if token is missing
    return;
  }
  studentStore.fetchStudents(); // Fetch students from the store
});

// Delete a student using the store's action
function deleteStudent(studentId: string) {
  studentStore.deleteStudent(studentId);
}
</script>

<style scoped>
.detail-student {
  text-align: center;
  padding: 20px;
}

.student-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.student-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  background-color: #f9f9f9;
}

.student-card p {
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

.pagination {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-button:hover:not(:disabled) {
  background-color: #2980b9;
}
</style>