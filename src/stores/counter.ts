import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userId', () => {
  const userId = ref<string | null>(localStorage.getItem('userId'))

  const setUserId = (id?: string) => {
    userId.value = id ?? null
    if (!id) {
      localStorage.removeItem('userId')
      return
    }
    localStorage.setItem('userId', id)
  }
  return { userId, setUserId }
})
