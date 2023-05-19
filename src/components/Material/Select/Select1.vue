<template>
    <model-select 
      :options="option"
      v-model="item"
      class="form-control mt-3"
      @update:modelValue="item"
      :placeholder="placeholder"
    >
    </model-select>

   <Hidden 
      :name="id" 
      :id="id" 
      :value="item"
      v-on:change="menuFunction"
    />
</template>

<script>
import { ModelSelect } from 'vue-search-select'

export default {
  props:{
    id: String,
    placeholder: String,
    items:Object,
    onFunction: Function
  },
  data () {
    return {
      option: this.$props.items,
      item: "",
    }
  },
  mounted(){
  },
  methods: {
    menuFunction(){
      console.log('tes');
      // this.$props.onFunction()
    }
  },
  components: {ModelSelect}
}
</script>