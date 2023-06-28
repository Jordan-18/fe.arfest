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
  	computed: {
		isLoginPage() {
			let isLoggedIn = this.$store.modules.Auth.getters.loginData.loggedIn || false;
			let requireAuth = this.$route.meta.requireAuth ?? true;
			
			if(!isLoggedIn && !requireAuth){
				this.$router.push({
					path: this.$route.path
				});
				return isLoggedIn;
			}
			if(isLoggedIn){
				return isLoggedIn;
			}
		},
	},
};
</script>