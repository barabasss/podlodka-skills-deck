---
layout: section
class: text-center
---

# Часть 2. Практика

---

# Где искать скиллы

<div class="grid grid-cols-2 gap-10 mt-8">

<div>

**Каталог:**

<div class="qrrow mt-4">
  <Qr src="skills-sh" />
  <div class="lbl"><a href="https://www.skills.sh/" target="_blank"><strong>skills.sh</strong></a><br><span class="muted">каталог разных скиллов</span></div>
</div>

</div>

<div>

**Примеры:**

<div class="qrrow mt-4">
  <Qr src="superpowers" />
  <div class="lbl"><a href="https://github.com/obra/superpowers" target="_blank"><strong>obra/superpowers</strong></a><br><span class="muted">большая коллекция</span></div>
</div>

<div class="qrrow mt-4">
  <Qr src="anthropics-skills" />
  <div class="lbl"><a href="https://github.com/anthropics/skills" target="_blank"><strong>anthropics/skills</strong></a><br><span class="muted">официальные от Anthropic</span></div>
</div>

</div>

</div>

---

# Как установить

Поддерживается всеми агентами

<div class="mt-4">

**Через npx:**

```bash
npx skills add https://github.com/obra/superpowers
```

<div class="mt-3 muted"><strong>npx — универсальный способ.</strong> У каждого агента может быть свой способ установки скиллов — проще всего <strong class="accent">спросить самого агента</strong></div>

</div>

<div class="mt-6" v-click>

**Где располагается** — у каждого агента своя папка:

<div class="paths mt-3">
  <div class="prow">
    <span class="ppath ppath--claude">.claude/skills/</span>
    <span class="pann"># Claude Code — своя папка</span>
  </div>
  <div class="prow">
    <span class="ppath uni">.agents/skills/</span>
    <span class="pann"># универсальный — Codex, opencode, pi, Cursor…</span>
  </div>
</div>

</div>

---
class: usage-chats
---

# Как пользоваться

<div class="muted -mt-2 mb-3">3 способа вызвать скилл</div>

<div class="chats">
  <ChatCol title="Агент сам" tag="auto" tag-class="tagx--auto"
    desc="если <b>description</b> внятный — агент зовёт сам"
    preset="давай спроектируем дизайн макет сайта"
    placeholder="напишите задачу…" />
  <ChatCol title="Через /" tag="/" tag-class="tagx--slash"
    desc="явный вызов <b>руками</b> — как команда"
    preset="/release-notes"
    placeholder="/имя-скилла" fill />
  <ChatCol title="Упоминанием" tag="текст" tag-class="tagx--text"
    desc="опишите словами — <b>даже по-русски</b>"
    preset="используй скилл ревью, посмотри последние изменения"
    placeholder="опишите задачу…" />
</div>

<!--
Три живых чата. В каждом печатаю (или жму пример) — агент отвечает:
обычная задача → агент сам по description (brainstorming); / → команда (release-notes);
текст со словом «ревью» → review.
-->

