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
                                <span class="card-label fw-bold fs-3 mb-1">User</span>
                                <span class="text-muted fw-semibold fs-7">user &raquo;</span>
                            </h3>
                            <div class="card-toolbar">
                                <template v-if="accessStore.create == 1">
                                    <v-btn class="success" variant="tonal" color="success" 
                                        @click="() => {
                                            breadcrump = 'Create'
                                            onSubmit = create
                                            onSubmitColor = 'green'
                                            textSubmit = 'Submit'
    
                                            toogleForm()
                                        }" 
                                        v-on:click="user = []"
                                    >
                                        <i class="bi bi-plus-circle"></i>
                                        Create
                                    </v-btn>
                                </template>
                            </div>
                        </div>
                        <div class="card-body py-3">

                            <Datatable
                                title = 'user'
                                modules = 'user'
                                :headers = headers
                            >
                                <template #default="{data}">
                                    <div class="row">
                                        <template v-if="accessStore.delete == 1">
                                            <v-btn class="" size="small" icon="mdi-vuetify" fab dark small variant="tonal" color="danger" v-on:click="destroy(data.raw)">
                                                <i class="bi bi-trash-fill"></i>
                                            </v-btn>
                                        </template>
    
                                        <template v-if="accessStore.update == 1">
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
                                        </template>
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
                                    <span class="card-label fw-bold fs-3 mb-1">user</span>
                                    <span class="text-muted fw-semibold fs-7">user &raquo; {{ breadcrump }}</span>
                                </h3>
                            </div>
                        </div>
                        <div class="card-body py-3">

                            <Form
                                formId="userForm"
                                @submit.prevent="onSubmit"
                            >

                                <div class="row">
                                    <Hidden 
                                        id="user_id"
                                        v-model="user.user_id"
                                        :value="user.user_id"
                                    />

                                    <div class="col-md-6">
                                        <Label class="mt-3" title="Email" />
                                        <Text
                                            id="email"
                                            class="mt-3"
                                            placeholder="Email"
                                            v-model="user.email"
                                            :value="user.email"
                                            required
                                        />
                                    </div>

                                    <div class="col-md-6">
                                        <Label class="mt-3" title="Nama" />
                                        <Text
                                            id="name"
                                            class="mt-3"
                                            placeholder="Nama"
                                            v-model="user.name"
                                            :value="user.name"
                                            required
                                        />
                                    </div>

                                    <div class="col-md-6">
                                        <Label class="mt-3" title="username" />
                                        <Text
                                            id="username"
                                            class="mt-3"
                                            placeholder="username"
                                            v-model="user.username"
                                            :value="user.username"
                                            required
                                        />
                                    </div>

                                    <div class="col-md-6">
                                        <Label class="mt-3" title="Access" />
                                        <Select1
                                            id="select-useraccess"
                                            class="mt-3"
                                            placeholder="Access"
                                            :items="accessUser"
                                            v-model="user.useraccess"
                                            :value="user.useraccess"
                                        />
                                    </div>

                                    <div class="col-md-12">
                                        <Label class="mt-3" title="password" />
                                        <Password
                                            id="password"
                                            class="mt-3"
                                            placeholder="password"
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
                                        :disabled="isLoading"
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
                accessStore: this.$store.modules.Access.getters.getData,
                headers: [
                    { key: "name", title: "name" },
                    { key: "username", title: "username" },
                    { key: "email", title: "email" },
                    { key: "actions", title: "Actions", sortable: false },
                ],
                toogle: false,
                user: null,
                accesses: [],
                accessUser : [],

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
                    const data = this.$helper.onSubmit('userForm')

                    const response = await this.$api.post('/user', data ,{
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
                this.user = {
                    user_id  : data.user_id,
                    email    : data.email,
                    name     : data.name,
                    username : data.username,
                    useraccess : data.useraccess,
                }
            },
            async update(){
                try {
                    this.toogleLoading()
                    const data = this.$helper.onSubmit('userForm')
                    const update = {
                        name     : data.name,
                        username : data.username,
                        email    : data.email,
                        password : data.password,
                        useraccess : data.useraccess,
                    }

                    const response = await this.$api.put('/user/'+data.user_id, update,{
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
                            const response = await this.$api.delete('/user/'+data.user_id,{
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
                const responseuser = await this.$api.get('/access?limit=0', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log();
                this.accesses = responseuser.data.data.data;

                this.selectuser()
            },
            async selectuser(){
                this.accessUser = this.accesses.map((v,i) => {
                    let result = {
                        text: v.access_name,
                        value: v.access_id
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