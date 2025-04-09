<template>
  <div id="app">
    <h1>Task Manager</h1>
    <!-- Task input section -->
    <div class="task-input">
      <input
          v-model="newTask.title"
          placeholder="Enter task title"
          type="text"
      />
      <input
          v-model="newTask.deadline"
          placeholder="Deadline (YYYY-MM-DD)"
          type="date"
      />
      <button @click="addTask">Add Task</button>
    </div>

    <!-- Task list section -->
    <div class="task-list">
      <h2>Tasks</h2>
      <ul>
        <li v-for="(task, index) in tasks" :key="task.id">
          <div class="task-item">
            <div class="task-details">
              <h3>{{ task.title }}</h3>
              <p>Deadline: {{ task.deadline }}</p>
            </div>
            <div class="task-actions">
              <button @click="editTask(task, index)">Edit</button>
              <button @click="deleteTask(index)">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Task editor for editing a task -->
    <div v-if="selectedTask" class="task-editor">
      <h2>Edit Task</h2>
      <input v-model="selectedTask.title" type="text" />
      <input v-model="selectedTask.deadline" type="date" />
      <button @click="saveTaskChanges">Save</button>
      <button @click="cancelEditing">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TaskView",
  data() {
    return {
      tasks: [] as { id: number; title: string; deadline: string }[],
      newTask: {
        title: '',
        deadline: ''
      },
      selectedTask: null as { id: number; title: string; deadline: string } | null,
      taskIndex: null as number | null
    };
  },
  methods: {
    addTask() {
      if (this.newTask.title && this.newTask.deadline) {
        const newTask = {
          id: Date.now(), // Unique ID
          title: this.newTask.title,
          deadline: this.newTask.deadline
        };
        this.tasks.push(newTask);
        this.newTask.title = '';
        this.newTask.deadline = '';
      }
    },
    editTask(task: { id: number; title: string; deadline: string }, index: number) {
      this.selectedTask = { ...task };
      this.taskIndex = index;
    },
    saveTaskChanges() {
      if (this.taskIndex !== null && this.selectedTask) {
        this.tasks[this.taskIndex] = { ...this.selectedTask };
        this.selectedTask = null;
        this.taskIndex = null;
      }
    },
    cancelEditing() {
      this.selectedTask = null;
      this.taskIndex = null;
    },
    deleteTask(index: number) {
      this.tasks.splice(index, 1);
    }
  }
};
</script>

<style scoped>
#app {
  text-align: center;
}

.task-input input {
  margin: 10px;
  padding: 8px;
}

button {
  padding: 8px 16px;
  margin: 5px;
  cursor: pointer;
}

.task-list {
  margin-top: 20px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.task-actions button {
  margin-left: 10px;
}

.task-editor input {
  margin: 10px;
  padding: 8px;
}

.task-editor button {
  margin: 5px;
}
</style>