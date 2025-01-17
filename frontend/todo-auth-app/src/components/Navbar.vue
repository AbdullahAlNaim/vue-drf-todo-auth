<template>
    <nav>
        <span v-if="!userStore.userAuthenticated">
        <RouterLink class="nav-options" to="/Login">Login</RouterLink>
        <RouterLink class="nav-options" to="/signup">Sign Up</RouterLink>
        </span>
        <span v-else>
            <RouterLink class="nav-options" to="/tasks">Tasks</RouterLink>
            <RouterLink class="nav-options" to="/logout" @click="userStore.logout()">Logout</RouterLink>
        </span>
    </nav>
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

<style setup>
.nav-options {
    /* border: solid black 2px; */
    padding: 10px;
    margin: 5px;
}
</style>