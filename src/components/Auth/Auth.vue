<template>
	<div class="d-flex flex-column flex-root">
		<div class="d-flex flex-column flex-lg-row flex-column-fluid">
			<a href="../../demo15/dist/index.html" class="d-block d-lg-none mx-auto py-20">
				<img alt="Logo" src="src/assets/media/logos/default.svg" class="theme-light-show h-25px" />
				<img alt="Logo" src="src/assets/media/logos/default-dark.svg" class="theme-dark-show h-25px" />
			</a>
			<router-view></router-view>
			<div class="d-none d-lg-flex flex-lg-row-fluid w-50 bgi-size-cover bgi-position-y-center bgi-position-x-start bgi-no-repeat" style="background-image: url(src/assets/media/auth/bg2.jpg)"></div>
		</div>
	</div>
</template>