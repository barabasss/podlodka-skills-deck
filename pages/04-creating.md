---
layout: section
class: text-center
---

# Как создавать

---

# Что стоит обернуть в скилл – примеры

<div class="muted -mt-2 mb-6">какую-то свою экспертизу · что-то, что вы часто делаете</div>

<div class="ex-list">

<div v-click>решение конфликтов при синканье кодовых баз</div>
<div v-click>снятие фича-флага</div>
<div v-click>анализ замечаний из pr-а и составление плана по фиксу</div>
<div v-click>хитрая работа с личным таск-менеджером</div>
<div v-click>формирователь куар-кодов</div>
<div v-click>поиск встреч без повестки и подготовка драфта сообщений</div>
<div v-click>написание release-notes</div>

</div>

---

# Подробнее – публикатор релиз нотов

<div class="ba mt-6">
  <div class="col before">
    <h4>Как это выглядит без скилла</h4>
    <ol>
      <li>Сформулировать ченжлоги</li>
      <li>Проверить на грамматику и пунктуацию</li>
      <li>Перевести на английский</li>
      <li>Найти в коде json, куда пишем ченжлог на русском, придумать ключи json</li>
      <li>Найти в коде json, куда пишем ченжлог на англ, придумать ключи json</li>
      <li>Найти в коде место, указывающее на актуальный ченжлог</li>
      <li>Закомитить, запушить, создать пиар</li>
      <li>Написать то же самое для тг, приложить дополнительные ссылки</li>
    </ol>
  </div>
  <div class="col after">
    <div class="trow"><div class="v">~1.5 часа</div><div class="l">руками, без агента</div></div>
    <div class="trow"><div class="v">15–20 мин</div><div class="l">с агентом</div></div>
    <div class="trow win"><div class="v">~5 мин</div><div class="l">со скиллом</div></div>
  </div>
</div>

---

# Другие примеры

<div class="grid grid-cols-2 gap-x-10 gap-y-5 mt-6">

<div class="qrrow">
  <Qr src="brainstorming" sm />
  <div class="lbl"><a href="https://github.com/obra/superpowers/tree/main/skills/brainstorming" target="_blank"><strong>brainstorming</strong></a><br><span class="muted">структурированный мозговой штурм</span></div>
</div>

<div class="qrrow">
  <Qr src="playwright" sm />
  <div class="lbl"><a href="https://github.com/lackeyjb/playwright-skill" target="_blank"><strong>playwright</strong></a><br><span class="muted">автотесты UI через Playwright</span></div>
</div>

<div class="qrrow">
  <Qr src="visual-explainer" sm />
  <div class="lbl"><a href="https://github.com/nicobailon/visual-explainer" target="_blank"><strong>visual-explainer</strong></a><br><span class="muted">визуальные HTML-объяснения</span></div>
</div>

<div class="qrrow">
  <Qr src="frontend-design" sm />
  <div class="lbl"><a href="https://github.com/anthropics/skills/tree/main/skills/frontend-design" target="_blank"><strong>frontend-design</strong></a><br><span class="muted">фронтенд-дизайн без «generic AI»</span></div>
</div>

</div>

---

# Способы создания

<div class="mt-8 text-lg">
<v-clicks>

- вручную – создать папочку, файл SKILL.md – и вперед
- можно просто попросить агента сделать скилл и описать чего хочется
- в агентах есть свои скилл-креаторы (skill-creator в Claude Code и Codex)

</v-clicks>
</div>

<div class="grid grid-cols-2 gap-x-10 gap-y-4 mt-8" v-click>

<div class="qrrow">
  <Qr src="skill-creator" sm />
  <div class="lbl"><a href="https://github.com/anthropics/skills/tree/main/skills/skill-creator" target="_blank"><strong>skill-creator</strong></a><br><span class="muted">от Anthropic (Claude Code)</span></div>
</div>

<div class="qrrow">
  <Qr src="skill-creator-codex" sm />
  <div class="lbl"><a href="https://github.com/openai/skills/tree/main/skills/.system/skill-creator" target="_blank"><strong>skill-creator</strong></a><br><span class="muted">от Codex (OpenAI)</span></div>
</div>

</div>

---
layout: section
class: text-center
---

<div class="demo-kicker">Демо</div>

# Создаём скилл:<br>работа с&nbsp;таск‑трекером

<!-- живое демо: пишем скилл для таск-трекера прямо на сцене -->

---

# Зачем этот скилл?

