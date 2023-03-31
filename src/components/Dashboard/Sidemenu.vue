<template>
<div class="aside-user mb-5 mb-lg-10" id="kt_aside_user">
    <div class="d-flex align-items-center flex-column">
        <div class="symbol symbol-75px mb-4">
            <img src="@/assets/media/avatars/300-1.jpg" alt="" />
        </div>
        <div class="text-center">
            <a href="" class="text-gray-800 text-hover-primary fs-4 fw-bolder">Paul Melone</a>
            <span class="text-gray-600 fw-semibold d-block fs-7 mb-1">Python Dev</span>
        </div>
    </div>
</div>

<div class="aside-menu flex-column-fluid ps-3 ps-lg-5 pe-1 mb-9" id="kt_aside_menu">
    <div class="w-100 hover-scroll-overlay-y pe-2 me-2" 
        id="kt_aside_menu_wrapper" 
        data-kt-scroll="true" 
        data-kt-scroll-activate="{default: false, lg: true}" 
        data-kt-scroll-height="auto" 
        data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_user, #kt_aside_footer" 
        data-kt-scroll-wrappers="#kt_aside, #kt_aside_menu, #kt_aside_menu_wrapper" 
        data-kt-scroll-offset="0"
        >
        <div class="menu menu-column menu-rounded menu-sub-indention menu-active-bg fw-semibold" id="#kt_aside_menu" data-kt-menu="true">
            
            <div data-kt-menu-trigger="click" class="menu-item here menu-accordion">
            </div>
            <div class="menu-item">
                <router-link class="menu-link" to="/" :class="{'active' : isActive('/')}">
                    <span class="menu-icon">
                        <span class="svg-icon svg-icon-5">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.4 11H3C2.4 11 2 11.4 2 12C2 12.6 2.4 13 3 13H14.4V11Z" fill="currentColor" />
                                <path opacity="0.3" d="M14.4 20V4L21.7 11.3C22.1 11.7 22.1 12.3 21.7 12.7L14.4 20Z" fill="currentColor" />
                            </svg>
                        </span>
                    </span>
                    <span class="menu-title">Dashboard</span>
                </router-link>
            </div>
            
            <div data-kt-menu-trigger="click" class="menu-item here menu-accordion" v-for="(v1, i1) in menuAccess" :key="i1">

                <span class="menu-link">
                    <span class="menu-icon">
                        <span class="svg-icon svg-icon-5">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.4 11H3C2.4 11 2 11.4 2 12C2 12.6 2.4 13 3 13H14.4V11Z" fill="currentColor" />
                                <path opacity="0.3" d="M14.4 20V4L21.7 11.3C22.1 11.7 22.1 12.3 21.7 12.7L14.4 20Z" fill="currentColor" />
                            </svg>
                        </span>
                    </span>
                    <span class="menu-title">{{ v1.menu_relation.menu_name }}</span>
                    <span class="menu-arrow"></span>
                </span>
                <div class="menu-sub menu-sub-accordion" :class="{'show' : onDataActive(v1.menu_relation.menus, v1.menu_relation.menus)}">
                    <div v-for="(v2, i2) in v1.menu_relation.menus" :key="i2">
                        
                        <div class="menu-item" v-if="v2.menus.length == 0">
                            <router-link class="menu-link" :to="v2.menu_endpoint" :class="{'active' : isActive(v2.menu_endpoint)}">
                                <span class="menu-bullet">
                                    <span class="bullet bullet-dot"></span>
                                </span>
                                <span class="menu-title">{{ v2.menu_name }}</span>
                            </router-link>
                        </div>

                        <div data-kt-menu-trigger="click" class="menu-item menu-accordion" v-if="v2.menus.length > 0">

                            <span class="menu-link">
                                <span class="menu-bullet">
                                    <span class="bullet bullet-dot"></span>
                                </span>
                                <span class="menu-title">{{ v2.menu_name }}</span>
                                <span class="menu-arrow"></span>
                            </span>

                            <div class="menu-sub menu-sub-accordion" :class="{'show' : onDataActive(v2.menus)}">
                                <div v-for="(v3, i3) in v2.menus" :key="i3" class="menu-item">
                                    <div class="menu-item">
                                        <router-link class="menu-link" :to="v3.menu_endpoint" :class="{'active' : isActive(v3.menu_endpoint)}">
                                            <span class="menu-bullet">
                                                <span class="bullet bullet-dot"></span>
                                            </span>
                                            <span class="menu-title">{{ v3.menu_name }}</span>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div data-kt-menu-trigger="click" class="menu-item here menu-accordion" :class="{'show' : ['/access','/menu'].includes(this.$route.path)}">
                <span class="menu-link">
                    <span class="menu-icon">
                        <span class="svg-icon svg-icon-5">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.4 11H3C2.4 11 2 11.4 2 12C2 12.6 2.4 13 3 13H14.4V11Z" fill="currentColor" />
                                <path opacity="0.3" d="M14.4 20V4L21.7 11.3C22.1 11.7 22.1 12.3 21.7 12.7L14.4 20Z" fill="currentColor" />
                            </svg>
                        </span>
                    </span>
                    <span class="menu-title">Setting</span>
                    <span class="menu-arrow"></span>
                </span>

                <div class="menu-sub menu-sub-accordion">

                    <div class="menu-item">
                        <router-link class="menu-link" to="/access" :class="{'active' : isActive('/access')}">
                            <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">Access</span>
                        </router-link>
                    </div>

                    <div class="menu-item">
                        <router-link class="menu-link" to="/menu" :class="{'active' : isActive('/menu')}">
                            <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">Menu</span>
                        </router-link>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<div class="aside-footer flex-column-auto px-6 px-lg-9" id="kt_aside_footer">
    <div class="d-flex flex-stack ms-7">
        <a v-on:click="Logout" class="btn btn-sm btn-icon btn-active-color-primary btn-icon-gray-600 btn-text-gray-600">
            <span class="svg-icon svg-icon-1 me-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect opacity="0.3" width="12" height="2" rx="1" transform="matrix(-1 0 0 1 15.5 11)" fill="currentColor" />
                    <path d="M13.6313 11.6927L11.8756 10.2297C11.4054 9.83785 11.3732 9.12683 11.806 8.69401C12.1957 8.3043 12.8216 8.28591 13.2336 8.65206L16.1592 11.2526C16.6067 11.6504 16.6067 12.3496 16.1592 12.7474L13.2336 15.3479C12.8216 15.7141 12.1957 15.6957 11.806 15.306C11.3732 14.8732 11.4054 14.1621 11.8756 13.7703L13.6313 12.3073C13.8232 12.1474 13.8232 11.8526 13.6313 11.6927Z" fill="currentColor" />
                    <path d="M8 5V6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 10.4477 5 11 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H11C10.4477 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17C8.44772 17 8 17.4477 8 18V19C8 20.1046 8.89543 21 10 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H10C8.89543 3 8 3.89543 8 5Z" fill="currentColor" />
                </svg>
            </span>
            <span class="d-flex flex-shrink-0 fw-bold">Log Out</span>
        </a>
        <div class="ms-1">
        </div>
    </div>
