<template>
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <div class="container-fluid" id="kt_content_container">
            <Select1 
                class="mt-3"
                id="select-menu_parent"
                placeholder="Menu Parent"
                :items="menuSelect"
                v-model="item"
                :value="item"
            />

            <br>
            <button v-on:click="tes()" class="btn btn-warning btn-xs">Tes</button>
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
                menu: null,
                item: '',
                menus: [],
                menuSelect : [],
            };
        },
        mounted() { 
            this.index()
        },
        methods: {
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
            tes(){
                this.item = '23453332e8f94f6098c20e72a537297e';
                console.log(this.item);
            }
        },
    }
</script>