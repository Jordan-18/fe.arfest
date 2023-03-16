<script setup>
  import Auth from './components/Auth/Auth.vue'
  import App from './components/Dashboard/App.vue'
</script>

<template>
	<Auth v-if="!isLoginPage"></Auth>
	<App v-if="isLoginPage"></App>
</template>

<script>

export default {
	data() {
        return {
            num:0,
        }
    },
  	computed: {
		isLoginPage() {
			let isLoginIn = localStorage.getItem('loggedIn') ?? false

			if(isLoginIn){
				this.$router.push({ 
					path: '/' 
				})
				return isLoginIn
			}else{
				let middleware = this.$route.meta.requiresAuth ?? true
				let routeAuth = middleware && this.num != 0 ? '/login' : this.$route.path

				if((isLoginIn == false && routeAuth != "/")){
					this.$router.push({ 
						path: routeAuth 
					})
					return isLoginIn
				}
			}
			
			this.num++
		}
	}
};
</script>