<template>
    <div class="d-flex flex-column flex-column-fluid flex-center w-lg-50 p-10">
        <div class="d-flex justify-content-between flex-column-fluid flex-column w-100 mw-450px">
            <div class="d-flex flex-stack py-2">
                <div class="me-2">
                    <a href="/login" class="btn btn-icon bg-light rounded-circle">
                        <span class="svg-icon svg-icon-2 svg-icon-gray-800">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.60001 11H21C21.6 11 22 11.4 22 12C22 12.6 21.6 13 21 13H9.60001V11Z" fill="currentColor" />
                                <path opacity="0.3" d="M9.6 20V4L2.3 11.3C1.9 11.7 1.9 12.3 2.3 12.7L9.6 20Z" fill="currentColor" />
                            </svg>
                        </span>
                    </a>
                </div>
                <div class="m-0">
                    <span class="text-gray-400 fw-bold fs-5 me-2" data-kt-translate="sign-up-head-desc">Already a member ?</span>
                    <a href="/login" class="link-primary fw-bold fs-5" data-kt-translate="sign-up-head-link">Sign In</a>
                </div>
            </div>
            <div class="py-20">
                <form class="form w-100" id="kt_sign_up_form" @submit.prevent="Register" data-kt-redirect-url="/login" action="#">
                    <div class="text-start mb-10">
                        <h1 class="text-dark mb-3 fs-3x" data-kt-translate="sign-up-title">Create an Account</h1>
                        <div class="text-gray-400 fw-semibold fs-6" data-kt-translate="general-desc">Get unlimited access & earn money</div>
                    </div>
                    <div class="row fv-row mb-7">
                        <div class="col-xl-6">
                            <input class="form-control form-control-lg form-control-solid" type="text" placeholder="First Name" name="first-name" v-model="firstName" autocomplete="off" data-kt-translate="sign-up-input-first-name" />
                        </div>
                        <div class="col-xl-6">
                            <input class="form-control form-control-lg form-control-solid" type="text" placeholder="Last Name" name="last-name" v-model="lastName" autocomplete="off" data-kt-translate="sign-up-input-last-name" />
                        </div>
                    </div>
                    <div class="fv-row mb-10">
                        <input class="form-control form-control-lg form-control-solid" type="text" placeholder="Username" name="username" v-model="username" autocomplete="off" data-kt-translate="sign-up-input-username" />
                    </div>
                    <div class="fv-row mb-10">
                        <input class="form-control form-control-lg form-control-solid" type="email" placeholder="Email" name="email" v-model="email" autocomplete="off" data-kt-translate="sign-up-input-email" />
                    </div>
                    <div class="fv-row mb-10" data-kt-password-meter="true">
                        <div class="mb-1">
                            <div class="position-relative mb-3">
                                <input class="form-control form-control-lg form-control-solid" type="password" placeholder="Password" name="password" v-model="password" autocomplete="off" data-kt-translate="sign-up-input-password" />
                                <span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility">
                                    <i class="bi bi-eye-slash fs-2"></i>
                                    <i class="bi bi-eye fs-2 d-none"></i>
                                </span>
                            </div>
                            <div class="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
                                <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
                            </div>
                        </div>
                        <div class="text-muted" data-kt-translate="sign-up-hint">Use 8 or more characters with a mix of letters, numbers & symbols.</div>
                    </div>
                    <div class="fv-row mb-10">
                        <input class="form-control form-control-lg form-control-solid" type="password" placeholder="Confirm Password" name="confirm-password" autocomplete="off" data-kt-translate="sign-up-input-confirm-password" />
                    </div>
                    <div class="d-flex flex-stack">
                        <button id="kt_sign_up_submit" class="btn btn-primary" data-kt-translate="sign-up-submit">
                            <span class="indicator-label">Submit</span>
                            <span class="indicator-progress">Please wait...
                            <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                        </button>
                        <div class="d-flex align-items-center">
                            <div class="text-gray-400 fw-semibold fs-6 me-6">Or</div>
                            <a href="#" class="symbol symbol-circle symbol-45px w-45px bg-light me-3">
                                <img alt="Logo" src="assets/media/svg/brand-logos/google-icon.svg" class="p-4" />
                            </a>
                            <a href="#" class="symbol symbol-circle symbol-45px w-45px bg-light me-3">
                                <img alt="Logo" src="assets/media/svg/brand-logos/facebook-3.svg" class="p-4" />
                            </a>
                            <a href="#" class="symbol symbol-circle symbol-45px w-45px bg-light">
                                <img alt="Logo" src="assets/media/svg/brand-logos/apple-black.svg" class="theme-light-show p-4" />
                                <img alt="Logo" src="assets/media/svg/brand-logos/apple-black-dark.svg" class="theme-dark-show p-4" />
                            </a>
                        </div>
                    </div>
                </form>
            </div>
            <div class="m-0">
                <button class="btn btn-flex btn-link rotate" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" data-kt-menu-offset="0px, 0px">
                    <img data-kt-element="current-lang-flag" class="w-25px h-25px rounded-circle me-3" src="assets/media/flags/united-states.svg" alt="" />
                    <span data-kt-element="current-lang-name" class="me-2">English</span>
                    <span class="svg-icon svg-icon-3 svg-icon-muted rotate-180 m-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="currentColor" />
                        </svg>
                    </span>
                </button>
                <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4" data-kt-menu="true" id="kt_auth_lang_menu">
                    <div class="menu-item px-3">
                        <a href="#" class="menu-link d-flex px-5" data-kt-lang="English">
                            <span class="symbol symbol-20px me-4">
                                <img data-kt-element="lang-flag" class="rounded-1" src="assets/media/flags/united-states.svg" alt="" />
                            </span>
                            <span data-kt-element="lang-name">English</span>
                        </a>
                    </div>
                    <div class="menu-item px-3">
                        <a href="#" class="menu-link d-flex px-5" data-kt-lang="Spanish">
                            <span class="symbol symbol-20px me-4">
                                <img data-kt-element="lang-flag" class="rounded-1" src="assets/media/flags/spain.svg" alt="" />
                            </span>
                            <span data-kt-element="lang-name">Spanish</span>
                        </a>
                    </div>
                    <div class="menu-item px-3">
                        <a href="#" class="menu-link d-flex px-5" data-kt-lang="German">
                            <span class="symbol symbol-20px me-4">
                                <img data-kt-element="lang-flag" class="rounded-1" src="assets/media/flags/germany.svg" alt="" />
                            </span>
                            <span data-kt-element="lang-name">German</span>
                        </a>
                    </div>
                    <div class="menu-item px-3">
                        <a href="#" class="menu-link d-flex px-5" data-kt-lang="Japanese">
                            <span class="symbol symbol-20px me-4">
                                <img data-kt-element="lang-flag" class="rounded-1" src="assets/media/flags/japan.svg" alt="" />
                            </span>
                            <span data-kt-element="lang-name">Japanese</span>
                        </a>
                    </div>
                    <div class="menu-item px-3">
                        <a href="#" class="menu-link d-flex px-5" data-kt-lang="French">
                            <span class="symbol symbol-20px me-4">
                                <img data-kt-element="lang-flag" class="rounded-1" src="assets/media/flags/france.svg" alt="" />
                            </span>
                            <span data-kt-element="lang-name">French</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api';
export default {
    data(){
        return {
            users : []
        }
    }, 
    mounted(){},
    methods:{
        async  Register(){
            try {
                const data = {
                    name    : this.firstName+' '+this.lastName, 
                    username: this.username, 
                    email   : this.email, 
                    password: this.password,
                }

                const response = await api.post('/register', data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if(response.status == 200){
                    let loggedIn    = true
                    let token_type  = response.data.data.access_token_type
                    let token       = response.data.data.token
                    let name        = response.data.data.user.name
                    let email       = response.data.data.user.email
                    let username    = response.data.data.user.username


                    if(token){
                        localStorage.setItem('loggedIn',loggedIn)
                        localStorage.setItem('token_type',token_type)
                        localStorage.setItem('token',token )
                        localStorage.setItem('name',name)
                        localStorage.setItem('email',email )
                        localStorage.setItem('username',username)
                    }
                }else{
                    
                }
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>