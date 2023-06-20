<template>
    <v-btn
      :id="id"
      :variant="variants"
      :color="color"
      :loading="isLoading"
    >
        <slot></slot>
    </v-btn>
</template>

<script>
  export default {
    props:{
        id: String,
        color: String,
        variants: String,
        isLoading: Boolean
    },
  }
</script>