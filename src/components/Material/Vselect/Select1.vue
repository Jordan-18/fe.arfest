<template>
    <v-select 
        :id="id"
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
    },
    mounted() {
      console.log(this.$props.items);
    },
  }
</script>