<template>
  <div class="container-lane">
    <h2 class="lane-name">{{ name }}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'container-lane',
  props: ['name']
}
</script>

<style>
.lane-name {
  font-size: 12px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  margin: 0;
  min-width: 250px;
  position: sticky;
  top: 0;
  z-index: 3;
}

.container-lane {
  min-width: 250px;
  position: relative;
}

</style>
