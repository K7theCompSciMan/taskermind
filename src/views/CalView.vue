<template>
    <div class="p-4">
      <FullCalendar
        :plugins="[dayGridPlugin]"
        initial-view="dayGridMonth"
        :events="events"
      />
    </div>
  </template>
  
  <script setup>
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  
  // Simple static events
  const events = [
    { title: 'Math Test', date: '2025-04-10' },
    { title: 'Birthday Party', date: '2025-04-15' }
  ]
  </script>
  