<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

// 1. Paste your Interface here
interface TodoItem {
  id: number
  label: string
  done: boolean
}

// 2. Paste your State (items, newItem) here
const items = ref<TodoItem[]>([])
const newItem = ref('')

// 3. Paste your Functions (addItem, removeItem) here
const addItem = () => {
  if (newItem.value.trim() === '') return
  items.value.push({
    id: Date.now(), // Pro-tip: Date.now() is safer than length + 1 for unique IDs!
    label: newItem.value,
    done: false,
  })
  newItem.value = ''
}

const removeItem = (itemToRemove: TodoItem) => {
  items.value = items.value.filter((item) => item !== itemToRemove)
}

// 4. Paste Computed & Watchers here
const pendingCount = computed(() => {
  return items.value.filter((item) => !item.done).length
})

watch(
  items,
  (newVal) => {
    localStorage.setItem('my-todo-list', JSON.stringify(newVal))
  },
  { deep: true },
)

onMounted(() => {
  const savedItems = localStorage.getItem('my-todo-list')
  if (savedItems) items.value = JSON.parse(savedItems)
})
</script>

<template>
  <div
    class="p-6 max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg border border-gray-700 mt-10 text-white"
  >
    <h3 class="text-xl font-bold text-green-400 mb-6 text-center">
      You have {{ pendingCount }} tasks remaining
    </h3>

    <ul class="space-y-3">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex items-center justify-between bg-gray-700 p-3 rounded hover:bg-gray-600 transition-colors"
        :class="{ 'opacity-50 line-through': item.done }"
      >
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            v-model="item.done"
            class="accent-green-500 w-5 h-5 cursor-pointer"
          />
          <span class="text-lg">{{ item.label }}</span>
        </div>

        <button
          @click="removeItem(item)"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm transition-colors"
        >
          X
        </button>
      </li>
    </ul>

    <input
      v-model="newItem"
      @keyup.enter="addItem"
      placeholder="Type a new task..."
      class="w-full mt-6 p-3 rounded bg-gray-900 border border-gray-600 focus:outline-none focus:border-green-400 transition-colors text-white"
    />
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
