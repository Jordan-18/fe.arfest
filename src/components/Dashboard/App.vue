<script setup>
  import Header from './Header.vue'
  import Sidemenu from './Sidemenu.vue'
  import Footer from './Footer.vue'
</script>
<template>
    <div class="d-flex flex-column flex-root">
			<div class="page d-flex flex-row flex-column-fluid">
				<div id="kt_aside" class="aside pt-7 pb-4 pb-lg-7 pt-lg-17" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_toggle">
					<div class="aside-logo flex-column-auto px-9 mb-9 mb-lg-17 mx-auto" id="kt_aside_logo">
						<a href="../../demo15/dist/index.html">
							<img alt="Logo" src="src/assets/media/logos/default.svg" class="h-30px logo theme-light-show" />
							<img alt="Logo" src="src/assets/media/logos/default-dark.svg" class="h-30px logo theme-dark-show" />
						</a>
					</div>
						<Sidemenu> </Sidemenu>
				</div>
				<div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
					<Header></Header>

					<router-view></router-view>

					<Footer></Footer>
				</div>
			</div>
		</div>
</template>