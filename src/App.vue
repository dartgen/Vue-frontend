<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/userStore'
import router from './router';
const userStore = useUserStore()
const handleLogout = () => {
  userStore.logout();
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-200 font-sans">
    <header class="bg-gray-800 border-b border-gray-700 p-4 shadow-md">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-xl font-bold text-green-400">MyVueApp</span>
        </div>

        <nav class="flex gap-4">
          <RouterLink
            to="/"
            class="hover:text-green-400 transition-colors"
            active-class="text-green-400 font-bold underline decoration-2 underline-offset-4"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/about"
            class="hover:text-green-400 transition-colors"
            active-class="text-green-400 font-bold underline decoration-2 underline-offset-4"
          >
            About
          </RouterLink>
          <RouterLink
            to="/login"
            class="hover:text-green-400 transition-colors"
            active-class="text-green-400 font-bold underline decoration-2 underline-offset-4"
          >
            Login
          </RouterLink>
          <h3>{{ userStore.currentUser }}</h3>
          <button @click="handleLogout">Logout</button>
        </nav>
      </div>
    </header>

    <main class="max-w-4xl mx-auto p-6">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* 1. Reset the header to just be a centered box */
header {
  line-height: 1.5;
  max-height: 100vh;
  padding: 1rem;
  border-bottom: 1px solid #333;
  margin-bottom: 2rem;
}

/* 2. Make the nav look like a proper top bar */
nav {
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
}

nav a:first-of-type {
  border: 0;
}

nav a.router-link-exact-active {
  color: white;
  font-weight: bold;
}

/* 3. CENTER THE APP CONTENT */
/* This is the magic part that fixes the misalignment */
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    justify-content: center; /* Forces nav to center */
    padding-right: 0; /* Removes the old side padding */
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    justify-content: center; /* Centers the inner links */
  }
}
</style>
