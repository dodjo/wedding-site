<template>
<div class="relative">
  <div class="relative">
    <NuxtImg src="/pic/main/salvette.png" class="w-[43%]"/>
    <NuxtImg src="/pic/main/title.png"  class="absolute w-[65%] top-[80px] right-10"/>
  </div>
  <div class="relative -mt-10">
    <NuxtImg src="/pic/main/we-photo.png"  class="w-[86%] mx-auto"/>
    <NuxtImg src="/pic/main/name.png"  class="bottom-0 -translate-y-[40px]"/>
    <NuxtImg src="/pic/main/cat.png"  class="w-[32%] -translate-y-[150px]"/>
  </div>

  <div class="relative -mt-70 w-full flex">
    <h1 class="mt-30 ml-5 text-3xl text-center text-black font-semibold font-[kosmos]">
      Дорогие, родные и близкие!
    </h1>
    <NuxtImg src="/pic/main/rupor.png"  class="w-[40%]"/>
  </div>

  <p class="w-[80%] mx-auto mb-10 text-[1.6rem]/[1.2] font-[consolas] text-center text-black">
    С любовью и радостью
    приглашаем разделить<br/>
    с нами самый важный
    день в нашей жизни
  </p>
</div>
</template>

<script setup lang="ts">
import JSConfetti from 'js-confetti'
import confetti from 'canvas-confetti'


const addConfetti = ({x, y, speed, time}) => {
  const end = Date.now() + time;
  const colors = ['#050f29','#bbe0ee', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: Math.random() * 180,
      spread: 55,
      startVelocity: speed,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight
      },
      colors: colors
    });

    // confetti({
    //   particleCount: 3,
    //   angle: 120,
    //   spread: 55,
    //   startVelocity: speed,
    //   origin: {
    //     x: x / window.innerWidth,
    //     y: y / window.innerHeight
    //   },
    //   colors: colors
    // });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}



onMounted(() => {
  addConfetti({x: 0, y: 250, speed: 30, time: 1000})

  document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    addConfetti({x, y, speed: 10, time: 5});
  });
})
</script>
