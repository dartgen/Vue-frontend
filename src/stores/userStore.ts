import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useUserStore = defineStore('user',() => {

  const currentUser: Ref<string> = ref(localStorage.getItem('activeUser') || '')

  function setUser(name: string, token: string) {
    currentUser.value = name
    localStorage.setItem('activeUser', name)
    localStorage.setItem('authToken',token)
  }
  function logout() {
    currentUser.value = ''
    localStorage.removeItem('activeUser')
    localStorage.removeItem('authToken')
  }

  return {
    currentUser,
    logout,
    setUser,
  }
});
