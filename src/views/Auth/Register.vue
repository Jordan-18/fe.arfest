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
                <form class="form w-100" id="kt_sign_up_form" @submit.prevent="Register" action="">
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
                        </button>
                        <div class="d-flex align-items-center">
                            <div class="text-gray-400 fw-semibold fs-6 me-6">Or</div>
                            <a href="#" class="symbol symbol-circle symbol-45px w-45px bg-light me-3">
                                <img alt="Logo" src="@/assets/media/svg/brand-logos/google-icon.svg" class="p-4" />
                            </a>
                            <a href="#" class="symbol symbol-circle symbol-45px w-45px bg-light me-3">
                                <img alt="Logo" src="@/assets/media/svg/brand-logos/facebook-3.svg" class="p-4" />
                            </a>
                            <a href="#" class="symbol symbol-circle symbol-45px w-45px bg-light">
                                <img alt="Logo" src="@/assets/media/svg/brand-logos/apple-black.svg" class="theme-light-show p-4" />
                                <img alt="Logo" src="@/assets/media/svg/brand-logos/apple-black-dark.svg" class="theme-dark-show p-4" />
                            </a>
                        </div>
                    </div>
                </form>
            </div>
            <div class="m-0"></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {}
    }, 

    methods:{
        async Register(){
            try {
                Swal.showLoading()
                const data = {
                    name    : this.firstName+' '+this.lastName, 
                    username: this.username, 
                    email   : this.email, 
                    password: this.password,
                }

                const response = await this.$api.post('/register', data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                if(response.status == 200){
                    let loggedIn    = true
                    let loginData   = {
                        token_type  : response.data.data.token_type,
                        token       : response.data.data.access_token,
                        name        : response.data.data.user.name,
                        access      : response.data.data.user.user_access,
                        email       : response.data.data.user.email,
                        username    : response.data.data.user.username                 
                    }
                    loginData = this.$helper.encrypData(loginData)

                    this.$cookies.set('loggedIn',loggedIn)
                    this.$cookies.set('loginData',loginData)
                    
                    window.location.replace('/');
                    
                    Swal.fire('Register Successfully')
                }else{
                    Swal.fire('Something Wrong !')
                    console.log(response);
                }
            } catch (error) {
                const err = await error
                let message = `
                    Error \n
                    ${err.message} \n
                    ${err.response.data.meta.message}
                `
                Swal.fire(message)
                console.error(err);
            }
        }
    }
}
</script>