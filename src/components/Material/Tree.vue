<template>
    <tree 
        :config="config" 
        :nodes="nodes"
    ></tree>
</template>
  
<script>
  import treeview from "vue3-treeview";
  import "vue3-treeview/dist/style.css";
  
  export default {
    components: {
      tree: treeview,
    },
    props:{
        config  :Object,
        nodes   :Object,
    },
    data: function () {
      return {
        modeBool: false,
      };
    },
    mounted(){
      this.changeMode()
    },
    methods: {
      changeMode() {
        this.modeBool = !this.modeBool;
      },
    },
  };
  </script>
  