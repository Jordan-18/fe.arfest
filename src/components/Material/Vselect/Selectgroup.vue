<template>
    <v-select 
        :id="id"
        :variant="variants"
        :items="items"
        label="-Pilih-" 
        clearable
        single-line
        multiple
        chips
    >
    </v-select>
</template>

<script>
  export default {
    props:{
        id: String,
        items: Object,
        variants: String,
    },
  }
</script>