<script setup>
defineProps({
  src: String,
  sm: Boolean,
})
</script>

<template>
  <div class="qr" :class="{ 'qr--sm': sm }">
    <img :src="'/qr/' + src + '.png'" :alt="src" />
  </div>
</template>
