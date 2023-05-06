<template>
  <model-select 
      :id="id"
      :options="items"
      v-model="item"
      class="mt-1"
      :placeholder="placeholder"
      v-on:click="tes"
      >
      <!-- v-on:[event.on]="event.function" -->
   </model-select>
</template>

<script>
import { ModelSelect } from 'vue-search-select'

export default {
  props:{
    id: String,
    placeholder: String,
    items:Object,
    event:Object,
  },
  data () {
  return {
    item: {
      value: '',
      text: ''
    },
  }
  },
  methods: {
  },
  components: {ModelSelect}
}
</script>