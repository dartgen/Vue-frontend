import { ref, type Ref } from 'vue'

const currentUser: Ref<string, string> = ref(localStorage.getItem('activeUser') || '')

export function useUserStore() {
  function setUser(name: string) {
    currentUser.value = name
    localStorage.setItem('activeUser', name)
  }
  function logout() {
    currentUser.value = ''
    localStorage.removeItem('activeUser')
  }

  return {
    currentUser,
    logout,
    setUser,
  }
}
