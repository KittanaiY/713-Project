<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { ref, computed, watch } from 'vue'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)

const router = useRouter()
const route = useRoute()

const authToken = ref(localStorage.getItem('authToken'))

const isLoggedIn = computed(() => !!authToken.value)

const logout = () => {
  // Clear any stored login information (e.g., tokens)
  localStorage.removeItem('authToken')
  sessionStorage.removeItem('authToken')
  authToken.value = null
  
  // Redirect to the login page
  router.push('/')
}

// Watch for changes in localStorage to update authToken
watch(
  () => localStorage.getItem('authToken'),
  (newToken) => {
    authToken.value = newToken
  }
)
</script>

<template>
  <div id="layout">
    <header>
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div id="wrapper">
        <nav>
          <RouterLink v-if="!isLoggedIn && route.path === '/'" to="/">Login</RouterLink>
          <RouterLink v-if="!isLoggedIn && route.path === '/'" to="/register">Register</RouterLink>
          <RouterLink v-if="route.path === '/register'" to="/">Back to Login Page</RouterLink>
          <button v-if="isLoggedIn" @click="logout">Logout</button>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
#flashMessage {
  animation: yellofade 3s ease-in-out;
  background-color: yellow;
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
}

@keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}

#layout {
 font-family: Avenir, Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 color: #2c3e50;
}
nav {
 padding: 30px;
}
nav a {
 font-weight: bold;
 color: #2c3e50;
}
nav a.router-link-exact-active {
 color: #42b983;
}
nav button {
 font-weight: bold;
 color: #2c3e50;
 background: none;
 border: none;
 cursor: pointer;
}
</style>