<div class="-mt-2 mb-4 text-xl">MCP даёт <strong class="accent-2">тулы</strong>, но агент не знает <strong class="accent">сценариев, нюансов</strong></div>

<div class="ms-grid">

  <div class="ms-box ms-box--mcp">
    <div class="ms-box__h">MCP — тулы есть</div>
    <div class="ms-tool">get_projects · search_tasks</div>
    <div class="ms-tool">create_task · update_task · …</div>
  </div>

  <div class="a-arr">+</div>

  <div class="ms-box ms-box--skill" v-click>
    <div class="ms-box__h">Skill — знает сценарии, нюансы</div>
    <div class="ms-box__sub">списки <span class="list-pill">memanki</span> <span class="list-pill">задачи</span> · теги <span class="tag">new</span> <span class="tag">ожидание_меня</span> …</div>
    <ul>
      <li>«срочно» → <strong>memanki</strong> + <strong>new</strong></li>
      <li>меня ждут → тег <strong>ожидание_меня</strong></li>
    </ul>
  </div>

</div>

---

# Что обернём в скилл — мои вводные

<script setup>
const trackerPrompt = `Помоги создать скилл для работы с моим таск-трекером TickTick (через MCP).

Мои списки: memanki, задачи.
Мои теги: now, new, поручено_контроль, купить, ожидание_меня, напомнить.

Вводные правила при заведении задачи:
- пишу про товар (например «купи …») → тег купить
- говорю «сейчас» или «срочно» → список memanki + тег new
- меня кто-то ждёт / я кому-то должен отдать → тег ожидание_меня
- надо кому-то напомнить → тег напомнить

Ежедневный разбор — по запросу проводи ритуал:
1. просмотреть задачи, выполненные сегодня — не забыл ли внести следующие шаги?
2. всё ли запланированное на сегодня внесено в список?
3. посмотреть запланированные на сегодня, но невыполненные — надо ли что-то делать сейчас / завтра / на неделе / потом?
4. какие задачи нужно выполнить завтра — внести в список;
5. задачи, которые менялись больше суток назад — переформулировать.`
</script>

<div class="flex items-center justify-between -mt-2 mb-4 gap-6">
  <div class="muted">таск-трекер: списки, теги, правила раскладки и ежедневный разбор</div>
  <CopyBtn :text="trackerPrompt" label="Скопировать вводные" />
</div>

<div class="iv-grid">

<div>
  <div class="iv-h">Списки и теги</div>
  <div class="iv-setup"><span class="muted">списки:</span><span class="list-pill">memanki</span><span class="list-pill">задачи</span></div>
  <div class="iv-setup mt-2"><span class="muted">теги:</span><span class="tag">now</span><span class="tag">new</span><span class="tag">купить</span><span class="tag">ожидание_меня</span><span class="tag">напомнить</span></div>

  <div class="iv-h mt-6">Вводные правила</div>
  <div class="iv-rules">
    <div class="iv-rule"><span class="if"><b>«сейчас / срочно»</b></span><span class="arr">→</span><span><span class="list-pill">memanki</span> <span class="tag">new</span></span></div>
    <div class="iv-rule"><span class="if">меня <b>кто-то ждёт</b></span><span class="arr">→</span><span class="tag">ожидание_меня</span></div>
    <div class="iv-rule"><span class="if">надо <b>напомнить</b></span><span class="arr">→</span><span class="tag">напомнить</span></div>
    <div class="iv-rule"><span class="if">пишу про <b>товар</b></span><span class="arr">→</span><span class="tag">купить</span></div>
  </div>
</div>

<div>
  <div class="iv-h">Ежедневный разбор</div>
  <ol class="iv-ritual">
    <li>выполненные сегодня — внесены ли следующие шаги?</li>
    <li>всё запланированное на сегодня — внёс в список?</li>
    <li>запланированы, но не сделаны — что делать сейчас / завтра / на неделе / потом?</li>
    <li>что нужно завтра — внести в список</li>
    <li>не менялись больше суток — переформулировать</li>
  </ol>
</div>

</div>

---

# Советы и практики

<div class="mt-4 text-lg">

- **двигайтесь от задачи**, а не «давай напишем скилл про X»
- **итеративно** – не ждите, что первая версия полетит
- **не пихайте всё в `SKILL.md`** – выносите в `references/` и `scripts/`
- **просите агента провалидировать** свою же работу
- **description – самое важное**: он определяет, позовёт ли агент скилл
- **не включать общеизвестную информацию**, которую модель и так знает
- **делайте evals**

</div>
