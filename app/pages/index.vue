<template>
<div class="page block sm:hidden w-full mx-auto max-w-[450px] overflow-hidden">
 <Main/>
 <Place/>
 <Dress/>
 <Present/>
 <Flowers/>
  <Form/>
 <Suppoprt/>
</div>
<div class="page hidden sm:flex flex-col gap-2 items-center justify-center  h-[100svh] w-full mx-auto max-w-[450px]">
  <NuxtImg src="/pic/qr.svg"  class="w-[80%] block"/>
  <p>
    Заходи c телефона 😉
  </p>
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
  min-height: 100svh;
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
