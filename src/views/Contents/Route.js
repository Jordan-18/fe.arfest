import Access from '@/views/Contents/Access/Access.vue'
import Dashboard from '@/views/Contents/Dashboard/Dashboard.vue'
import Menu from '@/views/Contents/Menu/Menu.vue'

export const route = 
[
    { 
        path: '/access', 
        name: 'access' ,
        component: Access,
        meta: {
            title: 'Access',
            breadcrumb : 'Access'
        }
    },
    { 
        path: '/access', 
        name: 'access' ,
        component: Access,
        meta: {
            title: 'Access',
            breadcrumb : 'Access'
        }
    },
    { 
        path: '/', 
        name: 'dashboard' ,
        component: Dashboard,
        meta: {
            title: 'Dashboad',
        }
    },
    { 
        path: '/Menu', 
        name: 'menu' ,
        component: Menu,
        meta: {
            title: 'Menu',
            breadcrumb: 'Menu'
        }
    },
]