<script setup>
import { ref } from 'vue'
const props = defineProps({
  text: String,
  label: { type: String, default: 'Скопировать' },
})
const done = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
  } catch (e) {
    // запасной путь, если clipboard API недоступен
    const ta = document.createElement('textarea')
    ta.value = props.text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
  done.value = true
  setTimeout(() => (done.value = false), 1800)
}
</script>

<template>
  <button class="copy-btn" :class="{ done }" @click="copy">
    <span v-if="!done">⧉&nbsp;{{ label }}</span>
    <span v-else>✓&nbsp;Скопировано</span>
  </button>
</template>

<style scoped>
.copy-btn {
  font-family: var(--font-mono); font-size: 14px; cursor: pointer; white-space: nowrap;
  background: color-mix(in srgb, var(--surface) 68%, var(--coral) 32%);
  color: #ffd9c2; border: 1px solid color-mix(in srgb, var(--border) 40%, var(--coral) 60%);
  border-radius: 10px; padding: 9px 16px; transition: all .15s;
}
.copy-btn:hover { border-color: var(--coral); color: #fff; }
.copy-btn.done {
  background: color-mix(in srgb, var(--surface) 68%, var(--green) 32%);
  color: #c9f5d9; border-color: var(--green);
}
</style>
