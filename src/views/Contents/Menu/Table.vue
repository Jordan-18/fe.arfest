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
                                <span class="card-label fw-bold fs-3 mb-1">Menu</span>
                                <span class="text-muted fw-semibold fs-7">menu &raquo;</span>
                            </h3>
                            <div class="card-toolbar">
                                <v-btn class="success" variant="tonal" color="success" 
                                    @click="() => {
                                        breadcrump = 'Create'
                                        onSubmit = create
                                        onSubmitColor = 'green'
                                        textSubmit = 'Submit'

                                        toogleForm()
                                    }" 
                                    v-on:click="menu = []"
                                >
                                    <i class="bi bi-plus-circle"></i>
                                    Create
                                </v-btn>
                            </div>
                        </div>
                        <div class="card-body py-3">

                            <Datatable
                                title = 'Menu'
                                modules = 'menu'
                                :headers = headers
                            >
                                <template #default="{data}">
                                    <div class="row">
                                        <v-btn class="" size="small" icon="mdi-vuetify" fab dark small variant="tonal" color="danger" v-on:click="destroy(data.raw)">
                                            <i class="bi bi-trash-fill"></i>
                                        </v-btn>
    
                                        <v-btn class="" size="small" icon="mdi-vuetify" fab dark small variant="tonal" color="warning" 
                                            @click="() => {
                                                breadcrump = 'Update'
                                                onSubmit = update
                                                onSubmitColor = 'secondary'
                                                textSubmit = 'Update'
    
                                                toogleForm()
                                            }" 
                                            v-on:click="show(data.raw)"
                                        >
                                            <i class="bi bi-pencil-square"></i>
                                        </v-btn>
                                    </div>
                                </template>

                            </Datatable>

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
                                    <span class="card-label fw-bold fs-3 mb-1">Menu</span>
                                    <span class="text-muted fw-semibold fs-7">menu &raquo; {{ breadcrump }}</span>
                                </h3>
                            </div>
                        </div>
                        <div class="card-body py-3">

                            <Form
                                formId="menuForm"
                                @submit.prevent="onSubmit"
                            >

                                <div class="row">
                                    <Hidden 
                                        id="menu_id"
                                        v-model="menu.menu_id"
                                        :value="menu.menu_id"
                                    />
                                    <div class="col-md-12">
                                        <Label class="mt-3" title="Menu Parent" />
                                        <Select1 
                                            class="mt-3"
                                            id="select-menu_parent"
                                            placeholder="Menu Parent"
                                            :items="menuSelect"
                                            v-model="menu.menu_parent"
                                            :value="menu.menu_parent"
                                        />
                                    </div>

                                    <div class="col-md-6">
                                        <Label class="mt-3" title="Menu Kode" />
                                        <Text
                                            id="menu_kode"
                                            class="mt-3"
                                            placeholder="Menu Kode"
                                            v-model="menu.menu_kode"
                                            :value="menu.menu_kode"
                                            required
                                        />
                                    </div>

                                    <div class="col-md-6">
                                        <Label class="mt-3" title="Menu Name" />
                                        <Text
                                            id="menu_name"
                                            class="mt-3"
                                            placeholder="Menu Name"
                                            v-model="menu.menu_name"
                                            :value="menu.menu_name"
                                            required
                                        />
                                    </div>

                                    <div class="col-md-6">
                                        <Label class="mt-3" title="Menu Icon" />
                                        <Text
                                            id="menu_icon"
                                            class="mt-3"
                                            placeholder="Menu Icon"
                                            v-model="menu.menu_icon"
                                            :value="menu.menu_icon"
                                        />
                                        <div class="form-text">
                                            get Icon at <a href="https://icons.getbootstrap.com/" target="_blank">here</a>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <Label class="mt-3" title="Menu Endpoint" />
                                        <Text
                                            id="menu_endpoint"
                                            class="mt-3"
                                            placeholder="Menu Endpoint"
                                            v-model="menu.menu_endpoint"
                                            :value="menu.menu_endpoint"
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
                                        <template v-if="isLoading">
                                            <v-progress-circular
                                                justify='end' 
                                                indeterminate 
                                                :width="4"
                                                :size="18"
                                                :color="onSubmitColor"
                                                style="margin-right:9px;"
                                            >
                                            </v-progress-circular>
                                        </template>
                                        {{ textSubmit }}
                                        <template v-if="!isLoading">
                                            <i class="bi bi-arrow-bar-right"></i>
                                        </template>
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
                isLoading: false,
                headers: [
                    { key: "menu_kode", title: "Kode" },
                    { key: "menu_name", title: "Menu Name" },
                    { key: "menu_level", title: "Level" },
                    { key: "menu_order", title: "Order" },
                    { key: "menu_endpoint", title: "Endpoint" },
                    { key: "menu_icon", title: "Icon" },
                    { key: "actions", title: "Actions", sortable: false },
                ],
                toogle: false,
                menu: null,
                menus: [],
                menuSelect : [],

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
            async create(){
                try {
                    this.toogleLoading()
                    const data = this.$helper.onSubmit('menuForm')

                    const response = await this.$api.post('/menu', data ,{
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    this.toogleLoading()
                    this.toogleForm()
                    this.$swal.fire(response.data.meta.message)
                    
                } catch (error) {
                    this.toogleLoading()
                    const err = await error
                    let message = `
                        Error \n
                        ${err.message} \n
                    `
                    this.$swal.fire(message)
                }

            },
            async show(data){
                this.menu = {
                    menu_id         : data.menu_id,
                    menu_parent     : data.menu_parent,
                    menu_kode       : data.menu_kode,
                    menu_name       : data.menu_name,
                    menu_icon       : data.menu_icon,
                    menu_endpoint   : data.menu_endpoint,
                }
            },
            async update(){
                try {
                    this.toogleLoading()
                    const data = this.$helper.onSubmit('menuForm')
                    const update = {
                        menu_kode   : data.menu_kode,
                        menu_name   : data.menu_name,
                        menu_parent : data.menu_parent,
                        menu_icon   : data.menu_icon,
                        menu_endpoint : data.menu_endpoint,
                    }

                    const response = await this.$api.put('/menu/'+data.menu_id, update,{
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    this.toogleLoading()
                    this.toogleForm()
                    this.$swal.fire(response.data.meta.message)

                } catch (error) {
                    this.toogleLoading()
                    const err = await error
                    let message = `
                        Error \n
                        ${err.message} \n
                    `
                    this.$swal.fire(message)
                }
            },
            async destroy(data){
                try {
                    this.$swal.fire({
                        title: 'Delete Data',
                        text: "Are you sure ?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes !'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const response = await this.$api.delete('/menu/'+data.menu_id,{
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                            this.$swal.fire(response.data.meta.message)
                        }
                    })
                } catch (error) {
                    const err = await error
                    let message = `
                        Error \n
                        ${err.message} \n
                    `
                    this.$swal.fire(message)
                }
            },
            async index(){
                const responseMenu = await this.$api.get('/menu?limit=0', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                this.menus = responseMenu.data.data.data;

                this.selectMenu()
            },
            async selectMenu(){
                this.menuSelect = this.menus.map((v,i) => {
                    let result = {
                        text: v.menu_name,
                        value: v.menu_id
                    };

                    return result;
                })
            },
            async toogleForm(){
                if(this.toogle){
                    this.toogle = false
                }else{
                    this.toogle = true
                }
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