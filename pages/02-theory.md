---
layout: section
class: text-center
---

# Часть 1. Теория

---

# Что такое skill

<div class="mt-10 text-2xl leading-relaxed">

– модульные инструкции, <strong class="accent">загружаемые в контекст по необходимости</strong>

</div>

<div class="mt-6 text-xl muted">
Позволяют передать экспертизу агенту
</div>

<!-- поддерживаются всеми известными агентами -->

---

# Структура скилла

<div class="struct-grid mt-6">

<pre class="tree tree-click" style="font-size:12.5px" :class="{ 'f-skill': $clicks===0, 'f-rest': $clicks>=1 }">my-skill/
<span class="g-skill">├── <span class="hl">SKILL.md</span>          <span class="ann"># инструкции + frontmatter</span></span>
<span class="g-rest">├── <span class="pl">references/</span>       <span class="ann"># читаются по требованию</span>
│   ├── api-docs.md
│   └── best-practices.md
├── <span class="pl">scripts/</span>          <span class="ann"># скрипты, НЕ грузятся в контекст</span>
│   ├── analyzer.py
│   └── validate.sh
└── <span class="pl">assets/</span>           <span class="ann"># шаблоны, конфиги</span>
    ├── template.html
    └── config.json</span></pre>

<div class="pd-file" :class="{ 'pd-dim': $clicks>=1 }">
  <div class="pd-file__name">SKILL.md</div>
  <div class="seg seg--1">
    <div class="h">frontmatter — метаданные</div>
    <div class="dash">---</div>
    <div><span class="k">name</span>: <span class="muted">как называется скилл</span></div>
    <div><span class="k">description</span>: <span class="muted">когда применять — по нему агент решает, звать ли</span></div>
    <div class="dash">---</div>
  </div>
  <div class="seg seg--2">
    <div class="h">тело — инструкции</div>
    <div class="muted">как выполнять задачу: шаги, правила, примеры</div>
  </div>
</div>

</div>

<div v-click></div>

<!--
- папка с инструкциями + опциональными скриптами и ассетами
- обязательный файл SKILL.md с YAML frontmatter (name, description)
- агент видит только метаданные, пока не решит активировать
- активация – по решению модели или вручную через /
-->

---

# Progressive disclosure

<div class="tiers mt-8">
  <div class="tier tier--1"><div class="lv">L1</div><div class="what"><b>При старте</b><span>Metadata · frontmatter SKILL.md → <strong class="accent">name + description</strong></span><div class="bar" style="width:18%"></div></div><div class="cost">~100 токенов/скилл</div></div>
  <div class="tier tier--2"><div class="lv">L2</div><div class="what"><b>При активации</b><span>Instructions · тело SKILL.md</span><div class="bar" style="width:55%"></div></div><div class="cost">до ~5000 токенов</div></div>
  <div class="tier tier--3"><div class="lv">L3</div><div class="what"><b>По необходимости</b><span>Resources · scripts / references / assets</span><div class="bar" style="width:100%"></div></div><div class="cost">Без лимита</div></div>
</div>

<!--
Главная архитектурная идея: позволяет иметь сотни скиллов без деградации.
- L1 всегда в контексте – оглавление
- L2 подгружается при активации
- L3 читается только при необходимости
-->

---

# Как работает на практике

<div class="flow mt-10">
  <div class="fstep"><div class="fn">1</div><p>Изначально в контексте только name и description скилла</p></div>
  <div class="farr">→</div>
  <div class="fstep"><div class="fn">2</div><p>По описанию агент понимает, что нужно загрузить скилл и загружает SKILL.md</p></div>
  <div class="farr">→</div>
  <div class="fstep"><div class="fn">3</div><p>В SKILL.md может быть указано, что ещё подгружать для получения дополнительной информации</p></div>
</div>

---
class: p-0
---

<div class="relative h-full w-full">
  <iframe class="w-full h-full border-0" src="https://skill-visualization.vercel.app"></iframe>

  <div class="absolute bottom-4 right-4 z-10 flex flex-col items-center gap-1 rounded-xl bg-white p-2 shadow-lg">
    <img :src="'/qr-demo.png'" class="w-28 h-28" alt="QR на демо" />
    <span class="text-xs text-gray-600">Открыть демо</span>
  </div>
</div>
