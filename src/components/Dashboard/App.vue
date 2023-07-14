<script setup>
  import Header from './Header.vue'
  import Sidemenu from './Sidemenu.vue'
  import Bottommenu from './Bottommenu.vue'
  import Footer from './Footer.vue'
</script>
<style>
	.aside .aside-menu .menu .menu-item .menu-link.active .menu-title {
		color: #f9fafb !important;
	}
	.aside .aside-menu .menu .menu-item.here>.menu-link .menu-title {
		color: #00000079 !important;
	}
	.aside .aside-menu .menu .menu-item .menu-link .menu-title {
		color: #00000079 !important;
	}
</style>
<template>
    <div class="d-flex flex-column flex-root">
		<div class="page d-flex flex-row flex-column-fluid">
			<div 
				id="kt_aside" 
				class="aside pt-7 pb-4 pb-lg-7 pt-lg-17" 
				data-kt-drawer="true" 
				data-kt-drawer-name="aside" 
				data-kt-drawer-activate="{default: true, lg: false}" 
				data-kt-drawer-overlay="true" 
				data-kt-drawer-width="{default:'200px', '300px': '250px'}" 
				data-kt-drawer-direction="start" 
				data-kt-drawer-toggle="#kt_aside_toggle"
				:style="backgroundColor"
				>
				<div class="aside-logo flex-column-auto px-9 mb-9 mb-lg-17 mx-auto" id="kt_aside_logo">
					<!-- <router-link to="/">
						<img alt="Logo" src="@/assets/media/logos/default.svg" class="h-30px logo theme-light-show" />
						<img alt="Logo" src="@/assets/media/logos/default-dark.svg" class="h-30px logo theme-dark-show" />
					</router-link> -->
				</div>
				<Sidemenu> </Sidemenu>

			</div>
			<div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
				<Header></Header>

				<router-view></router-view>

				<Footer></Footer>

				<Bottommenu></Bottommenu>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				backgroundColor : localStorage.getItem('data-theme') == 'light' ? 'background-color:#eeb72d !important;' : 'background-color:#112649 !important;',
			}
		},
	}
</script>