<template>
  <div key="headerLane" class="header-lane">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'header-lanes'
}
</script>

<style>
.header-lane {
  min-width: 70px;
  position: sticky;
  left: 0;
  background-color: #111;
  z-index: 4;
  display: flex;
  flex-direction: column;
}
</style>
