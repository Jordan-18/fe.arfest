<template>
    <div class="card card-xl-stretch mb-xl-8">
        <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
                <span class="card-label fw-bold fs-3 mb-1">{{ title }}</span>
                <span class="text-muted fw-semibold fs-7">{{ breadcrump }}</span>
            </h3>
            <div class="card-toolbar">
                <v-btn class="success" variant="tonal" color="success"  data-bs-toggle="modal" data-bs-target="#modalCreate">
                    <i class="bi bi-plus-circle"></i>
                    Create
                </v-btn>
            </div>
        </div>
        <div class="card-body py-3">

            <v-spacer></v-spacer>   

            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                @input="index"
            ></v-text-field>

            <v-data-table-server
                :headers="headers"
                :items="items"
                :search="search"
                :items-per-page="itemsPerPage"
                :loading="isLoading"
            >

                <template v-slot:bottom>
                    <div class="text-center pt-2">
                        <v-pagination
                            v-model="currentPage"
                            :length="pageSetting.pageCount"
                            @update:model-value="currentPage = parseInt($event, 10)"
                            @click="index"
                        ></v-pagination>
                    </div>


                    <v-text-field
                        :model-value="itemsPerPage"
                        class="pa-2"
                        label="Items per page"
                        type="number"
                        min="-1"
                        max="15"
                        hide-details
                        @update:model-value="itemsPerPage = parseInt($event, 10)"
                        @input="index"
                    ></v-text-field>
                </template>

                <template v-slot:item.actions="{ item }">

                    <v-btn class="danger" icon="mdi-vuetify" fab dark small variant="tonal" color="danger" v-on:click="destroy(item.raw)">
                        <i class="bi bi-trash-fill"></i>
                    </v-btn>

                    <v-btn class="danger" icon="mdi-vuetify" fab dark small variant="tonal" color="warning" v-on:click="show(item.raw)" data-bs-toggle="modal" data-bs-target="#modalUpdate">
                        <i class="bi bi-pencil-square"></i>
                    </v-btn>

                </template>

            </v-data-table-server>
        </div>
    </div>

    <Modal 
        title="Create new data"
        id="modalCreate"
        :component= formComponent
    >
        <Form
            :formId="formCreate"
            :forms="forms"
            @submit.prevent="create"
        >
            <v-row justify='end' class="mt-3">
                <v-btn type="submit" fab dark small variant="tonal" color="blue">Submit</v-btn>
            </v-row>
        </Form>

    </Modal>

    <Modal 
        title="Update data"
        id="modalUpdate"
        :backdrop="true"
    >
        <Form
            :formId="formUpdate"
            :forms="forms"
            @submit.prevent="update"
        >
            <v-row justify='end'>
                <v-btn type="submit" fab dark small variant="tonal" color="green">Update</v-btn>
            </v-row>
        </Form>
    </Modal>

</template>

<script>
  export default {
    props:{
        title: String,
        breadcrump: String,
        headers: Object,
        forms: Object,
        modules: String
    },
    data () {
      return {
        search: '',
        items: [],
        pageSetting: {
          pageCount: 0,
        },
        currentPage: 1,
        itemsPerPage: 10,
        isLoading: true,
        formCreate: null,
        formUpdate: null,
      }
    },
    mounted() {
        this.onConfiguration()
        this.index()
    },
    methods: {
        onConfiguration(){
            this.formCreate = ((this.$props.modules).replace(' ','_'))+'_formCreate';
            this.formUpdate = ((this.$props.modules).replace(' ','_'))+'_formUpdate';
        },
        async index(){
            this.isLoading = true

            try {                
                this.$api.defaults.headers.common['Authorization'] = `${this.$dataAuth.token_type} ${this.$dataAuth.token}`;
    
                var url = '/'+this.$props.modules+'?index='

                if(this.search != ''){
                    url = url+'&search='+this.search
                }
                if(this.currentPage != 1){
                    url = url+'&page='+this.currentPage
                }
                if(this.itemsPerPage != 10 && this.itemsPerPage > 0){
                    url = url+'&limit='+this.itemsPerPage
                }
                    
                const response = await this.$api.get(url,{
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
    
                this.items = response.data.data.data
                this.pageSetting.pageCount = response.data.data.last_page

                if(this.search != ''){
                    if(this.pageSetting.pageCount > 1){
                        this.currentPage = this.currentPage
                    }
                    else{
                        this.currentPage = 1
                    }
                }

                this.isLoading = false

            } catch (error) {
                const err = await error
                console.error(err);
                this.isLoading = false
                let message = `
                    Error \n
                    ${err.message} \n
                `
                Swal.fire(message)
            }

        },
        async create(){
            try {
                let Data = this.$helper.onSubmit(this.formCreate)
                
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
        }
    },
  }
</script>