<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useTodoStore } from '@/stores/todoStore';

const todoStore = useTodoStore()
const { tasks } = storeToRefs(todoStore)

const newTask = ref('');

const addTask = async () => {
  if (!newTask.value.trim()) return
  await todoStore.addTask(newTask.value)

  newTask.value = ''
}

const removeTask = async (id: number) => {
  await todoStore.removeTask(id)
}

</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">My Tasks</h2>

    <form @submit.prevent="addTask" class="flex gap-2 mb-6">
      <input
        v-model="newTask"
        type="text"
        placeholder="Add a new task..."
        class="text-black flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      >
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add
      </button>
    </form>

    <ul class="space-y-3">
      <li
        v-for="task in tasks"
        :key="task.Id"
        class="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100"
      >
        <span class="text-gray-700">{{ task.Szoveg }}</span>

        <button
          @click="removeTask(task.Id)"
          class="text-red-500 hover:text-red-700 font-bold px-2"
        >
          ✕
        </button>
      </li>
    </ul>

    <p v-if="tasks.length === 0" class="text-center text-gray-400 mt-4">
      No tasks yet. Get to work! 🚀
    </p>
  </div>
</template>

<style scoped>
/* Paste your Todo-specific styles here */
.is-done {
  text-decoration: line-through;
  color: green;
}

.delete-btn {
  margin-left: 10px;
  background: #ff4d4d;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  padding: 2px 6px;
}

.todo-container {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #333; /* Just to see the boundary */
  border-radius: 8px;
}
</style>
