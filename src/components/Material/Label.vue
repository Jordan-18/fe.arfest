<template>
    <label :for="id" class="form-label">{{ title }}</label>
</template>

<script>
  export default {
    props:{
        id: String,
        title: String, 
    },
  }
</script>