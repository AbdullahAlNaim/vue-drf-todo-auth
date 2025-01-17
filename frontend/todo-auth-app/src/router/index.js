import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import TaskView from '../views/TasksView.vue'
import EditTaskView from '../views/EditTaskView.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/logout',
            name: 'logout',
            component: LoginView
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: TaskView
        },
        {
            path: '/task/:id',
            name: 'task',
            component: EditTaskView
        }
    ]
})


export default router;