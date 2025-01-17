<template>
    <form @submit.prevent="userStore.signUp()">
        <input type="username" placeholder="username" v-model="userStore.registerUsername"><br>
        <input type="password" placeholder="password" v-model="userStore.registerPassword"><br>
        <button type="submit">Sign Up</button>
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