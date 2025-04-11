<template>
  <div class="home-wrapper">
    <div class="home-container">
      <!-- Greeting Section -->
      <div v-if="!studentName" class="name-input">
        <h2 class="home-title">Welcome!</h2>
        <input
          v-model="tempName"
          placeholder="Enter your name"
          class="name-box"
        />
        <button @click="setName" class="big-button">Save</button>
      </div>

      <div v-else>
        <h1 class="home-title">Welcome back, {{ studentName }}!</h1>
        <button @click="resetName" class="edit-name">✏️ Edit Name</button>

        <!-- Mood Check-In Section -->
        <div class="mood-checkin">
          <h2 class="mood-title">How are you feeling today?</h2>
          <div class="emoji-row">
            <button
              v-for="mood in moods"
              :key="mood.label"
              @click="selectMood(mood.label)"
              :class="['emoji-btn', selectedMood === mood.label ? 'selected' : '']"
            >
              {{ mood.emoji }}
            </button>
          </div>
          <p v-if="selectedMood" class="mood-feedback">
            You’re feeling <strong>{{ selectedMood }}</strong> today.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: "Home",
  setup() {
    const studentName = ref<string | null>(null);
    const tempName = ref('');
    const selectedMood = ref<string | null>(null);

    const moods = [
      { emoji: "😊", label: "Happy" },
      { emoji: "😐", label: "Neutral" },
      { emoji: "😟", label: "Stressed" },
      { emoji: "😴", label: "Tired" },
      { emoji: "😄", label: "Excited" },
    ];

    onMounted(() => {
      const storedName = localStorage.getItem("studentName");
      if (storedName) studentName.value = storedName;

      const storedMood = localStorage.getItem("mood");
      if (storedMood) selectedMood.value = storedMood;
    });

    const setName = () => {
      if (tempName.value.trim() !== "") {
        studentName.value = tempName.value.trim();
        localStorage.setItem("studentName", studentName.value);
      }
    };

    const resetName = () => {
      localStorage.removeItem("studentName");
      studentName.value = null;
      tempName.value = '';
    };

    const selectMood = (mood: string) => {
      selectedMood.value = mood;
      localStorage.setItem("mood", mood);
    };

    return {
      studentName,
      tempName,
      moods,
      selectedMood,
      setName,
      selectMood,
      resetName
    };
  }
});

let user = localStorage.getItem("user");
onMounted(async() => {
  user = await (await fetch("https://taskermind-api.fly.dev/session/user", {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  })).json();
  console.log(user)

})
</script>

<style scoped>
.home-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 400px;
}

.home-container {
  text-align: center;
}

.home-title {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.name-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name-box {
  padding: 0.8rem;
  font-size: 1.2rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 80%;
  max-width: 500px; /* increase this */
}


.big-button {
  font-size: 1.5rem;
  padding: 1rem 2rem;
  background-color: #3b82f6; /* optional: blue */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.big-button:hover {
  background-color: #2563eb;
}

.edit-name {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #555;
  margin-bottom: 2rem;
}

.mood-checkin {
  margin-top: 1rem;
}

.mood-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.emoji-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.emoji-btn {
  font-size: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.emoji-btn:hover {
  transform: scale(1.2);
}

.selected {
  background-color: #dbeafe;
  border-radius: 50%;
  padding: 0.5rem;
}

.mood-feedback {
  font-size: 1rem;
  color: #374151;
}
</style>
