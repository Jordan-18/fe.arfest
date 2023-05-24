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
        style="height: 500px;"
    >
        <Form
            formId="menuCreate"
            @submit.prevent="create"
        >

            <div class="row">

                <div class="col-md-12">
                    <Label class="mt-3" title="Menu Parent" />
                    <Select1 
                        class="mt-3"
                        id="select-menu_parent"
                        placeholder="Menu Parent"
                        :items="menuSelect"
                        @value-data="selected"
                    />
                </div>

                <div class="col-md-6">
                    <Label class="mt-3" title="Menu Kode" />
                    <Text
                        id="menu_kode"
                        class="mt-3"
                        placeholder="Menu Kode"
                        required
                    />
                </div>

                <div class="col-md-6">
                    <Label class="mt-3" title="Menu Name" />
                    <Text
                        id="menu_name"
                        class="mt-3"
                        placeholder="Menu Name"
                        required
                    />
                </div>

                <div class="col-md-6">
                    <Label class="mt-3" title="Menu Icon" />
                    <Text
                        id="menu_icon"
                        class="mt-3"
                        placeholder="Menu Icon"
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
                        required
                    />
                </div>

            </div>

            <v-row justify='end' class="mt-5">
                <v-btn type="submit" fab dark small variant="tonal" color="green">Submit</v-btn>
            </v-row>
        </Form>

    </Modal>

    <Modal 
        title="Update data"
        id="modalUpdate"
        style="height: 500px;"
        :backdrop="true"
    >
        <Form
            formId="menuUpdate"
            @submit.prevent="update"
        >

            <div class="row">

                <div class="col-md-12">
                    <Label class="mt-3" title="Menu Parent" />
                    <Select1
                        id="select-menu_parent"
                        class="mt-3"
                        placeholder="Menu Parent"
                        :items="menuSelect"
                        :value="menu.menu_parent"
                        v-model="menu.menu_parent"
                    />
                </div>

                <div class="col-md-6">
                    <Label class="mt-3" title="Menu Kode" />
                    <Text
                        id="menu_kode"
                        class="mt-3"
                        placeholder="Menu Kode"
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
                        :value="menu.menu_endpoint"
                        required
                    />
                </div>

            </div>

            <v-row justify='end' class="mt-5">
                <v-btn type="submit" fab dark small variant="tonal" color="green">Submit</v-btn>
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
                menu: null,
                menus: [],
                menuSelect : [],
            };
        },
        mounted() { 
            this.index()
        },
        methods: {
            async create(){
                try {
                    const data = this.$helper.onSubmit('menuCreate')

                    const response = await this.$api.post('/menu', data ,{
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    
                    if(response.status == 200){
                        document.getElementById('modalCreateClose').click();
                        document.getElementById('menuCreate').reset();
                        
                        Swal.fire('Menu Create Successfully')
                    }
                    else{
                        Swal.fire('Something Wrong !')
                        console.log(response);
                    }
                    
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
                try {
                    const response = await this.$api.get('/menu/'+data.menu_id, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    
                    if(response.status == 200){
                        let data = response.data.data[0]

                        this.menu = {
                            menu_id         : data.menu_id,
                            menu_parent     : data.menu_parent,
                            menu_kode       : data.menu_kode,
                            menu_name       : data.menu_name,
                            menu_icon       : data.menu_icon,
                            menu_endpoint   : data.menu_endpoint,
                        }
                    }

                } catch (error) {
                    const err = await error
                    let message = `
                        Error \n
                        ${err.message} \n
                    `
                    Swal.fire(message)
                }

            },
            async update(){
                console.log('Test Update');
            },
            async destroy(data){
                console.log(data);
            },
            async menuParent(){
                console.log('tessss');
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
        },
    }
</script>