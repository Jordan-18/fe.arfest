import Access from '@/views/Contents/Access/Table.vue'
import Dashboard from '@/views/Contents/Dashboard/Dashboard.vue'
import Menu from '@/views/Contents/Menu/Table.vue'
import User from '@/views/Contents/User/Table.vue'
import Point from '@/views/Contents/Point/Table.vue'
import Event from '@/views/Contents/Event/Table.vue'
import JenisBusur from '@/views/Contents/JenisBusur/Table.vue'

export const route = 
[
    { 
        path: '/',
        component: Dashboard,
        meta: {
            title: 'Dashboad',
        }
    },
    { 
        path: '/Menu', 
        component: Menu,
        meta: {
            title: 'Menu',
            breadcrumb: 'Menu'
        }
    },
    { 
        path: '/User', 
        component: User,
        meta: {
            title: 'User',
            breadcrumb: 'user'
        }
    },
    { 
        path: '/access', 
        component: Access,
        meta: {
            title: 'Access',
            breadcrumb : 'Access'
        }
    },
    { 
        path: '/point', 
        component: Point,
        meta: {
            title: 'Point',
            breadcrumb : 'point'
        }
    },
    { 
        path: '/events', 
        component: Event,
        meta: {
            title: 'Event',
            breadcrumb : 'event'
        }
    },
    { 
        path: '/jenis-busur', 
        component: JenisBusur,
        meta: {
            title: 'Jenis Busur',
            breadcrumb : 'Jenis Busur'
        }
    },
]