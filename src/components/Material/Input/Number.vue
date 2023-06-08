<template>
    <input
      class="form-control"
      type="number" 
      :name="id" 
      :label="placeholder"
      :id="id"
      :readonly="readonly"
    >
</template>

<script>
  export default {
    props:{
        id: String,
        placeholder: String,
        readonly:String,
    },
  }
</script>