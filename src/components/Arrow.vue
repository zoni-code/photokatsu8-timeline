<template>
  <span class="arrow">
    <span class="arrow-line"></span>
  </span>
</template>

<script>
export default {
  name: 'arrow'
}
</script>

<style>
.arrow {
  display: block;
  position: absolute;
  height: 5px;
  left: 125px;
  z-index: 0;
}

.arrow-line {
  display: block;
  background-color: black;
  height: 100%;
}

.arrow-line::after{
  content: "";
  position: absolute;
  bottom: -14px;
  right: -17px;
  border: 10px solid transparent;
  border-left: 10px solid black;
  transform: translateY(-6px);
}

.arrow[data-from=ichigo_ph8] .arrow-line {
  background-color: #F0D987;
}

.arrow[data-from=ichigo_ph8] .arrow-line::after{
  border-left: 10px solid #F0D987;
}

.arrow[data-from=aoi_ph8] .arrow-line {
  background-color: #2F4387;
}

.arrow[data-from=aoi_ph8] .arrow-line::after{
  border-left: 10px solid #2F4387;
}

.arrow[data-from=ran_ph8] .arrow-line {
  background-color: #B1443F;
}

.arrow[data-from=ran_ph8] .arrow-line::after{
  border-left: 10px solid #B1443F;
}

.arrow[data-from=mizuki_ph8] .arrow-line {
  background-color: #C777D3;
}

.arrow[data-from=mizuki_ph8] .arrow-line::after{
  border-left: 10px solid #C777D3;
}

.arrow[data-from=yurika_ph8] .arrow-line {
  background-color: #B1B2A5;
}

.arrow[data-from=yurika_ph8] .arrow-line::after{
  border-left: 10px solid #B1B2A5;
}

.arrow[data-from=akari_ph8] .arrow-line {
  background-color: #E79C53;
}

.arrow[data-from=akari_ph8] .arrow-line::after{
  border-left: 10px solid #E79C53;
}

.arrow[data-from=sumire_ph8] .arrow-line {
  background-color: #C598EE;
}

.arrow[data-from=sumire_ph8] .arrow-line::after{
  border-left: 10px solid #C598EE;
}

.arrow[data-from=juri_ph8] .arrow-line {
  background-color: #DF434F;
}

.arrow[data-from=juri_ph8] .arrow-line::after{
  border-left: 10px solid #DF434F;
}


</style>
