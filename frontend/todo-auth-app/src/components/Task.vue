<template>
<form @submit.prevent="taskStore.createTask()">
    <input type="text" v-model="taskStore.task_name" placeholder="task name"><br>
    <input type="text" v-model="taskStore.description" placeholder="task description"><br>
    <button type="submit">Add</button>
</form>

<hr>
<div v-for="task in taskStore.tasks">
    <div>
        Task: {{ task.task_name }}
    </div>
    <div>
        Description: {{ task.description }}
    </div>
    <br>
    <button @click="taskStore.oneTask(task.id, task.task_name, task.description)">Edit</button>
    <button @click="taskStore.deleteTask(task.id)">Delete</button>
    <hr>
</div>

</template>

<script>
import { useTaskStore } from '../stores/taskstore'
import { useUserStore } from '../stores/userStore'
export default {
    setup () {
        const taskStore = useTaskStore();
        const userStore = useUserStore();
        return { taskStore, userStore };
    },
    mounted () {
        this.taskStore.fetchUserAuth();
        this.taskStore.readTasks();
    },
    method: {
        // fetchToken () {
        //     this.userStore.fetchUserAuth();
        // }
    }
}
</script>