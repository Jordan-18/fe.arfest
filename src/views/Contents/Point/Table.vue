<script setup>
    import Datatable from '@/components/Material/Datatable.vue'
</script>
<template>
    <!-- Table -->
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content" v-if="!toogle">
        <div class="container-fluid" id="kt_content_container">
            <div class="row g-5 g-xl-8">
                <div class="col-xl-12">
                    <div class="card card-xl-stretch mb-xl-8">
                        <div class="card-header border-0 pt-5">
                            <h3 class="card-title align-items-start flex-column">
                                <span class="card-label fw-bold fs-3 mb-1">Point</span>
                                <span class="text-muted fw-semibold fs-7">Point &raquo;</span>
                            </h3>
                            <div class="card-toolbar">
                                <v-btn class="info" variant="tonal" color="info" 
                                    @click="() => {
                                        this.breadcrump = 'Create'
                                        this.onSubmit = this.create
                                        this.onSubmitColor = 'green'
                                        this.textSubmit = 'Submit'

                                        this.toogleForm()
                                    }" 
                                    v-on:click="this.Point = []"
                                >
                                    <i class="bi bi-plus-circle"></i>
                                    Start Shooting
                                </v-btn>
                            </div>
                        </div>
                        <div class="card-body py-3"></div>
                    </div>
                </div>

                <div class="row flex-nowrap overflow-auto" @scroll="infinyScroll" style="height: 400px;">
                    <div class="col-md-3" v-for="index in 5" :key="index">
                        <div class="card mt-3" style="width: 18rem; overflow-x: auto;" >
                            <div class="card-body">
                                <h5 class="card-title">{{index}}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="card-link">Card link</a>
                                <a href="#" class="card-link">Another link</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Form -->
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content" v-if="toogle">
        <div class="container-fluid" id="kt_content_container">
            <div class="row g-5 g-xl-8">
                <div class="col-xl-12">

                    <div class="card card-xl-stretch mb-xl-8">
                        <div class="card-header border-0 pt-5">
                            <div class="card-toolbar">
                                <v-btn class="light " variant="tonal" color="light"  @click="toogleForm">
                                    <i class="bi bi-arrow-bar-left" style="color: black;"></i>
                                </v-btn>
                                <h3 class="card-title align-items-start flex-column">
                                    <span class="card-label fw-bold fs-3 mb-1">Point</span>
                                    <span class="text-muted fw-semibold fs-7">Point &raquo; {{ breadcrump }}</span>
                                </h3>
                            </div>
                        </div>
                        <div class="card-body py-3">

                            <Form
                                formId="PointForm"
                                @submit.prevent="onSubmit"
                            >

                                <div class="row">
                                    <div class="col-md-3">
                                        <Label title="Busur"/>
                                        <Select1
                                            class="mt-3"
                                            id="select-point_jenis_busur"
                                            placeholder="Jenis Busur"
                                            :items="selectJenis"
                                        />
                                    </div>
                                </div>

                                <v-row justify='end' class="mt-5 mb-5">
                                    <v-btn 
                                        type="submit" 
                                        justify='end' 
                                        class="mt-5" 
                                        fab dark small 
                                        variant="tonal" 
                                        :color="onSubmitColor"
                                    >
                                        {{ textSubmit }}
                                        <i class="bi bi-arrow-bar-right"></i>
                                    </v-btn>
                                </v-row>
                            </Form>

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
                headers: [
                    { key: "Point_kode", title: "Kode" },
                    { key: "Point_name", title: "Point Name" },
                    { key: "Point_level", title: "Level" },
                    { key: "Point_order", title: "Order" },
                    { key: "Point_endpoint", title: "Endpoint" },
                    { key: "Point_icon", title: "Icon" },
                    { key: "actions", title: "Actions", sortable: false },
                ],
                toogle: false,
                Point: null,
                selectJenis:[],

                breadcrump: '',
                onSubmit: null,
                onSubmitColor: '',
                textSubmit:''
            };
        },
        mounted() {
            this.index()
        },
        methods: {
            toogleForm(){
                if(this.toogle){
                    this.toogle = false
                }else{
                    this.toogle = true
                }
            },
            infinyScroll(event){
                const target = event.target;
                const scrollLeft = target.scrollLeft;
                const scrollWidth = target.scrollWidth;
                const clientWidth = target.clientWidth;

                const scrollKanan = parseInt(scrollLeft.toFixed())
                const scrollHasil = (scrollWidth - clientWidth)

                if(Math.abs(scrollKanan - scrollHasil) <= 1){
                    console.log('Scroll horizontal telah mencapai batas kanan');
                }
            },
            async index(){
                this.jenisbusurSelect()
            },
            async create(){
                try {
                    const data = this.$helper.onSubmit('PointForm')

                    const response = await this.$api.post('/Point', data ,{
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    
                    this.toogleForm()
                    Swal.fire(response.data.meta.message)
                    
                } catch (error) {
                    const err = await error
                    let message = `
                        Error \n
                        ${err.message} \n
                    `
                    Swal.fire(message)
                }

            },
            async show(data){
                this.Point = {
                    Point_id         : data.Point_id,
                    Point_parent     : data.Point_parent,
                    Point_kode       : data.Point_kode,
                    Point_name       : data.Point_name,
                    Point_icon       : data.Point_icon,
                    Point_endpoint   : data.Point_endpoint,
                }
            },
            async update(){
                try {
                    const data = this.$helper.onSubmit('PointForm')
                    const update = {
                        Point_kode   : data.Point_kode,
                        Point_name   : data.Point_name,
                        Point_parent : data.Point_parent,
                        Point_icon   : data.Point_icon,
                        Point_endpoint : data.Point_endpoint,
                    }

                    const response = await this.$api.put('/Point/'+data.Point_id, update,{
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })

                    this.toogleForm()
                    Swal.fire(response.data.meta.message)

                } catch (error) {
                    const err = await error
                    let message = `
                        Error \n
                        ${err.message} \n
                    `
                    Swal.fire(message)
                }
            },
            async destroy(data){
                try {
                    Swal.fire({
                        title: 'Delete Data',
                        text: "Are you sure ?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes !'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const response = await this.$api.delete('/Point/'+data.Point_id,{
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                            Swal.fire(response.data.meta.message)
                        }
                    })
                } catch (error) {
                    const err = await error
                    let message = `
                        Error \n
                        ${err.message} \n
                    `
                    Swal.fire(message)
                }
            },

            async jenisbusurSelect(){
                const responseMenu = await this.$api.get('/jenisbusur?limit=0', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                this.selectJenis = (responseMenu.data.data.data).map((v,i) => {
                    let result = {
                        text: v.jenis_busur_name,
                        value: v.jenis_busur_id
                    };

                    return result;
                });
            },
        },
    }
</script>