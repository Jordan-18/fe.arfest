<script setup>
    import Datatable from '@/components/Material/Datatable.vue'
</script>
<template>

    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <div class="container-fluid" id="kt_content_container">
            <div class="row g-5 g-xl-8">
                <div class="col-xl-12">
                    <div class="card card-xl-stretch mb-xl-8">
                        <div class="card-header border-0 pt-5"></div>
                        <div class="card-body py-3">

                        </div>
                    </div>
                </div>

                <div class="col-xl-7">
                    <div class="card card-xl-stretch mb-xl-8">
                        <div class="card-header border-0 pt-5"></div>
                        <div class="card-body py-3">

                        </div>
                    </div>
                </div>
                <div class="col-xl-5">
                    <div class="card card-xl-stretch mb-xl-8">
                        <div class="card-body py-3 mt-4">
                            <Datatable
                                title = 'My Event'
                                modules = 'relationevent'
                                :headers = headers
                                :query="auth"
                            ></Datatable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                isLoading: false,
                headers:[
                    { key: "relationevent.event_name", title: "Event" },
                    { key: "relationevent.event_date_actual", title: "Event Date" },
                    { key: "relationpoint.point_total", title: "Point Total" },
                ],
                auth: '&auth='+this.$dataAuth.user_id
            };
        },
        mounted() {
            this.index();
        },
        methods: {
            async index(){

            },
            async getMyEvent() {
                
            },
            async toogleLoading(){
                if(this.isLoading){
                    this.isLoading = false
                }else{
                    this.isLoading = true
                }
            },
        },
    }
</script>