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
                                <span class="card-label fw-bold fs-3 mb-1">jenisbusur</span>
                                <span class="text-muted fw-semibold fs-7">jenisbusur &raquo;</span>
                            </h3>
                            <div class="card-toolbar">
                                <v-btn class="success" variant="tonal" color="success" 
                                    @click="() => {
                                        this.breadcrump = 'Create'
                                        this.onSubmit = this.create
                                        this.onSubmitColor = 'green'
                                        this.textSubmit = 'Submit'

                                        this.toogleForm()
                                    }" 
                                    v-on:click="this.jenisbusur = []"
                                >
                                    <i class="bi bi-plus-circle"></i>
                                    Create
                                </v-btn>
                            </div>
                        </div>
                        <div class="card-body py-3">

                            <Datatable
                                title = 'jenisbusur'
                                modules = 'jenisbusur'
                                :headers = headers
                            >
                                <template #default="{data}">
                                    <div class="row">
                                        <v-btn class="" size="small" icon="mdi-vuetify" fab dark small variant="tonal" color="danger" v-on:click="destroy(data.raw)">
                                            <i class="bi bi-trash-fill"></i>
                                        </v-btn>
    
                                        <v-btn class="" size="small" icon="mdi-vuetify" fab dark small variant="tonal" color="warning" 
                                            @click="() => {
                                                this.breadcrump = 'Update'
                                                this.onSubmit = this.update
                                                this.onSubmitColor = 'secondary'
                                                this.textSubmit = 'Update'
    
                                                this.toogleForm()
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
                                    <span class="card-label fw-bold fs-3 mb-1">jenisbusur</span>
                                    <span class="text-muted fw-semibold fs-7">jenisbusur &raquo; {{ breadcrump }}</span>
                                </h3>
                            </div>
                        </div>
                        <div class="card-body py-3">

                            <Form
                                formId="jenisbusurForm"
                                @submit.prevent="onSubmit"
                            >

                                <div class="row">
                                    <Hidden 
                                        id="jenis_busur_id"
                                        v-model="jenisbusur.jenis_busur_id"
                                        :value="jenisbusur.jenis_busur_id"
                                    />

                                    <div class="col-md-6">
                                        <Label class="mt-3" title="Nama Busur" />
                                        <Text
                                            id="jenis_busur_name"
                                            class="mt-3"
                                            placeholder="Nama Busur"
                                            v-model="jenisbusur.jenis_busur_name"
                                            :value="jenisbusur.jenis_busur_name"
                                            required
                                        />
                                    </div>

                                    <div class="col-md-6">
                                        <Label class="mt-3" title="Kategori Busur" />
                                        <Text
                                            id="jenis_busur_kategori"
                                            class="mt-3"
                                            placeholder="Kategori Busur"
                                            v-model="jenisbusur.jenis_busur_kategori"
                                            :value="jenisbusur.jenis_busur_kategori"
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
                    { key: "jenis_busur_name", title: "Jenis Busur" },
                    { key: "jenis_busur_kategori", title: "Kategori" },
                    { key: "actions", title: "Actions", sortable: false },
                ],
                toogle: false,
                jenisbusur: null,
                jenisbusurs: [],
                jenisbusurSelect : [],

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
                    const data = this.$helper.onSubmit('jenisbusurForm')

                    const response = await this.$api.post('/jenisbusur', data ,{
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
                this.jenisbusur = {
                    jenis_busur_id         : data.jenis_busur_id,
                    jenis_busur_name       : data.jenis_busur_name,
                    jenis_busur_kategori   : data.jenis_busur_kategori,
                }
            },
            async update(){
                try {
                    const data = this.$helper.onSubmit('jenisbusurForm')
                    const update = {
                        jenis_busur_name   : data.jenis_busur_name,
                        jenis_busur_kategori : data.jenis_busur_kategori,
                    }

                    const response = await this.$api.put('/jenisbusur/'+data.jenis_busur_id, update,{
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
                            const response = await this.$api.delete('/jenisbusur/'+data.jenis_busur_id,{
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
            async index(){
                const responsejenisbusur = await this.$api.get('/jenisbusur?limit=0', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                this.jenisbusurs = responsejenisbusur.data.data.data;

                this.selectjenisbusur()
            },
            async selectjenisbusur(){
                this.jenisbusurSelect = this.jenisbusurs.map((v,i) => {
                    let result = {
                        text: v.jenisbusur_name,
                        value: v.jenisbusur_id
                    };

                    return result;
                })
            },
            toogleForm(){
                if(this.toogle){
                    this.toogle = false
                }else{
                    this.toogle = true
                }
            }
        },
    }
</script>