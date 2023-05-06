<template>
    <v-text-field 
      class="rounded-circle"
      type="text" 
      :label="placeholder" 
      :name="id" 
      :id="id"
      :variant="variants"
      single-line
      clearable
      :readonly="readonly"
      :hint="hint"
    ></v-text-field>
</template>

<script>
  export default {
    props:{
        id: String,
        placeholder: String,
        variants:String,
        readonly:String,
        hint:String,
    },
  }
</script>