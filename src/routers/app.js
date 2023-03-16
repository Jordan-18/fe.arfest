import { createRouter, createWebHistory } from 'vue-router'
import test from '../views/test.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'

const routes = [
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
    },
    { 
        path: '/', 
        name: 'home' ,
        component: test,
        meta: {
            title: 'Halaman Utama',
        }
    },
    { 
        path: '/tes', 
        name: 'test' ,
        component: test,
        meta: {
            title: 'Halaman Utama',
        }
    },
    {  
        path: '/:pathMatch(.*)', 
        component: test 
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Arfest'
    next()
});


export default router