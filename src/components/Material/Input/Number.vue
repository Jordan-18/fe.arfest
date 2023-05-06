<template>
    <v-text-field
      type="number" 
      :name="id" 
      :label="placeholder"
      :id="id"
      single-line
      clearable
      :variant="variants"
    >
    </v-text-field>
</template>

<script>
  export default {
    props:{
        id: String,
        placeholder: String,
        variants:String
    },
  }
</script>