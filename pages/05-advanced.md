---
layout: section
class: text-center
---

# Часть 3. Advanced

<!--
а все, что было раньше – можно выкинуть?
для тех, у кого остались силы
-->

---

# Skills over MCP

<div class="-mt-2 mb-4 text-xl">MCP — <strong class="accent-2">что</strong> агент умеет (тулы). Skill поверх — <strong class="accent">как</strong> ими правильно пользоваться</div>

<div class="ms-grid">

  <div class="ms-box ms-box--mcp">
    <div class="ms-box__h">MCP — что</div>
    <div class="ms-box__sub">доступ к внешнему сервису — перечень тулов с описанием</div>
    <div class="ms-tool">get_* · list_*</div>
    <div class="ms-tool">create_* · update_* · …</div>
    <div class="ms-box__sub" style="margin-top:10px">агент <strong>может</strong> вызывать тулы — но не знает нюансов</div>
  </div>

  <div class="a-arr">+</div>

  <div class="ms-box ms-box--skill" v-click>
    <div class="ms-box__h">Skill — как</div>
    <div class="ms-box__sub">превращает голые тулы в <strong>готовый сценарий</strong>:</div>
    <ul>
      <li>какой тул вызвать и в каком порядке</li>
      <li>что проверить до и после</li>
      <li>каких вызовов избегать</li>
    </ul>
  </div>

</div>

<div class="mt-4" v-click>
<div class="text-lg mb-2">И вот <strong class="accent">пример — <a href="https://github.com/supabase/agent-skills" target="_blank">supabase/agent-skills</a></strong>. Там прямо прописано, как пользоваться тулами MCP:</div>
<div class="qrrow">
  <Qr src="supabase-agent-skills" sm />
  <div class="lbl muted">• сначала найди доку через <code>search_docs</code><br>• меняй схему через <code>execute_sql</code>, а не <code>apply_migration</code> — иначе застрянешь<br>• после изменений прогони <code>get_advisors</code> и почини замечания</div>
</div>
</div>

---

# Rules (`AGENTS.md`) vs Skills

| | Rules | Skills |
|---|---|---|
| **Когда применяются** | Всегда | По триггеру |
| **Когда нужен** | «Как себя вести в этом проекте» | «Как сделать конкретную задачу» |
| **Содержимое** | Текст | Инструкции + скрипты + assets |

<div class="mt-6 text-xl" v-click>
Есть мнение: <strong class="accent">rules (AGENTS.md) можно вообще заменить скиллами</strong>
</div>

<div class="mt-4" v-click>

Но не всё так просто:

<div class="qrrow mt-3">
  <Qr src="vercel-agents-md" sm />
  <div class="lbl"><a href="https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals" target="_blank"><strong>Исследование Vercel</strong></a><br><span class="muted">где agents.md оказался лучше Skills</span></div>
</div>

</div>
