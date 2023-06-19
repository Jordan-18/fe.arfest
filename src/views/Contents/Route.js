import api from '@/api';
import Cookies from 'js-cookie'
import * as Helper from '@/helpers/helpers';
import Swal from 'sweetalert2';

import Access from '@/views/Contents/Access/Table.vue'
import Dashboard from '@/views/Contents/Dashboard/Dashboard.vue'
import Menu from '@/views/Contents/Menu/Table.vue'
import User from '@/views/Contents/User/Table.vue'
import Point from '@/views/Contents/Point/Table.vue'
import Event from '@/views/Contents/Event/Table.vue'
import JenisBusur from '@/views/Contents/JenisBusur/Table.vue'

const onAccess = async (to, from, next) => {
    const Auth = Helper.decrypData(Cookies.get('loginData'))
    if(localStorage.getItem('accessRoute')){
        let access = localStorage.getItem('accessRoute');
        nextRoute(access, to, next)
    }
    else{
        await api.get('/rolepureaccess/'+Auth.access,{
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            let data = response.data.data
            let access = data.map(item => item.menu_endpoint != '#' ? item.menu_endpoint : null)
            access = access.filter((index) => index != null)
            localStorage.setItem('accessRoute', access);
            nextRoute(access, to, next)
        })
    }
}

const nextRoute = (accessRoute, toRoute, nextRoute) => {
    if(accessRoute.includes(toRoute.path)){
        nextRoute()
    }else{
        nextRoute('/')
        Swal.fire('Access Denied')
    }
}

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
        beforeEnter: onAccess,
        meta: {
            title: 'Menu',
            breadcrumb: 'Menu'
        }
    },
    { 
        path: '/User', 
        component: User,
        beforeEnter: onAccess,
        meta: {
            title: 'User',
            breadcrumb: 'user'
        }
    },
    { 
        path: '/access', 
        component: Access,
        beforeEnter: onAccess,
        meta: {
            title: 'Access',
            breadcrumb : 'Access'
        }
    },
    { 
        path: '/point', 
        component: Point,
        beforeEnter: onAccess,
        meta: {
            title: 'Point',
            breadcrumb : 'point'
        }
    },
    { 
        path: '/events', 
        component: Event,
        beforeEnter: onAccess,
        meta: {
            title: 'Event',
            breadcrumb : 'event'
        }
    },
    { 
        path: '/jenis-busur', 
        component: JenisBusur,
        beforeEnter: onAccess,
        meta: {
            title: 'Jenis Busur',
            breadcrumb : 'Jenis Busur'
        }
    },
]