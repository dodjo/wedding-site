<template>
<div class="page w-full mx-auto max-w-[480px]">
 <Main/>
 <Place/>
</div>
</template>

<script setup lang="ts">
import Main from "~/components/main/main.vue";
import Place from "~/components/place/place.vue";
</script>


<style scoped lang="scss">
.page {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url('/pic/bg.png') repeat center center;
    opacity: 0.6;
    z-index: -1;
  }
}
</style>
