import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import TaskView from '@/views/TaskView.vue'
import CalView from "@/views/CalView.vue";
import AuthVue from "@/views/Auth.vue";
import EventsVue from "@/views/EventsView.vue";
import SignUpVue from "@/views/SignUpView.vue";
import VerfVue from "@/views/VerfView.vue";
import PomoVue from "@/views/Pomo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView,
    },
    {
      path: '/tasks',
      name: 'Tasks',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TaskView,
    },
    {
      path: '/calendar',
      name: 'calender',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CalView,
    },{
      path: '/auth',
      name: 'auth',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AuthVue,
    },
    {
      path: '/events',
      name: 'events',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: EventsVue,
    },
    
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SignUpVue,
    },
    {
      path: '/verify',
      name: 'verfify',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: VerfVue,
    },
    {
      path: '/pomo',
      name: 'pomo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: PomoVue,
    },
  ],
})

export default router
