<script setup>
    import Datatable from '@/components/Material/Datatable.vue'
</script>
<template>
    <!-- Table -->
    <div class="content d-flex flex-column flex-column-fluid" v-if="!toogle">
        <div class="container-fluid" id="kt_content_container">
            <div class="row g-5 g-xl-8">
                <div class="col-xl-5">

                    <div class="card card-xl-stretch mb-xl-8">
                        <div class="card-header border-0 pt-5">
                            <h3 class="card-title align-items-start flex-column">
                                <span class="card-label fw-bold fs-3 mb-1">Access</span>
                                <span class="text-muted fw-semibold fs-7">access &raquo;</span>
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
                                    v-on:click="access = []"
                                >
                                    <i class="bi bi-plus-circle"></i>
                                    Create
                                </v-btn>
                            </div>
                        </div>
                        <div class="card-body py-3">

                            <Datatable
                                title = 'access'
                                modules = 'access'
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
    
                                        <v-btn class="" size="small" icon="mdi-vuetify" fab dark small variant="tonal" color="primary" v-on:click="roleAccess(data.raw)">
                                            <i class="bi bi-arrow-right-short"></i>
                                        </v-btn>
                                    </div>
                                    
                                </template>

                            </Datatable>

                        </div>
                    </div>

                </div>

                <div class="col-xl-7">

                    <div class="card card-xl-stretch mb-xl-8">
                        <div class="card-header border-0 pt-5">
                            <h3 class="card-title align-items-start flex-column">
                                <span class="card-label fw-bold fs-3 mb-1">Role Access</span>
                                <span class="text-muted fw-semibold fs-7">{{ accessName }}</span>
                            </h3>
                            <div class="card-toolbar">
                                <v-btn 
                                    class="info" 
                                    variant="tonal" 
                                    color="info"
                                    @click="updateRoleAccess"
                                >
                                    <i class="bi bi-folder-symlink-fill"></i>
                                    Update
                                </v-btn>
                            </div>
                        </div>
                        <div class="card-body py-3">
                            <Tree 
                                :config="config" 
                                :nodes="nodes"
                            />
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
                                    <span class="card-label fw-bold fs-3 mb-1">Access</span>
                                    <span class="text-muted fw-semibold fs-7">access &raquo; {{ breadcrump }}</span>
                                </h3>
                            </div>
                        </div>
                        <div class="card-body py-3">

                            <Form
                                formId="accessForm"
                                @submit.prevent="onSubmit"
                            >

                                <div class="row">
                                    <Hidden 
                                        id="access_id"
                                        v-model="access.access_id"
                                        :value="access.access_id"
                                    />

                                    <div class="col-md-6">
                                        <Label class="mt-3" title="access Kode" />
                                        <Text
                                            id="access_kode"
                                            class="mt-3"
                                            placeholder="Access Kode"
                                            v-model="access.access_kode"
                                            :value="access.access_kode"
                                            required
                                        />
                                    </div>

                                    <div class="col-md-6">
                                        <Label class="mt-3" title="access Name" />
                                        <Text
                                            id="access_name"
                                            class="mt-3"
                                            placeholder="Access Name"
                                            v-model="access.access_name"
                                            :value="access.access_name"
                                            required
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
                    { key: "access_kode", title: "Kode" },
                    { key: "access_name", title: "access Name" },
                    { key: "actions", title: "Actions", sortable: false },
                ],
                toogle: false,

                breadcrump: '',
                onSubmit: null,
                onSubmitColor: '',
                textSubmit:'',

                nodes: [],
                config: {
                    roots: [],
                    padding: 25,
                    checkboxes: true,
                    checkMode: 0,
                },
                accessName:'',
                accessId:'',
            };
        },
        mounted() { 
        },
        methods: {
            async create(){
                try {
                    const data = this.$helper.onSubmit('accessForm')

                    const response = await this.$api.post('/access', data ,{
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    
                    this.toogleForm()
                    this.$swal.fire(response.data.meta.message)
                    
                } catch (error) {
                    const err = await error
                    let message = `
                        Error \n
                        ${err.message} \n
                    `
                    this.$swal.fire(message)
                }

            },
            async show(data){
                this.access = {
                    access_id         : data.access_id,
                    access_parent     : data.access_parent,
                    access_kode       : data.access_kode,
                    access_name       : data.access_name,
                    access_icon       : data.access_icon,
                    access_endpoint   : data.access_endpoint,
                }
            },
            async update(){
                try {
                    const data = this.$helper.onSubmit('accessForm')
                    const update = {
                        access_kode   : data.access_kode,
                        access_name   : data.access_name,
                        access_parent : data.access_parent,
                        access_icon   : data.access_icon,
                        access_endpoint : data.access_endpoint,
                    }

                    const response = await this.$api.put('/access/'+data.access_id, update,{
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })

                    this.toogleForm()
                    this.$swal.fire(response.data.meta.message)

                } catch (error) {
                    const err = await error
                    let message = `
                        Error \n
                        ${err.message} \n
                    `
                    this.$swal.fire(message)
                }
            },
            async destroy(data){
                try {this.$swal.fire({
                        title: 'Delete Data',
                        text: "Are you sure ?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes !'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const response = await this.$api.delete('/access/'+data.access_id,{
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
            async toogleForm(){
                if(this.toogle){
                    this.toogle = false
                }else{
                    this.toogle = true
                }
            },
            async roleAccess(raw){
                this.accessName = (raw.access_name).toUpperCase()
                this.accessId = raw.access_id
                const resposne = await this.$api.get('/roleaccess/'+raw.access_id, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                let data = resposne.data.data
                let children = []
        
                for (let key in data) {
                    data[key]['children'].forEach(child => {
                        children.push(child)
                    });
                }
        
                this.nodes = data
                this.config.roots = Object.keys(data).filter(key => !children.includes(key))
            },
            async updateRoleAccess(){
                try {                    
                    const data = {data : this.nodes}
                    const response = await this.$api.put('/menuaccess/'+this.accessId, data,{
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    this.$swal.fire(response.data.meta.message)
                } catch (error) {
                    const err = await error
                    let message = `
                        Error \n
                        ${err.message} \n
                    `
                    this.$swal.fire(message)
                }
            }
        },
    }
</script>