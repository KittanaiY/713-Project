<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLoginStore } from '@/stores/login'; // Import the login store

const username = ref<string>('');
const password = ref<string>('');
const router = useRouter();
const loginStore = useLoginStore(); // Access the login store

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username: username.value,
      password: password.value,
    });

    const { token, role, user } = response.data;

    // Store token and user details in the login store
    loginStore.token = token;
    loginStore.role = role;
    loginStore.user = user;

    // Store token and user details in localStorage for persistence
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect based on user role
    if (role === 'ADMIN') {
      router.push('/admin/dashboard');
    } else if (role === 'ADVISOR') {
      router.push('/advisor/dashboard');
    } else if (role === 'STUDENT') {
      router.push('/student/dashboard');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Failed to log in');
  }
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align the login box to the top */
  height: 100vh;
  background-color: #f5f5f5;
  padding-top: 5rem; /* Add padding to create space from the top */
}

.login-box {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

h1 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
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
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>