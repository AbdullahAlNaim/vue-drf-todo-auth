<template>
    <form @submit.prevent="taskStore.updateTask()">
        <input type="text" v-model="taskStore.task_name"><br>
        <input type="text" v-model="taskStore.description"><br>
        <button type="submit">Update</button>
        <button type="submit">Delete</button>
    </form>
</template>

<script>
import { useTaskStore } from '../stores/taskstore'
import { useUserStore } from '../stores/userStore'
export default {
    setup () {
        const taskStore = useTaskStore();
        const userStore = useUserStore();
        return { taskStore, userStore };
    }
}
</script>