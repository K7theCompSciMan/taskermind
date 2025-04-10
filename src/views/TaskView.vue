<template>
  <div id="app">
    <div class="header-section">
      <h1>Task Manager</h1>
      <button @click="openAddModal" class="add-task-button">+ Add Task</button>
    </div>

    <!-- Task List -->
    <div class="task-list">
      <h2>Tasks</h2>
      <ul>
        <li v-for="(task, index) in tasks" :key="task.id" :class="{ completed: task.completed }">
          <input type="checkbox" v-model="task.completed" />
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p>Subject: {{ task.subject }}</p>
          <p>Deadline: {{ task.deadline }}</p>
          <p>Priority: {{ task.priority }}</p>
          <div class="actions">
            <button @click="editTask(index)">Edit</button>
            <button @click="deleteTask(index)">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ editingTaskIndex !== null ? 'Edit Task' : 'Add New Task' }}</h2>
        <input v-model="newTask.title" placeholder="Enter task title" />
        <textarea v-model="newTask.description" placeholder="Enter task description (optional)"></textarea>
        <input v-model="newTask.deadline" type="date" />
        <select v-model="newTask.priority">
          <option disabled value="">Select Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select v-model="newTask.subject">
          <option disabled value="">Select Subject</option>
          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>History</option>
          <option>Language</option>
          <option>Electives</option>
          <option>Out of school</option>
        </select>
        <button @click="submitTask">
          {{ editingTaskIndex !== null ? 'Update Task' : '+ Add Task' }}
        </button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TaskView",
  data() {
    return {
      showModal: false,
      editingTaskIndex: null as number | null,
      tasks: [] as {
        id: number;
        title: string;
        description: string;
        deadline: string;
        priority: string;
        subject: string;
        completed: boolean;
      }[],
      newTask: {
        title: '',
        description: '',
        deadline: '',
        priority: '',
        subject: '',
        completed: false
      }
    };
  },
  methods: {
    openAddModal() {
      this.resetNewTask();
      this.editingTaskIndex = null;
      this.showModal = true;
    },
    submitTask() {
      if (
        this.newTask.title &&
        this.newTask.deadline &&
        this.newTask.priority &&
        this.newTask.subject
      ) {
        if (this.editingTaskIndex !== null) {
          // Edit existing task
          this.tasks[this.editingTaskIndex] = {
            ...this.tasks[this.editingTaskIndex],
            ...this.newTask
          };
        } else {
          // Add new task
          const task = {
            id: Date.now(),
            ...this.newTask
          };
          this.tasks.push(task);
        }
        this.resetNewTask();
        this.showModal = false;
        this.editingTaskIndex = null;
      }
    },
    deleteTask(index: number) {
      this.tasks.splice(index, 1);
    },
    editTask(index: number) {
      this.newTask = { ...this.tasks[index] };
      this.editingTaskIndex = index;
      this.showModal = true;
    },
    resetNewTask() {
      this.newTask = {
        title: '',
        description: '',
        deadline: '',
        priority: '',
        subject: '',
        completed: false
      };
    },
    closeModal() {
      this.showModal = false;
      this.editingTaskIndex = null;
      this.resetNewTask();
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.modal input,
.modal textarea,
.modal select {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 0.6rem 1.2rem;
  margin-right: 0.4rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

button:first-of-type {
  background-color: #3b82f6; /* blue */
  color: white;
}

button:last-of-type {
  background-color: #8321ec; /* red */
  color: white;
}

.task-list ul {
  list-style: none;
  padding: 0;
}

.task-list li {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  position: relative;
}

.task-list li.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.actions {
  margin-top: 0.5rem;
}

.actions button {
  background-color: #10b981; /* green for edit */
  color: white;
}

.actions button:last-of-type {
  background-color: #ef4444; /* red for delete */
}

/* Add this at the end of your <style scoped> block */

.add-task-button {
  background-color: #3b82f6; /* blue */
  color: white;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  width: 300px;
  text-align: center;
  margin: 2rem auto;
  display: block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.add-task-button:hover {
  background-color: #2563eb; /* slightly darker blue */
}

.header-section {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.header-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Ensure there’s no restriction on the layout of the task list */
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.task-list {
  width: 100%;
  max-width: 800px;
  margin-top: 2rem; /* Adding space between button and task list */
}
</style>
