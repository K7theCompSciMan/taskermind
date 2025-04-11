<template>
    <div class="calendar">
      <!-- Header -->
      <div class="calendar-header">
        <button @click="prevMonth" class="nav-button">‹</button>
        <h2 class="month-label">{{ monthYearLabel }}</h2>
        <button @click="nextMonth" class="nav-button">›</button>
      </div>
  
      <!-- Weekday Labels -->
      <div class="weekdays">
        <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
      </div>
  
      <!-- Calendar Grid -->
      <div class="calendar-grid">
        <div
          v-for="(date, index) in calendarDays"
          :key="index"
          class="calendar-day"
          :class="[
            date.isCurrentMonth ? 'current-month' : 'faded',
            date.isToday ? 'today' : '',
            selectedDate?.toDateString() === date.date.toDateString() ? 'selected' : ''
          ]"
          @click="selectDate(date.date)"
        >
            <p>{{ date.date.getDate() }}</p>
            <p style="font-size:small">{{ tasks.filter((task) => task.dueDate == date.date.toISOString().substring(0, 10) ).length > 0 ? `${tasks.filter((task) => task.dueDate == date.date.toISOString().substring(0, 10) ).length > 1 ? `${tasks.filter((task) => task.dueDate == date.date.toISOString().substring(0, 10) ).length} tasks`: `${tasks.filter((task) => task.dueDate == date.date.toISOString().substring(0, 10) ).length} task`}` :""}} </p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue'
  import {onMounted} from 'vue'

  let tasks: any[] = [];
  let user: any = {};
  onMounted(async() => {
    user = await (await fetch("https://taskermind-api.fly.dev/session/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })).json();

    tasks = user.tasks;
    console.log(tasks);
    console.log(tasks[6].dueDate === (new Date()).toISOString().substring(0, 10));
  });
  
  const today = new Date()
  const currentMonth = ref(new Date(today.getFullYear(), today.getMonth(), 1))
  const selectedDate = ref<Date | null>(null)
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const monthYearLabel = computed(() =>
    currentMonth.value.toLocaleDateString('default', {
      month: 'long',
      year: 'numeric'
    })
  )
  
  function isSameDate(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    )
  }
  
  const calendarDays = computed(() => {
    const year = currentMonth.value.getFullYear()
    const month = currentMonth.value.getMonth()
  
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDay = firstDay.getDay()
  
    const prevMonth = new Date(year, month - 1, 1)
    const daysInPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate()
  
    const days: {
      date: Date
      isCurrentMonth: boolean
      isToday: boolean
    }[] = []
  
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i)
      days.push({ date, isCurrentMonth: false, isToday: isSameDate(date, today) })
    }
  
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      days.push({ date, isCurrentMonth: true, isToday: isSameDate(date, today) })
    }
  
    const totalCells = Math.ceil(days.length / 7) * 7
    const remaining = totalCells - days.length
  
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i)
      days.push({ date, isCurrentMonth: false, isToday: isSameDate(date, today) })
    }
  
    return days
  })
  
  function prevMonth() {
    currentMonth.value = new Date(
      currentMonth.value.getFullYear(),
      currentMonth.value.getMonth() - 1,
      1
    )
  }
  
  function nextMonth() {
    currentMonth.value = new Date(
      currentMonth.value.getFullYear(),
      currentMonth.value.getMonth() + 1,
      1
    )
  }
  
  function selectDate(date: Date) {
    selectedDate.value = date
  }
  </script>
  
  <style scoped>
  .calendar {
    width: 50%;
    margin: 2rem auto;
    background: #fff;
    border: 1px solid #e4e4e4;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    padding: 1.5rem;
    font-family: 'Segoe UI', sans-serif;
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .month-label {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
  }
  
  .nav-button {
    background: none;
    border: none;
    font-size: 1.8rem;
    cursor: pointer;
    color: #666;
    transition: color 0.2s;
  }
  .nav-button:hover {
    color: #111;
  }
  
  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: bold;
    color: #888;
    margin-bottom: 0.5rem;
  }
  
  .weekday {
    padding: 0.25rem 0;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.4rem;
  }
  
  .calendar-day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 500;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    user-select: none;
  }
  
  .calendar-day.current-month {
    color: #333;
  }
  
  .calendar-day.faded {
    color: #bbb;
  }
  
  .calendar-day:hover {
    background: #eef3ff;
  }
  
  .calendar-day.today {
    background: #3f51b5;
    color: #fff !important;
  }
  
  .calendar-day.selected {
    border: 2px solid #3f51b5;
    box-sizing: border-box;
  }
  </style>
  