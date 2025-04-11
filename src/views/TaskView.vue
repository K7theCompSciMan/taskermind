<template>
  <div id="app">
    <div class="header-section">
      <h1>Task Manager <span class="date">({{ currentDate }})</span></h1>
      <button @click="openAddModal" class="add-task-button">+ Add Task</button>
    </div>

    <!-- Inspirational Quote -->
    <div class="quote-section">
      <p>{{ inspirationalQuote }}</p>
    </div>

    <!-- Real-Time Feedback -->
    <div class="feedback-section">
      <h2>Smart Progress Feedback</h2>
      <p>{{ feedbackMessage }}</p>
    </div>

    <!-- Task List -->
    <div class="task-list">
      <h2>Tasks</h2>
      <ul>
        <li v-for="task in sortedTasks" :key="task.id" :class="{ completed: task.completed }">
          <input type="checkbox" v-model="task.completed" v-on:click="() => {task.completed = !task.completed; updateTask(task);}"/>
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p>Subject: {{ task.subject }}</p>
          <p>Deadline: {{ task.dueDate }}</p>
          <p class="priority" >Priority: {{ task.priority }}</p>
          <p v-if="task.estimatedTime !== null">Estimated Time: {{ task.estimatedTime }} hrs</p>
          <p v-else>Estimated Time: Not set</p>
          <div class="actions">
            <button @click="editTask(task.id)">Edit</button>
            <button @click="deleteTask(task.id)">Delete</button>
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
        <input v-model="newTask.dueDate" type="date" />
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
        <input v-model.number="newTask.estimatedTime" type="number" min="0" placeholder="Estimated time (hrs)" />
        <button @click="submitTask">
          {{ editingTaskIndex !== null ? 'Update Task' : '+ Add Task' }}
        </button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  subject: string;
  estimatedTime: number | null;
  completed: boolean;
}

