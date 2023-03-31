
import Login from '@/views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'
export const route = 
[
    { 
        path: '/login', 
        name: 'login', 
        component: Login,
        meta: {
            title: 'Login',
            requiresAuth: false,
        }
    },
    { 
        path: '/register', 
        name: 'register', 
        component: Register,
        meta: {
            title: 'Register',
            requiresAuth: false,
        }
    }
]
