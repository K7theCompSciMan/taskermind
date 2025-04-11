<template>
    <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md text-center">
      <h1 class="text-2xl font-bold mb-4">Pomodoro Timer</h1>
      <div class="text-4xl font-mono mb-6">{{ formattedTime }}</div>
      
      <div class="mb-4">
        <span class="text-lg" :class="isWork ? 'text-red-500' : 'text-green-500'">
          {{ isWork ? 'Work Session' : 'Break Time' }}
        </span>
      </div>
  
      <div class="space-x-4">
        <button @click="toggleTimer" class="bg-blue-500 text-white px-4 py-2 rounded">
          {{ isRunning ? 'Pause' : 'Start' }}
        </button>
        <button @click="resetTimer" class="bg-gray-500 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, onUnmounted } from 'vue'
  
  const WORK_TIME = 25 * 60 // in seconds
  const BREAK_TIME = 5 * 60
  
  const isRunning = ref(false)
  const isWork = ref(true)
  const timeLeft = ref(WORK_TIME)
  let interval: number | undefined
  
  const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  })
  
  function startTimer() {
    interval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        isWork.value = !isWork.value
        timeLeft.value = isWork.value ? WORK_TIME : BREAK_TIME
      }
    }, 1000)
  }
  
  function stopTimer() {
    clearInterval(interval)
    interval = undefined
  }
  
  function toggleTimer() {
    if (isRunning.value) {
      stopTimer()
    } else {
      startTimer()
    }
    isRunning.value = !isRunning.value
  }
  
  function resetTimer() {
    stopTimer()
    isRunning.value = false
    isWork.value = true
    timeLeft.value = WORK_TIME
  }
  
  onUnmounted(() => {
    stopTimer()
  })
  </script>
  
  <style scoped>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  </style>
  