<template>
    <input 
      class="form-control"
      type="text" 
      :id="id"
      :name="id"
      :readonly="readonly"
      :placeholder="placeholder"
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