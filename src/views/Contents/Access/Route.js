import {onAccess} from '@/utils/Access';
import {isAuth} from '@/utils/isAuth';
import Table from './Table.vue'
// import Form from './Form.vue'

export const route = 
[
    { 
        path: '/access', 
        component: Table,
        beforeEnter: [
            onAccess,
            isAuth
        ],
        meta: {
            title: 'Access',
            breadcrumb : 'Access',
        }
    },
]