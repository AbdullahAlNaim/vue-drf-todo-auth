import { defineStore } from 'pinia'
import router from '../router/index'


export const useUserStore = defineStore('userStore', {
    state: () => ({
        authToken: '',
        userId: '',
        username: '',
        password: '',
        registerUsername: '',
        registerPassword: '',
        userAuthenticated: false,
    }),
    getters: {
        sendAuth () {
            return this.authToken;
        }
    },
    actions: {
        async login () {
            try {
                const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                    // 'X-CSRFToken': 'GWoL2htfnJVPnLJC0v4d8VkvMeEYaVsT'
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                })
            })

            if (!response.ok) {
                 throw new Error(`HTTP error! status ${response.state}`);   
            }

            const responseData = await response.json();
            console.log(responseData);
            this.authToken = responseData.token;
            this.userId = responseData.user_id;
            
            this.userAuthenticated = true;
            this.password = ''
            console.log('logged in successfully');
            router.replace('/tasks');

            } catch (error) {
                console.error('Error found logging in: ', error);
            }
        },
        async logout () {
            try {
                const response = await fetch('http://localhost:8000/api/logout/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                        'Authorization': `Token ${this.authToken}`
                    }
                })

                if (!response.ok) {
                    throw new Error(`HTTP logout error! status: ${response.status}`)
                }

                this.userAuthenticated = false;
                this.username = ''
                this.password = ''
                router.replace('/login')

            } catch (error) {
                console.error('Error found logging out: ', error)
            }
        },
        async signUp () {

            this.registerUsername = '';
            this.registerPassword = '';

            const response = await fetch('http://localhost:8000/api/users/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                },
                body: JSON.stringify({
                    username: this.registerUsername,
                    password: this.registerPassword,
                })
            })

            if (!response.ok) {
                throw new Error(`HTTP sign up error! status: ${response.status}`)
            }

            this.username = this.registerUsername;
            this.password = this.registerPassword;
            this.login()
            this.registerPassword = ''
        }
    }
})