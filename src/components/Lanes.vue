<template>
  <div class="lanes" v-bind:style="lanesBackground">
    <slot></slot>
  </div>  
</template>

<script>
export default {
  name: 'lanes',
  props: ['pixelPerHour'],
  data () {
    return {
      lanesBackground: {
        backgroundSize: `100% ${this.pixelPerHour}px`,
        backgroundImage:
          `linear-gradient(#bbb 1px, transparent 1px),
          linear-gradient(#f9f9f9 ${this.pixelPerHour / 2}px, transparent 1px)`
      }
    }
  }
}
</script>

<style>
.lanes {
  display: inline-flex;
  flex-direction: row;
  position: relative;
  background-color: #fff;
  background-image:
    linear-gradient(#bbb 1px, transparent 1px),
    linear-gradient(#f9f9f9 60px, transparent 1px);
}
</style>
