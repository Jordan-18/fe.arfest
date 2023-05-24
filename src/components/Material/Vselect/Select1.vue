<template>
    <v-select 
        :id="id"
        :name="id"
        :variant="variants"
        :items="items"
        label="-Pilih-" 
        clearable
        single-line
    >
    </v-select>
</template>

<script>
  export default{
    props:{
        id: String,
        items: Object,
        variants: String,
        values:String,
    },
    data() {
      return {
        item:(this.$props.values != "" ? this.$props.values : "")
      }
    },
    mounted() {
      console.log(this.$props.items);
    },
    methods:{
    }
  }
</script>