// utils 
import {onAccess} from '@/utils/Access';
import {isAuth} from '@/utils/isAuth';

import Access from '@/views/Contents/Access/Table.vue'
// import Dashboard from '@/views/Contents/Dashboard/Dashboard.vue'
import * as Dashboard from '@/views/Contents/Dashboard/Route.js'
import Menu from '@/views/Contents/Menu/Table.vue'
import Publisher from '@/views/Contents/Publisher/Table.vue'
import User from '@/views/Contents/User/Table.vue'
import Point from '@/views/Contents/Point/Table.vue'
import JenisBusur from '@/views/Contents/JenisBusur/Table.vue'
// import Event from '@/views/Contents/Event/Table.vue'
import * as Event from '@/views/Contents/Event/Route.js'

export const route = 
[
    ...Dashboard.route,
    { 
        path: '/Menu', 
        component: Menu,
        beforeEnter: [
            onAccess,
            isAuth
        ],
        meta: {
            title: 'Menu',
            breadcrumb: 'Menu',
        }
    },
    { 
        path: '/User', 
        component: User,
        beforeEnter: [
            onAccess,
            isAuth
        ],
        meta: {
            title: 'User',
            breadcrumb: 'user',
        }
    },
    { 
        path: '/access', 
        component: Access,
        beforeEnter: [
            onAccess,
            isAuth
        ],
        meta: {
            title: 'Access',
            breadcrumb : 'Access',
        }
    },
    { 
        path: '/point', 
        component: Point,
        beforeEnter: [
            onAccess,
            isAuth
        ],
        meta: {
            title: 'Point',
            breadcrumb : 'point',
        }
    },
    { 
        path: '/jenis-busur', 
        component: JenisBusur,
        beforeEnter: [
            onAccess,
            isAuth
        ],
        meta: {
            title: 'Jenis Busur',
            breadcrumb : 'Jenis Busur',
        }
    },
    { 
        path: '/event-publish', 
        component: Publisher,
        beforeEnter: [
            onAccess,
            isAuth
        ],
        meta: {
            title: 'Event to Publish',
            breadcrumb : 'data',
        }
    },
    ...Event.route,
]