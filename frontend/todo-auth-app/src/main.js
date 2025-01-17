import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import Login from './components/Login.vue'
import Navbar from './components/Navbar.vue'
import Tasks from './components/Task.vue'
import Signup from './components/Signup.vue'
import EditTask from './components/EditTask.vue'

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component('Login', Login);
app.component('Navbar', Navbar);
app.component('Tasks', Tasks);
app.component('Signup', Signup);
app.component('EditTask', EditTask);

app.mount('#app');
