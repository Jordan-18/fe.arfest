import api from '@/utils/api';
import Swal from 'sweetalert2';
import store from '@/store/index'

export const onAccess = async (to, from, next) => {
    const Auth = store.modules.Auth.getters.loginData

    if(localStorage.getItem('accessRoute')){
        let access = localStorage.getItem('accessRoute');
        access = access.split(',')
        nextRoute(access, to, next)
    }
    else{
        await api.get('/rolepureaccess/'+Auth.access,{
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            let data = response.data.data
            let access = data.map(item => item.menu_endpoint !== '#' ? item.menu_endpoint : null)
            access = access.filter((index) => index !== null)
            localStorage.setItem('accessRoute', access);
            nextRoute(access, to, next)
        })
    }
}

export const nextRoute = (accessRoute, toRoute, nextRoute) => {
    if(accessRoute.includes(toRoute.path)){
        nextRoute()
    }else{
        nextRoute('/')
        Swal.fire('Access Denied')
    }
}