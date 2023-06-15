import { createRouter, createWebHistory } from 'vue-router'
import * as Auth from '@/views/Auth/Route.js'
import * as Route from '@/views/Contents/Route.js'
import page404 from '@/views/Pages/page404.vue'

var routes = [
    {  
        path: '/:pathMatch(.*)', 
        component: page404,
        meta: {
            title: 'Page Not Found',
        }
    },
]

routes = [
    ...Auth.route,
    ...Route.route,
    ...routes
]


const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Arfest'
    next()
});


export default router