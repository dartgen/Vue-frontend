<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { LoginResponse } from '@/Types'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const username: Ref<string, string> = ref('')
const password: Ref<string, string> = ref('')

const apiUrl = 'http://localhost:4000'
const handleLogin = async () => {
  const response = await fetch(`${apiUrl}/felhasznalo/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
  const data: LoginResponse = await response.json()
  console.log(data)
  if (response.ok) {
    userStore.setUser(data.user.username, data.token)
    router.push('/')
  } else {
    alert('Login Failed!')
  }
}

const router = useRouter()
</script>

<template>
  <main>
    <form class="space-y-4" @submit.prevent="handleLogin">
      <input type="text" v-model="username" placeholder="Username" class="text-black" />
      <br />
      <input type="password" v-model="password" placeholder="Password" class="text-black" />
      <br />
      <button type="submit" class="bg-slate-600 p-2 rounded-lg">Login</button>
    </form>
  </main>
</template>
