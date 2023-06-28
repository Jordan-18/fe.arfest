<template>
    <v-layout class="overflow-visible" style="height: 56px;position: relative; z-index: 1;">
        <v-bottom-navigation
            :active="active"
            v-model="value"
            :bg-color="color"
            horizontal
            grow
            mode="shift"
        >

        <v-btn  @click="onEndpoint('/')">
            <i class="bi bi-file-post" style="color: white;font-size: 30px;"></i>
            <span style="color: white;">
                Dashboard
            </span>
        </v-btn>

        <v-btn  @click="onEndpoint('/point')">
            <i class="bi bi-bullseye" style="color: white; font-size: 30px;"></i>
            <span style="color: white;">
                Point
            </span>
        </v-btn>

        <v-btn @click="Logout">
            <i class="bi bi-box-arrow-in-right" style="color: white;font-size: 30px;"></i>
            <span style="color: white;">
                Logout
            </span>
        </v-btn>
        </v-bottom-navigation>
    </v-layout>
</template>

<script>
  export default {
    data: () => ({ 
        value: 0,
        active: false
    }),

    computed: {
      color () {
        switch (this.value) {
          case 0: return '#eeb72d'
          case 1: return '#eeb72d'
          case 2: return '#eeb72d'
          default: return '#eeb72d'
        }
      },
    },
    mounted() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.$nextTick(() => {
                this.active = window.innerWidth <= 768; // Adjust the breakpoint as needed
            });
        },
        Logout(){
            this.$swal.fire({
                title: 'Logout',
                text: "Are you sure ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes !'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.$api.post('/logout',{
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then((response) => {
                        
                        this.$store.modules.Auth.dispatch('loginData',{})
                        this.$store.modules.Access.dispatch('setData',{})
                        localStorage.removeItem('accessRoute')
                        window.location.href = '/login';

                        this.$swal.fire(
                            'Log out Successfully!',
                            response.data.meta.message,
                            'success'
                        )

                        
                        
                    })
                }
            })
			
		},
        async onEndpoint(endpoint){
            this.$router.push({
                path: endpoint
            });
        }
    },
  }
</script>