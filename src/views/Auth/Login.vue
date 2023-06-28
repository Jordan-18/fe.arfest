<template>
    <div class="d-flex flex-column flex-column-fluid flex-center w-lg-50 p-10">
        <div class="d-flex justify-content-between flex-column-fluid flex-column w-100 mw-450px">
            <div class="d-flex flex-stack py-2">
                <div class="me-2"></div>
                <div class="m-0">
                    <span class="text-gray-400 fw-bold fs-5 me-2" data-kt-translate="sign-in-head-desc">Not a Member yet?</span>
                    <a class="link-primary fw-bold fs-5" data-kt-translate="sign-in-head-link">
                        <router-link to="/register">
                            Sign Up
                        </router-link>
                    </a>
                </div>
            </div>
            <div class="py-20">
                <form class="form w-100" id="kt_sign_in_form" @submit.prevent="Login">
                    <div class="card-body">
                        <div class="text-start mb-10">
                            <h1 class="text-dark mb-3 fs-3x" data-kt-translate="sign-in-title">Sign In</h1>
                            <div class="text-gray-400 fw-semibold fs-6" data-kt-translate="general-desc">Get unlimited access & earn money</div>
                        </div>
                        <div class="fv-row mb-8">
                            <input type="text" placeholder="Email" name="email" v-model="email" autocomplete="off" data-kt-translate="sign-in-input-email" class="form-control form-control-solid" />
                        </div>
                        <div class="fv-row mb-7">
                            <input type="password" placeholder="Password" name="password" v-model="password" autocomplete="off" data-kt-translate="sign-in-input-password" class="form-control form-control-solid" />
                        </div>
                        <div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-10">
                            <div></div>
                            <a href="" class="link-primary" data-kt-translate="sign-in-forgot-password">Forgot Password ?</a>
                        </div>
                        <div class="d-flex flex-stack">
                            <button type="submit" class="btn btn-primary me-2 flex-shrink-0">
                                <span class="indicator-label" data-kt-translate="sign-in-submit">Sign In</span>
                            </button>
                            <div class="d-flex align-items-center">
                                <div class="text-gray-400 fw-semibold fs-6 me-3 me-md-6" data-kt-translate="general-or">Or</div>
                                <button @click="googleAuth" type="button" class="symbol symbol-circle symbol-45px w-45px bg-light me-3">
                                    <img alt="Logo" src="@/assets/media/svg/brand-logos/google-icon.svg" class="p-4" />
                                </button>
                            </div>
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
    mounted(){
        this.responseDatalogin()
    },
    methods:{
        async Login(){
            this.$swal.showLoading()
            try {
                const data = {
                    email   : this.email, 
                    password: this.password,
                }

                const response = await this.$api.post('/login', data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if(response.status == 200){
                    let loginData   = {
                        loggedIn    : true,
                        token_type  : response.data.data.token_type,
                        token       : response.data.data.access_token,
                        user_id     : response.data.data.user.user_id,
                        name        : response.data.data.user.name,
                        access      : response.data.data.user.useraccess,
                        email       : response.data.data.user.email,
                        username    : response.data.data.user.username                 
                    }
                    // loginData = this.$helper.encrypData(loginData)

                    this.$store.modules.Auth.dispatch('loginData',loginData)
                    
                    // this.$cookies.set('loggedIn', loggedIn)
                    // this.$cookies.set('loginData', loginData)
                    
                    this.$router.push('/')

                    this.$swal.fire('Login Successfully')
                }else{
                    this.$swal.fire('Something Wrong !')
                    console.log(response);
                }
            } catch (error) {
                const err = await error
                let message = `
                    Error \n
                    ${err.message} \n
                    ${err.response.data.meta.message}
                `

                this.$swal.fire(message)
                console.error(err);
            }
        },
        async googleAuth(){
            const response = await this.$api.get('/gauth', {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            window.location.href = response.data.data.url;
        },
        responseDatalogin() {
            const params = new URLSearchParams(window.location.search);

            if (params.has('response')) {
                const response = JSON.parse(params.get('response'));
                let loginData   = {
                    loggedIn    : true,
                    token_type  : response.original.data.token_type,
                    token       : response.original.data.access_token,
                    name        : response.original.data.user.name,
                    user_id     : response.original.data.user.user_id,
                    access      : response.original.data.user.useraccess,
                    email       : response.original.data.user.email,
                    username    : response.original.data.user.username                 
                }
                // loginData = this.$helper.encrypData(loginData)

                this.$store.modules.Auth.dispatch('loginData',loginData)
                // this.$cookies.set('loggedIn', loggedIn)
                // this.$cookies.set('loginData', loginData)

                this.$router.push('/')

                this.$swal.fire('Login Successfully')
            } else {
                const response = JSON.parse(params.get('error'));
                console.log(response);
            }
        },

    }
}
</script>