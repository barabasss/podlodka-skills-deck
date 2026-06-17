<script setup>
defineProps({
  src: String,
  sm: Boolean,
})
// public-ассеты должны учитывать --base (на GitHub Pages это /podlodka-skills-deck/)
const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <div class="qr" :class="{ 'qr--sm': sm }">
    <img :src="`${baseUrl}qr/${src}.png`" :alt="src" />
  </div>
</template>
