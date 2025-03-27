<template>
  <div class="advisor">
    <h1>Advisor Dashboard</h1>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Menu</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="navigateTo('/advisor/create-announcement')">
            <td>Create Announcement</td>
          </tr>
          <tr @click="navigateTo('/advisor/view-announcements')">
            <td>View Announcements</td>
          </tr>
          <tr @click="navigateTo('/advisor/view-appointments')">
            <td>View Appointments</td>
          </tr>
          <tr @click="navigateTo('/advisor/add-comment')">
            <td>Add Comment</td>
          </tr>
          <tr @click="navigateTo('/advisor/view-comments')">
            <td>View Comments</td>
          </tr>
          <tr @click="logout">
            <td>Logout</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};

const logout = () => {
  // Clear any stored login information (e.g., tokens)
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');

  // Redirect to the login page
  router.push('/');
};
</script>

<style scoped>
.advisor {
  text-align: center;
}

.table-container {
  margin: 20px auto;
  max-width: 600px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  cursor: pointer;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center; /* Center-align the text */
}

th {
  background-color: #f4f4f4;
}

tr:hover {
  background-color: #f1f1f1;
}

tr {
  transition: background-color 0.3s ease;
}
</style>