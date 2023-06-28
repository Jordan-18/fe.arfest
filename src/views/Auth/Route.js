import {isAuth} from '@/utils/isAuth';

import Login from '@/views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'
export const route = 
[
    { 
        path: '/login', 
        name: 'login', 
        component: Login,
        beforeEnter: [
            isAuth
        ],
        meta: {
            title: 'Login',
            requireAuth: false,
        }
    },
    { 
        path: '/register', 
        name: 'register', 
        component: Register,
        beforeEnter: [
            isAuth
        ],
        meta: {
            title: 'Register',
            requireAuth: false,
        }
    }
]
