<script setup>
    import Datatable from '@/components/Datatable.vue'
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
        };
    },
    mounted() {
       
    },
    methods: {
    },
    // components: { Datatable }
}
</script>