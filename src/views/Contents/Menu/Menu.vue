<script setup>
    import Datatable from '@/components/Material/Datatable.vue'
</script>
<template>
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
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
                                <v-btn class="success" variant="tonal" color="success"  data-bs-toggle="modal" data-bs-target="#modalCreate">
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
                                    <v-btn class="danger" icon="mdi-vuetify" fab dark small variant="tonal" color="danger" v-on:click="destroy(data.raw)">
                                        <i class="bi bi-trash-fill"></i>
                                    </v-btn>

                                    <v-btn class="danger" icon="mdi-vuetify" fab dark small variant="tonal" color="warning" v-on:click="show(data.raw)" data-bs-toggle="modal" data-bs-target="#modalUpdate">
                                        <i class="bi bi-pencil-square"></i>
                                    </v-btn>
                                </template>

                            </Datatable>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <Modal 
        title="Create new data"
        id="modalCreate"
        :component= formComponent
    >
        <Form
            formId="menuCreate"
            @submit.prevent="create"
        >

            <div class="row">

                <div class="col-md-6">
                    <Label class="mt-3" title="Menu Level" />
                    <Select1
                        id="menu_level"
                        placeholder="Menu Level"
                        :items="menu_level"
                    />
                </div>
                
                <div class="col-md-6">
                    <Label class="mt-3" title="Menu Level" />
                    <Select1
                        id="menu_level"
                        class="mt-3"
                        placeholder="Menu Level"
                        :items="menu_level"
                    />
                </div>

            </div>

            <v-row justify='end' class="mt-3">
                <v-btn type="submit" fab dark small variant="tonal" color="blue">Submit</v-btn>
            </v-row>
        </Form>

    </Modal>
    
</template>

<script>
    export default {
        data() {
            return {
                headers: [
                    { key: "menu_kode", title: "Kode" },
                    { key: "menu_name", title: "Menu Name" },
                    { key: "menu_level", title: "Level" },
                    { key: "menu_order", title: "Order" },
                    { key: "menu_endpoint", title: "Endpoint" },
                    { key: "menu_icon", title: "Icon" },
                    { key: "actions", title: "Actions", sortable: false },
                ],
                menu_level : [
                    { text: "Menu 01", value: "1" }, 
                    { text: "Menu 02", value: "2" },
                    { text: "Menu 03", value: "3" },
                ],
                forms:[
                    {
                        type: "hidden",
                        id:"menu_id"
                    },
                    {
                        label: "Menu Level", 
                        type:"select", 
                        id:"menu_level", 
                        col:"3",
                        onFunction: this.menuParent,
                        items : [
                            { text: "Menu 01", value: "1" }, 
                            { text: "Menu 02", value: "2" },
                            { text: "Menu 03", value: "3" },
                        ]
                    },
                    {
                        label:"Menu Kode", 
                        type:"text", 
                        id:"menu_kode",
                        col:"6"
                    },
                    {
                        label:"Menu Icon", 
                        type:"text", 
                        id:"menu_icon",
                        col:"6"
                    },
                    {
                        label:"Menu EndPoint", 
                        type:"text", 
                        id:"menu_endpoint",
                        col:"6"
                    },
                ],
                isLoading: true,
            };
        },
        mounted() { 
        },
        methods: {
            async create(){
                try {
                    let data = this.$helper.onSubmit('menuCreate')
                    console.log(data);
                    
                } catch (error) {
                    const err = await error
                    this.isLoading = false
                    let message = `
                        Error \n
                        ${err.message} \n
                    `
                    Swal.fire(message)
                }

            },
            async show(data){
                console.log(data);
            },
            async update(){
                console.log('Test Update');
            },
            async destroy(data){
                console.log(data);
            },

            async menuParent(){
                console.log('tessss');
            }
        },
    }
</script>