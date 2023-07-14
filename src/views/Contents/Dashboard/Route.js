import {onAccess} from '@/utils/Access';
import {isAuth} from '@/utils/isAuth';
import Dashboard from './Dashboard.vue'

export const route = 
[
    { 
        path: '/', 
        component: Dashboard,
        beforeEnter: [
            isAuth
        ],
        meta: {
            title: 'Dashboad',
        }
    },
]