let user = {};
export default {
  name: "TaskView",
  async mounted() {
    this.user = await (await fetch("https://taskermind-api.fly.dev/session/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })).json();
    console.log(this.user);

    this.tasks = this.user.tasks || []
    console.log(this.tasks);
    // this.tasks = allTasks
  },
  data() {
    return {
      user: this.user,
      showModal: false,
      editingTaskIndex: null as number | null,
      tasks: [] as Task[],
      feedbackMessage: '',
      currentDate: new Date().toLocaleDateString(),
      inspirationalQuotes: [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "The future depends on what you do today. - Mahatma Gandhi",
        "The best way to predict the future is to create it. - Peter Drucker",
        "Start where you are. Use what you have. Do what you can. - Arthur Ashe"
      ],
      inspirationalQuote: '',
      newTask: {
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        subject: '',
        estimatedTime: null as number | null,
        completed: false
      }
    };
  },
  computed: {
    sortedTasks(): Task[] {
      const priorityMap: Record<'High' | 'Medium' | 'Low', number> = {
        High: 1,
        Medium: 2,
        Low: 3
      };

      return this.tasks.slice().sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        return priorityMap[a.priority as 'High' | 'Medium' | 'Low'] -
               priorityMap[b.priority as 'High' | 'Medium' | 'Low'];
      });
    }
  },
  watch: {
    tasks: {
      handler: 'updateFeedback',
      deep: true
    }
  },
  methods: {
    openAddModal() {
      console.log(this.user);
      this.resetNewTask();
      this.editingTaskIndex = null;
      this.showModal = true;
    },
    async updateTask(taskToUpdate: Task) {
      let originalTask = this.tasks.find((task) => task.id === taskToUpdate.id);
      let index = this.tasks.indexOf(originalTask!);
      this.tasks[index] = taskToUpdate;
      let tasks: Task[] = [];
      this.tasks.map((task) => tasks.push({...task}));
      const res = await fetch("https://taskermind-api.fly.dev/user", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
          'Connection': 'keep-alive'
        },
        body: JSON.stringify({
          tasks
        })
      });
      // console.log('updatedTask')
      const data = await res.json();
      // console.log(data);
      this.user = data.user;
      this.tasks = this.user.tasks;
    },
    async submitTask() {
      if (
        this.newTask.title &&
        this.newTask.dueDate &&
        this.newTask.priority &&
        this.newTask.subject
      ) {
        if (this.editingTaskIndex !== null) {
          this.tasks[this.editingTaskIndex] = {
            ...this.tasks[this.editingTaskIndex],
            ...this.newTask
          };
          let tasks: Task[] = [];
          this.tasks.map((task) => tasks.push({...task}));
          const res = await fetch("https://taskermind-api.fly.dev/user", {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
              'Connection': 'keep-alive'
            },
            body: JSON.stringify({
              tasks
            })
          });
          const data = await res.json();
          this.user = data.user;
          this.tasks = this.user.tasks;
        } else {
          const task: Task = {
            id: Date.now(),
            ...this.newTask
          };

          this.tasks.push(task);
          let tasks: Task[] = [];
          this.tasks.map((task) => tasks.push({...task}));
          // console.log(tasks);
          this.user.tasks = tasks;
          // console.log(this.user);
          // console.log(JSON.stringify({
          //   tasks: tasks as Task[]
          // }));
          const res = await fetch("https://taskermind-api.fly.dev/user", {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
              'Connection': 'keep-alive'
            },
            body: JSON.stringify({tasks})
          })
          const data = await res.json();
          // console.log(data);
          this.user = data.user;
          this.tasks = this.user.tasks;
          // console.log(this.user);
          // console.log(this.tasks);
        }
        this.resetNewTask();
        this.showModal = false;
        this.editingTaskIndex = null;
      }
    },
    async deleteTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id != id);
      let tasks: Task[] = [];
      this.tasks.map((task) => tasks.push({...task}));
      const res = await fetch("https://taskermind-api.fly.dev/user", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
          'Connection': 'keep-alive'
        },
        body: JSON.stringify({tasks})
      })
      const data = await res.json();
      console.log(data);
      this.user = data.user;
      this.tasks = this.user.tasks;
    },
    editTask(id: number) {
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.newTask = { ...this.tasks[index] };
        this.editingTaskIndex = index;
        this.showModal = true;
      }
    },
    resetNewTask() {
      this.newTask = {
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        subject: '',
        estimatedTime: null,
        completed: false
      };
    },
    closeModal() {
      this.showModal = false;
      this.editingTaskIndex = null;
      this.resetNewTask();
    },
    updateFeedback() {
      const totalTasks = this.tasks.length;
      const completedTasks = this.tasks.filter(task => task.completed).length;

      if (totalTasks === 0) {
        this.feedbackMessage = "No tasks added yet. Let's get started!";
      } else if (completedTasks === totalTasks) {
        this.feedbackMessage = "Awesome! All tasks completed!";
      } else if (completedTasks > 0) {
        this.feedbackMessage = `Nice! You've completed ${completedTasks} of ${totalTasks} tasks.`;
      } else {
        this.feedbackMessage = "You're off to a great start. Try completing your first task!";
      }
    },
    getDailyQuote() {
      const todayIndex = new Date().getDate() % this.inspirationalQuotes.length;
      this.inspirationalQuote = this.inspirationalQuotes[todayIndex];
    }
  },
  created() {
    this.getDailyQuote();
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
  background-color: #3b82f6;
  color: white;
}

button:last-of-type {
  background-color: #8321ec;
  color: white;
}

#app .task-list{
    align-self: flex-start;

    justify-content: left;
}
    
 
.task-list ul {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 4 columns */
  gap: 1rem;
  list-style: none;
  padding: 0;
}


.task-list li {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 12px;
  min-width: 220px; /* make it a bit wider */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


.task-list li.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.actions {
  margin-top: 0.5rem;
}

.actions button {
  background-color: #10b981;
  color: white;
}

.actions button:last-of-type {
  background-color: #ef4444;
}

.add-task-button {
  background-color: #3b82f6;
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
  background-color: #2563eb;
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

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.task-list {
  width: 100%;
  max-width: 400px;
  margin-top: 2rem;
  text-align: left;
}

.feedback-section {
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #123970;
}

.quote-section {
  text-align: center;
  font-style: italic;
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #03664d;
}
</style>
