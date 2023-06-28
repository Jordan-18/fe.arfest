<template>
    
</template>
  
<script>
  export default {
    data() {
      return {
        isLoading: false,
        accessStore: this.$store.modules.Access.getters.getData,
        headers: [
            { key: "event_name", title: "" },
            { key: "event_kategori", title: "" },
            { key: "actions", title: "Actions", sortable: false },
        ],
        toogle: false,
        event: null,
        events: [],
        eventSelect : [],

        breadcrump: '',
        onSubmit: null,
        onSubmitColor: '',
        textSubmit:''
      }
    },
    mounted(){
    }
  };
</script>
  