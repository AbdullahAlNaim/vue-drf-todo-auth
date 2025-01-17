<template>
    <form @submit.prevent="userStore.login()">
        <input type="username" placeholder="username" v-model="userStore.username"><br>
        <input type="password" placeholder="password" v-model="userStore.password"><br>
        <button type="submit">Login</button>
    </form>
</template>

<script>
import { useUserStore } from '../stores/userStore'

export default {
    setup () {
        const userStore = useUserStore();
        return { userStore }
    }
}
</script>