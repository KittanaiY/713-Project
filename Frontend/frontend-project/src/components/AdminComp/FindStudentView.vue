<template>
    <div class="find-student">
      <h1>Find Student</h1>
      <form @submit.prevent="searchStudents">
        <div>
          <label for="searchBy">Search By:</label>
          <select v-model="searchBy" id="searchBy">
            <option value="studentId">Student ID</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
          </select>
        </div>
        <div>
          <label for="searchValue">Search Value:</label>
          <input v-model="searchValue" id="searchValue" type="text" placeholder="Enter Search Value" />
        </div>
        <button type="submit">Search</button>
        <button type="button" @click="resetSearch">Reset</button>
      </form>
  
      <div v-if="students.length > 0">
        <h2>Search Results</h2>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.studentId">
              <td>{{ student.studentId }}</td>
              <td>{{ student.firstName }}</td>
              <td>{{ student.lastName }}</td>
              <td>{{ student.department }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { Student } from '@/type';

  const searchBy = ref('studentId'); // Default search by studentId
  const searchValue = ref('');
  const students = ref<Student[]>([]);
  
  const searchStudents = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const params: Record<string, string> = {};
      params[searchBy.value] = searchValue.value;
  
      const response = await axios.get('http://localhost:3000/admin/search-students', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      students.value = response.data;
    } catch (error) {
      console.error('Error searching students:', error);
    }
  };
  
  const resetSearch = () => {
    searchBy.value = 'studentId';
    searchValue.value = '';
    students.value = [];
  };
  </script>
  
  <style scoped>
  .find-student {
    text-align: center;
    margin: 20px;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  form div {
    margin: 10px 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  button {
    margin: 5px;
  }
  </style>