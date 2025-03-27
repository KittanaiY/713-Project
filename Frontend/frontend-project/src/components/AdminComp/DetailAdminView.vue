<template>
  <div class="detail-admin">
    <h2>Admins</h2>
    <div v-if="admins.length > 0" class="admin-list">
      <div v-for="admin in admins" :key="admin.id" class="admin-card">
        <p><strong>Username:</strong> {{ admin.username }}</p>
        <p><strong>Role:</strong> {{ admin.role }}</p>
      </div>
    </div>
    <p v-else>No admins found.</p>
    <div>
      <RouterLink to="/admin/dashboard">
        <button class="back-button">Back to Admin Dashboard</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAdminStore } from '@/stores/admin';
import { useRouter } from 'vue-router';

const adminStore = useAdminStore();
const router = useRouter();

// Access the state from the store
const admins = adminStore.admins;

// Fetch admins when the component is mounted
onMounted(() => {
  const token = localStorage.getItem('authToken'); // Ensure the correct key is used
  if (!token) {
    alert('No token found. Redirecting to login.');
    router.push('/'); // Redirect to login page if token is missing
    return;
  }
  adminStore.fetchAdmins();
});

// Delete an admin using the store's action
function deleteAdmin(adminId: number) {
  adminStore.deleteAdmin(adminId);
}
</script>

<style scoped>
.detail-admin {
  text-align: center;
  padding: 20px;
}

.admin-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.admin-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  background-color: #f9f9f9;
}

.admin-card p {
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