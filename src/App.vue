<script setup>
  import Auth from './components/Auth/Auth.vue'
  import App from './components/Dashboard/App.vue'
</script>

<template>
	<template v-if="!isLoginPage">
		<Auth ></Auth>
	</template>
	<template v-if="isLoginPage">
		<App ></App>
	</template>
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
			let isLoginIn = this.$cookies.get('loggedIn') ?? false

			if(isLoginIn){
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
		},
	},
};
</script>