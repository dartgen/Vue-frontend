import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '@/Types'

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref<Task[]>([])
  const fetchTasks = async () => {
    const token = localStorage.getItem('authToken')
    if (!token) return

    try {
      const res = await fetch('http://localhost:4000/todo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        tasks.value = await res.json()
      }
    } catch (err) {
      console.error('Failed to load tasks', err)
    }
  }

  const addTask = async (newTask: string) => {
    if (!newTask.trim()) return

    const token = localStorage.getItem('authToken')

    try {
      const res = await fetch('http://localhost:4000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newTask }),
      })

      if (res.ok) {
        const createdTask = await res.json()

        // Add to list immediately (mapping the API response to our Hungarian format)
        tasks.value.unshift({
          Id: createdTask.id,
          Szoveg: createdTask.text,
          Kesz: false,
        })
      }
    } catch (err) {
      console.error('Failed to add task', err)
    }
  }

  const removeTask = async (id: number) => {
  const token = localStorage.getItem('authToken')

  try {
    await fetch(`http://localhost:4000/todo/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })

    // Remove from local list so it disappears instantly
    tasks.value = tasks.value.filter(t => t.Id !== id)
  } catch (err) {
    console.error("Failed to delete task", err)
  }
}

  return {
    tasks,
    fetchTasks,
    addTask,
    removeTask,
  }
})
