<template>
  <div class="image-container">
    <img 
      ref="image" 
      src="@/assets/media/target.png" 
      @click="addMarker($event)"
      style="
        height: 100%; 
        width: 100%;
      "
    >
    <div 
      v-for="(marker, index) in target.markers" 
      :key="index" class="marker" 
      :style="{ top: marker.y + 'px', left: marker.x + 'px' }"
    >
      <span class="marker-label">x</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    target: Array,
    max: Number,
  },
  data() {
    return {
    };
  },
  mounted(){
  },
  methods: {
    addMarker(event) {
      const container = this.$refs.image.parentElement;
      const containerRect = container.getBoundingClientRect();
      const x = (event.clientX - containerRect.left) + 7;
      const y = event.clientY - containerRect.top;

      const pos = {
          x : containerRect.left + containerRect.width / 2,
          y : containerRect.top + containerRect.height / 2
      } 

      let x2 = event.clientX
      let y2 = event.clientY

      let tempR = containerRect.width/2;
      const r = [
          // tempR * 0.05,
          tempR * 0.1,
          tempR * 0.2,
          tempR * 0.3,
          tempR * 0.4,
          tempR * 0.5,
          tempR * 0.6,
          tempR * 0.7,
          tempR * 0.8,
          tempR * 0.9,
          tempR * 1
      ]

      let dx = x2 - pos.x
      let dy = y2 - pos.y

      let result = r.map((v,i) => (Math.sqrt(dx * dx + dy * dy) <= r[i]))
      result = result.reduce((count, value) => count + (value === true ? 1 : 0), 0);
      
      if((this.$props.target.markers).length < this.$props.max){
        this.$props.target.markers.push({ x, y });
        this.$props.target.pointResult.push(result);
      }
    },
  }
};
</script>

<style>
.image-container {
  position: relative;
  max-height: 100% !important;
  display: inline-block;
}

.marker {
  position: absolute;
  transform: translate(-50%, -50%);
}

.marker-label {
  position: absolute;
  top: -10px;
  left: -10px;
  color: yellowgreen;
  font-weight: bold;
}
</style>
