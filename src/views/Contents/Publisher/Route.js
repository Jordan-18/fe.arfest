import {onAccess} from '@/utils/Access';
import {isAuth} from '@/utils/isAuth';
import Table from './Table.vue'
// import Form from './Form.vue'

export const route = 
[
    { 
        path: '/event-publish', 
        component: Table,
        beforeEnter: [
            onAccess,
            isAuth
        ],
        meta: {
            title: 'Event to Publish',
            breadcrumb : 'data',
        }
    },
]