import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import router from '../router/index'

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        taskAuthToken: '',
        userId: '',
        task_id: '',
        task_name: '',
        description: '',
        tasks: [],
    }),
    actions: {
        fetchUserAuth () {
            const userStore = useUserStore()
            console.log('signed in and here is the token: ', userStore.authToken);
            console.log('signed in and here is the userId: ', userStore.userId);
            this.taskAuthToken = userStore.authToken;
            this.userId = userStore.userId
            console.log(`auth token grabbed and is: ${this.taskAuthToken}`)
            console.log(`userId grabbed and is: ${this.userId}`)
        },
        async createTask () {
            this.fetchUserAuth();
            console.log(this.taskAuthToken);
            try {
                const response = await fetch('http://localhost:8000/api/tasks/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/),
                        'Authorization': `Token ${this.taskAuthToken}`
                    },
                    body: JSON.stringify({
                        owner: this.userId,
                        task_name: this.task_name,
                        description: this.description,
                    })
                }) 

                if (!response.ok) {
                    throw new Error('HTTP error! status: ', response.status)
                }

                console.log('task name: ',this.task_name, '| task description:', this.description);
                this.task_name = '';
                this.description = '';
                this.readTasks();

            } catch (error) {
                console.error(`Error found creating task: ${error}`)
            }
        },
        async readTasks () {
            console.log(`sending read request with token: ${this.taskAuthToken}`)
            try {
                const response = await fetch('http://localhost:8000/api/tasks/', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                        'Authorization': `Token ${this.taskAuthToken}`,
                    }
                })

                if (!response.ok) {
                    throw new Error(`HTTP tasks read Error! status: ${response.status}`)
                }

                
                const responseData = await response.json();
                console.log(responseData);
                this.tasks = responseData;
                console.log(this.tasks);

            } catch (error) {
                console.error(`Error found reading tasks: ${error}`)
            }
        },
        async oneTask (id, task_name, description) {
            router.replace(`/task/${id}`)
            this.task_id = id;
            this.task_name = task_name;
            this.description = description;
        },
        async updateTask () {
            try {
                const response = await fetch(`http://localhost:8000/api/tasks/${this.task_id}/`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                        'Authorization': `Token ${this.taskAuthToken}`
                    },
                    body: JSON.stringify({
                        owner: this.userId,
                        task_name: this.task_name,
                        description: this.description,
                    })
                })

                if (!response.ok) {
                    throw new Error(`HTTP update error! status ${response.status}`)
                }

                console.log(`updated task: ${this.task_id}`)
                this.task_name = '';
                this.description = '';

                router.replace('/tasks')

            } catch (error) {
                console.error(`Error found updating tasks: ${error}`)
            }
        },
        async deleteTask (id) {
            try {
                const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                        'Authorization': `Token ${this.taskAuthToken}`
                    }
                })

                if (!response.ok) {
                    throw new Error(`HTTP delete error! status: ${response.status}`)
                }

                console.log(`deleted task ${id} successfully.`)
                this.readTasks();

            } catch (error) {
                console.error(`Error found deleting a task: ${error}`)
            }
        }
    }
})