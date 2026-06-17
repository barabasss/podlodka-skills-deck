<script setup>
import { ref, computed, nextTick } from 'vue'

const SKILLS = ['release-notes', 'review', 'brainstorming', 'changelog', 'feature-flag']

const props = defineProps({
  title: String,
  tag: String,
  tagClass: String,
  desc: String,
  preset: String,
  placeholder: { type: String, default: 'напишите агенту…' },
  fill: Boolean, // вставлять пример в поле, а не отправлять сразу
})

const draft = ref('')
const messages = ref([])
const thinking = ref(false)
const log = ref(null)
const inputEl = ref(null)

function guessSkill(t) {
  if (/дизайн|макет|сайт|brainstorm|штурм|придума/i.test(t)) return 'brainstorming'
  if (/релиз|release|ченжлог|changelog/i.test(t)) return 'release-notes'
  if (/ревью|review/i.test(t)) return 'review'
  return 'brainstorming'
}

function classify(t) {
  const s = t.trim()
  if (s.startsWith('/')) {
    const name = s.slice(1).split(/\s+/)[0] || 'release-notes'
    return { skill: name, thought: 0, note: null }
  }
  if (/ревью|review/i.test(s)) return { skill: 'review', thought: 1, note: null }
  return { skill: guessSkill(s), thought: 2, note: 'понял по description' }
}

const slashOpen = computed(() => draft.value.trimStart().startsWith('/'))
const suggestions = computed(() => {
  const q = draft.value.trimStart().slice(1).toLowerCase()
  return SKILLS.filter((s) => s.toLowerCase().startsWith(q))
})

function focusInput() {
  nextTick(() => inputEl.value && inputEl.value.focus())
}

function pick(name) {
  if (props.fill) {
    draft.value = '/' + name + ' '
    focusInput()
  } else {
    send('/' + name)
  }
}

function usePreset() {
  if (props.fill) {
    draft.value = props.preset + ' '
    focusInput()
  } else {
    send(props.preset)
  }
}

async function scroll() {
  await nextTick()
  if (log.value) log.value.scrollTop = log.value.scrollHeight
}

function send(preset) {
  const text = (preset ?? draft.value).trim()
  if (!text || thinking.value) return
  draft.value = ''
  const res = classify(text)
  messages.value.push({ role: 'user', text })
  thinking.value = true
  scroll()
  setTimeout(() => {
    thinking.value = false
    messages.value.push({ role: 'agent', ...res })
    scroll()
  }, res.thought ? 850 : 400)
}
</script>

<template>
  <div class="chatcard">
    <div class="chatcard__h">
      <b>{{ title }}</b>
      <span class="tagx" :class="tagClass">{{ tag }}</span>
      <div class="cc-hint">
        <span class="cc-hint__q">?</span>
        <div class="cc-hint__pop" @mousedown.prevent="usePreset">
          <span class="cc-hint__lab">пример</span>{{ preset }}
        </div>
      </div>
    </div>
    <div class="chatcard__desc" v-html="desc"></div>

    <div class="cc-log" ref="log">
      <div v-if="!messages.length && !thinking" class="cc-empty">Начни работать с агентом</div>
      <template v-for="(m, i) in messages" :key="i">
        <div v-if="m.role === 'user'" class="ub">{{ m.text }}</div>
        <div v-else class="ar">
          <div v-if="m.thought" class="th">● Thought for {{ m.thought }}s</div>
          <div class="sk"><span class="dot">●</span> <b>{{ m.skill }}</b> skill</div>
          <div v-if="m.note" class="nt">↳ {{ m.note }}</div>
        </div>
      </template>
      <div v-if="thinking" class="th">● думает…</div>
    </div>

    <div class="cc-in-wrap">
      <div class="cc-in">
        <input ref="inputEl" v-model="draft" @keyup.enter="send()" :placeholder="placeholder" />
        <button @click="send()" title="отправить">↵</button>
      </div>
      <div v-if="slashOpen && suggestions.length" class="cc-menu">
        <div v-for="s in suggestions" :key="s" class="cc-menu__row" @mousedown.prevent="pick(s)">
          <span class="nm">/{{ s }}</span>
          <span class="kbd">↵</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chatcard__h { display: flex; align-items: center; gap: 8px; }
.cc-log {
  flex: 1; min-height: 80px; overflow-y: auto;
  background: var(--bg); border: 1px solid var(--border); border-radius: 10px;
  padding: 10px; display: flex; flex-direction: column; gap: 8px;
}
.cc-empty { color: var(--text-dim); font-size: 13px; margin: auto; text-align: center; }
.cc-in { display: flex; gap: 6px; }
.cc-in input {
  flex: 1; min-width: 0; background: var(--surface); border: 1px solid var(--border-bright);
  border-radius: 9px; padding: 8px 11px; color: var(--text); font-family: var(--font-body);
  font-size: 13px; outline: none;
}
.cc-in input:focus { border-color: var(--coral); }
.cc-in button {
  background: var(--surface); border: 1px solid var(--border); border-radius: 9px;
  color: var(--coral); width: 38px; cursor: pointer; font-size: 15px;
}
.cc-in button:hover { background: var(--surface2); }
.cc-in-wrap { position: relative; }
.cc-menu {
  position: absolute; left: 0; right: 0; bottom: calc(100% + 6px); z-index: 5;
  background: var(--surface-elevated); border: 1px solid var(--border-bright); border-radius: 10px;
  overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,.35);
}
.cc-menu__row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; font-family: var(--font-mono); font-size: 13px; cursor: pointer;
  border-bottom: 1px solid var(--border);
}
.cc-menu__row:last-child { border-bottom: none; }
.cc-menu__row:hover { background: var(--coral-dim); }
.cc-menu__row .nm { color: var(--coral); font-weight: 600; }
.cc-menu__row .kbd { color: var(--text-dim); font-size: 11px; opacity: 0; }
.cc-menu__row:hover .kbd { opacity: 1; }

/* подсказка-пример за «?» */
.cc-hint { position: relative; margin-left: auto; }
.cc-hint__q {
  display: inline-flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; border-radius: 50%;
  border: 1px solid var(--border-bright); color: var(--text-dim);
  font-family: var(--font-mono); font-size: 12px; cursor: help; transition: all .15s;
}
.cc-hint:hover .cc-hint__q { border-color: var(--coral); color: var(--coral); }
.cc-hint__pop {
  position: absolute; right: 0; top: calc(100% + 8px); z-index: 6;
  width: max-content; max-width: 230px;
  background: var(--surface-elevated); border: 1px dashed var(--border-bright);
  color: var(--text-dim); border-radius: 9px; padding: 8px 11px;
  font-family: var(--font-mono); font-size: 11.5px; line-height: 1.4; cursor: pointer;
  opacity: 0; pointer-events: none; transition: opacity .15s; box-shadow: 0 8px 24px rgba(0,0,0,.3);
}
.cc-hint:hover .cc-hint__pop { opacity: 1; pointer-events: auto; }
.cc-hint__pop:hover { color: var(--coral); border-color: var(--coral); }
.cc-hint__lab {
  display: block; font-size: 9.5px; letter-spacing: 1px; text-transform: uppercase;
  color: var(--coral); margin-bottom: 3px;
}
</style>
