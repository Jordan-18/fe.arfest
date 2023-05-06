<template>
    <input 
      type="hidden" 
      class="form-control" 
      :name="id" 
      :placeholder="placeholder" 
      :id="id"
      :variant="variants"
    >
</template>

<script>
  export default {
    props:{
        id: String,
        placeholder: String,
        variants: String
    },
  }
</script>