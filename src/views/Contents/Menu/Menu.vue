<script setup>
    import Datatable from '@/components/Material/Datatable.vue'
</script>
<template>
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <div class="container-fluid" id="kt_content_container">
            <div class="row g-5 g-xl-8">
                <div class="col-xl-12">
                    <Datatable
                        title = 'Menu'
                        breadcrump = 'menu &raquo;'
                        modules = 'menu'
                        :headers = headers
                        :forms = forms
                        />
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
                { key: "menu_kode", title: "Kode" },
                { key: "menu_name", title: "Menu Name" },
                { key: "menu_level", title: "Level" },
                { key: "menu_order", title: "Order" },
                { key: "menu_endpoint", title: "Endpoint" },
                { key: "menu_icon", title: "Icon" },
                { key: "actions", title: "Actions", sortable: false },
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
                    on: "change",
                    function: "tes",
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
        };
    },
    mounted() { 
    },
    methods: {
        tes(){
            console.log('tes');
        }
    },
}
</script>