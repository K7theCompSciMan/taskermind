<template>
    <div class="min-h-screen bg-gradient-to-br from-rose-100 via-teal-100 to-indigo-100 flex items-center justify-center px-4">
      <div class="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 text-center border border-white/50 relative">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 drop-shadow">Pomodoro Timer</h1>
  
        <!-- Timer Circle -->
        <div class="relative mx-auto w-[220px] h-[220px] mb-6">
          <canvas ref="canvasRef" width="220" height="220" class="mx-auto drop-shadow-sm" />
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-5xl font-mono text-gray-700 drop-shadow">{{ formattedTime }}</span>
          </div>
        </div>
  
        <!-- Session Type -->
        <p class="text-lg mb-4 font-semibold" :class="isWork ? 'text-red-500' : isLongBreak ? 'text-blue-500' : 'text-green-500'">
          {{ isWork ? 'Work Session' : isLongBreak ? 'Long Break' : 'Break Time' }}
        </p>
  
        <!-- Controls -->
        <div class="flex justify-center gap-4 mb-4">
          <button @click="toggleTimer" class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl shadow transition-all duration-200">
            {{ isRunning ? 'Pause' : 'Start' }}
          </button>
          <button @click="resetTimer" class="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-xl shadow transition-all duration-200">
            Reset
          </button>
        </div>
  
        <!-- Progress Info -->
        <p class="text-sm text-gray-500">
          Session {{ completedSessions }} of {{ LONG_BREAK_INTERVAL }} before long break
        </p>
  
        <!-- Glow effect -->
        <div class="absolute -z-10 blur-3xl opacity-30 w-full h-full bg-gradient-to-br from-red-400 via-teal-300 to-indigo-400 rounded-3xl"></div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, onUnmounted, watch, onMounted } from 'vue'
  
  const WORK_DURATION = 25 * 60
  const SHORT_BREAK = 5 * 60
  const LONG_BREAK = 15 * 60
  const LONG_BREAK_INTERVAL = 4
  
  const isRunning = ref(false)
  const isWork = ref(true)
  const completedSessions = ref(Number(localStorage.getItem('completedSessions') || '0'))
  const timeLeft = ref(WORK_DURATION)
  let interval: number | undefined
  
  const canvasRef = ref<HTMLCanvasElement | null>(null)
  
  const isLongBreak = computed(() => !isWork.value && completedSessions.value % LONG_BREAK_INTERVAL === 0)
  
  const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  })
  
  function drawProgress() {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
  
    const radius = 100
    const x = canvas.width / 2
    const y = canvas.height / 2
  
    const totalTime = isWork.value
      ? WORK_DURATION
      : isLongBreak.value
      ? LONG_BREAK
      : SHORT_BREAK
  
    const percent = 1 - timeLeft.value / totalTime
    const start = -Math.PI / 2
    const end = start + 2 * Math.PI * percent
  
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  
    // Background circle
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 12
    ctx.stroke()
  
    // Progress arc
    ctx.beginPath()
    ctx.arc(x, y, radius, start, end)
    ctx.strokeStyle = isWork.value ? '#ef4444' : isLongBreak.value ? '#3b82f6' : '#10b981'
    ctx.lineWidth = 12
    ctx.lineCap = 'round'
    ctx.stroke()
  }
  
  watch(timeLeft, drawProgress)
  watch(isWork, drawProgress)
  onMounted(drawProgress)
  
  function startTimer() {
    interval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        handleSessionEnd()
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
    timeLeft.value = WORK_DURATION
  }
  
  function handleSessionEnd() {
    stopTimer()
    if (isWork.value) {
      completedSessions.value++
      localStorage.setItem('completedSessions', completedSessions.value.toString())
    }
  
    isWork.value = !isWork.value
    timeLeft.value = isWork.value
      ? WORK_DURATION
      : completedSessions.value % LONG_BREAK_INTERVAL === 0
      ? LONG_BREAK
      : SHORT_BREAK
  
    sendNotification()
    startTimer()
    isRunning.value = true
  }
  
  function sendNotification() {
    if (!('Notification' in window)) return
    if (Notification.permission === 'granted') {
      new Notification(isWork.value ? 'Back to Work!' : 'Break Time!')
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission()
    }
  }
  
  onUnmounted(() => {
    stopTimer()
  })
  </script>
  
  <style scoped>
  canvas {
    transform: rotate(-90deg);
  }
  </style>
  