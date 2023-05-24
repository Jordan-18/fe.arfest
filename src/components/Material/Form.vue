<template>
    <form :id="formId">
        <slot></slot>
    </form>
</template>
<script>
  export default {
    props:{
        forms: Object,
        formId: String
    },
  }
</script>