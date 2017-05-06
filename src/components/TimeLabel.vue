<template>
  <span class="time-label" :data-type="type" :style='{height: height + "px"}'><slot></slot></span>
</template>

<script>
export default {
  name: 'time-label',
  props: ['height', 'type']
}
</script>

<style>
.time-label {
  display:flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid white;
  color: white;
  padding-right: 5px;
  box-sizing: border-box;
}

.time-label[data-type=am] {
  background-color: #D35628;
}

.time-label[data-type=pm] {
  background-color: #1E5698;
}
</style>
