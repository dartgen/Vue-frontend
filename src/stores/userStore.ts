import { ref, type Ref } from 'vue'

const currentUser: Ref<string, string> = ref(localStorage.getItem('activeUser') || '')

export function useUserStore() {
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
}
