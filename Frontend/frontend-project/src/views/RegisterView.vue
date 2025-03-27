<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const studentId = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const profilePicture = ref<string>('')
const department = ref<string>('')
const password = ref<string>('')
const advisorId = ref<string>('')
const router = useRouter()
const store = useMessageStore()

const register = async () => {
  try {
    await axios.post('http://localhost:3000/register/register', {
      studentId: studentId.value,
      firstName: firstName.value,
      lastName: lastName.value,
      profilePicture: profilePicture.value,
      department: department.value,
      password: password.value,
      advisorId: advisorId.value,
    })
    store.updateMessage('Registration successful!')
    setTimeout(() => {
      store.resetMessage()
    }, 3000)
    router.push('/')
  } catch (error) {
    console.error('Registration failed', error)
    alert('Registration failed')
  }
}
</script>

<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="studentId">Student ID:</label>
        <input type="text" id="studentId" v-model="studentId" required />
      </div>
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="lastName" required />
      </div>
      <div>
        <label for="profilePicture">Profile Picture URL:</label>
        <input type="text" id="profilePicture" v-model="profilePicture" />
      </div>
      <div>
        <label for="department">Department:</label>
        <input type="text" id="department" v-model="department" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="advisorId">Advisor ID:</label>
        <input type="text" id="advisorId" v-model="advisorId" required />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>
.register {
  max-width: 300px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.register h1 {
  text-align: center;
}
.register div {
  margin-bottom: 1em;
}
.register label {
  display: block;
  margin-bottom: 0.5em;
}
.register input {
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
}
.register button {
  width: 100%;
  padding: 0.5em;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>