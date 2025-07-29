<template>
<div class="page w-full mx-auto max-w-[450px] overflow-hidden">
 <Main/>
 <Place/>
 <Dress/>
 <Present/>
 <Flowers/>
  <Form/>
 <Suppoprt/>
</div>
</template>

<script setup lang="ts">
import Main from "~/components/main.vue";
import Place from "~/components/place.vue";
import Dress from "~/components/dress.vue";
import Present from "~/components/present.vue";
import Suppoprt from "~/components/suppoprt.vue";
import Form from "~/components/form.vue";
</script>


<style lang="scss">
body {
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