</div>
</template>
<script>
import api from '@/api';
import * as Helper from '@/helpers/helpers';
import Cookies from 'js-cookie';

export default {
    data(){
        return {
            dataAuth : Helper.decrypData(Cookies.get('loginData')),
            menuAccess : (Cookies.get('menuData') ? Helper.decrypData(Cookies.get('menuData')) : []),
            activeMenu : '/',
        }
    },
    created() {

    },
    beforeMount() {
        
    },
    mounted(){
        if(!Cookies.get('menuData')){
            this.setMenu()
        }
    },
    methods:{
        async setMenu(){
            try {
                api.defaults.headers.common['Authorization'] = `${this.dataAuth.token_type} ${this.dataAuth.token}`;
                const response = await api.get('/menuaccess/'+this.dataAuth.access,{
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                let data = response.data.data[0].menu_by_access;

                Cookies.set('menuData', Helper.encrypData(data))
                this.menuAccess = data

            } catch (error) {
                const err = await error
                console.error(err);
                let message = `
                    Error \n
                    ${err.message} \n
                `
                Swal.fire(message)
            }
        },
        isActive(endPoint){
            return this.$route.path == endPoint
        },
        onDataActive(data, data2 = []){
            let response =  data.map(menu => menu.menu_endpoint)

            if(data2.length > 0){
                data2.forEach(item => {
                    let items = item.menus.map(menu => menu.menu_endpoint)
                    response = [...response, ...items]
                });
            }
            
            return response.includes(this.$route.path)
        },
        Logout(){
            Swal.fire({
                title: 'Logout',
                text: "Are you sure ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes !'
            }).then((result) => {
            if (result.isConfirmed) {

                Cookies.remove('loggedIn')
                Cookies.remove('menuData')
                Cookies.remove('loginData')

                window.location.replace('/login');

                Swal.fire(
                'Log out Successfully!',
                'Your Log out Successfully.',
                'success'
                )
            }
            })
			
		}
    }
}
</script>