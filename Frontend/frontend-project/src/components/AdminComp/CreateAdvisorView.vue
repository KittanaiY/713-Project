<template>
  <div class="create-advisor">
    <div class="advisor-box">
      <h2>Create Advisor</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="username">Username:</label>
          <input id="username" v-model="username" placeholder="Username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" placeholder="Password" required />
        </div>
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input id="firstName" v-model="firstName" placeholder="First Name" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input id="lastName" v-model="lastName" placeholder="Last Name" required />
        </div>
        <div class="form-group">
          <label for="department">Department:</label>
          <input id="department" v-model="department" placeholder="Department" required />
        </div>
        <div class="form-group">
          <label for="position">Position:</label>
          <input id="position" v-model="position" placeholder="Position" required />
        </div>
        <button type="submit" class="submit-button">Create Advisor</button>
      </form>
      <button @click="returnToDashboard" class="return-button">Back to Admin Dashboard</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const department = ref('');
const position = ref('');
const router = useRouter();

const submitForm = async () => {
  try {
    // Prepare the advisor data
    const advisorData = {
      username: username.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      department: department.value,
      position: position.value,
    };

    // Send the advisor data to the backend
    const response = await axios.post('http://localhost:3000/admin/create-advisor', advisorData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the auth token
      },
    });

    alert('Advisor created successfully!');
    console.log('Created advisor:', response.data);

    // Reset fields
    username.value = '';
    password.value = '';
    firstName.value = '';
    lastName.value = '';
    department.value = '';
    position.value = '';
  } catch (error) {
    console.error('Error creating advisor:', error);
    alert('Failed to create advisor. Please try again.');
  }
};

const returnToDashboard = () => {
  router.push('/admin/dashboard'); // Redirect to the admin dashboard
};
</script>

<style scoped>
.create-advisor {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 1rem;
}

.advisor-box {
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