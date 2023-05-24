<template>
    <model-select 
      :options="items"
      v-model="item"
      :name="id" 
      :id="id" 
      :value="item"
      class="form-control mt-3"
      :placeholder="placeholder"
      @update:modelValue="handleModelChange"
      />
</template>

<script>
export default {
  props:{
    id: String,
    placeholder: String,
    items:Object,
  },
  data () {
    return {
      item: "",
    }
  },
  mounted(){
  },
  methods: {
    handleModelChange(newValue) {
      this.item = newValue;
      this.$emit('change', newValue); 
    },
  },
}
</script>