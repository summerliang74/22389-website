<script setup>
import SeasonShell from '../components/SeasonShell.vue'

const sections = [
  { id: 'intothedeep-overview', label: '01 / Overview' },
  { id: 'intothedeep-results', label: '02 / Achievements' },
  { id: 'intothedeep-people', label: '03 / Team & moments' },
]

const moments = [
  ['/assets/images/seasons/into-the-deep/微信图片_20260905220113_128_1123.webp', 'AE86 team with its Shanghai High School International Division flag in Eindhoven', 'Team 22389 / Eindhoven · 2025', ''],
  ['/assets/images/seasons/into-the-deep/微信图片_20260905220113_125_1123.webp', 'Second place Design Award trophy from the European Premier Event', 'Design Award · 2nd place', 'photo-focus-award'],
  ['/assets/images/seasons/into-the-deep/微信图片_20260905220113_130_1123.webp', 'AE86 robot waiting beside the field during the European Premier Event', 'Robot 22389 / between matches', ''],
]
</script>

<template>
  <SeasonShell
    eyebrow="Season archive · 2024–2025"
    title="INTO THE DEEP"
    lead="Three robot versions, vision-assisted intake and a control stack built for repeatable scoring — then tested on the international stage in Eindhoven."
    :sections="sections"
  >
    <section id="intothedeep-overview" class="archive-section">
      <p class="section-kicker">01 / Overview</p>
      <h2>A season of measured iteration.</h2>
      <p>Our third FTC season brought AE86 to the European Premier Event in Eindhoven, July 2–5, 2025. The robot evolved through three documented versions, pairing a carbon-fiber mechanical system with vision, odometry and driver-assist code.</p>
    </section>

    <section id="intothedeep-results" class="archive-section">
      <p class="section-kicker">03 / Achievements</p>
      <h2>Eindhoven, in numbers.</h2>
      <div class="archive-results">
        <div>
          <strong class="result-stat">#<span class="count-up" data-target="1">1</span></strong>
          <p>Escher qualification ranking<br><span class="inline-stat"><span class="count-up" data-target="10">10</span> wins · <span class="count-up" data-target="0">0</span> losses · <span class="count-up" data-target="0">0</span> ties</span></p>
          <a class="text-link" href="https://ftc-events.firstinspires.org/2024/FPEEUESCH/rankings" target="_blank" rel="noopener noreferrer">Official rankings ↗</a>
        </div>
        <div>
          <strong class="result-stat"><span class="count-up" data-target="478">478</span> <span class="points-unit">PTS</span></strong>
          <p>Alliance score · Playoff M13<br>July 5, 2025 · <span class="inline-stat"><span class="count-up" data-target="478">478</span>–<span class="count-up" data-target="247">247</span></span></p>
          <a class="text-link" href="https://ftc-events.firstinspires.org/2024/team/22389" target="_blank" rel="noopener noreferrer">Official match &amp; award records ↗</a>
        </div>
        <div>
          <strong class="result-stat"><span class="count-up" data-target="2">2</span>nd</strong>
          <p>Design Award<br>European Premier Event</p>
        </div>
      </div>

      <div class="season-record-list">
        <article>
          <h3>European Premier Event · Escher qualifications</h3>
          <p>July 2–5, 2025 · Rank #1 · <span class="inline-stat"><span class="count-up" data-target="10">10</span> wins / <span class="count-up" data-target="0">0</span> losses / <span class="count-up" data-target="0">0</span> ties</span></p>
        </article>
        <article>
          <h3>European Premier Event · Playoffs</h3>
          <p>July 5, 2025 · <span class="inline-stat"><span class="count-up" data-target="3">3</span> wins / <span class="count-up" data-target="2">2</span> losses</span> · Alliance Captain · M13: <span class="inline-stat"><span class="count-up" data-target="478">478</span>–<span class="count-up" data-target="247">247</span></span></p>
        </article>
        <article><h3>European Premier Event · Awards</h3><p>Design Award — 2nd Place</p></article>
      </div>

      <figure class="score-evidence">
        <a href="/assets/images/seasons/into-the-deep/score-478.webp" target="_blank" rel="noopener"><img src="/assets/images/seasons/into-the-deep/score-478.webp" loading="lazy" decoding="async" alt="Scoreboard for playoff M13: red alliance 478, blue alliance 247"></a>
        <figcaption>Playoff M13 · Alliance 22389 / 19660 / 19341. The score belongs to the alliance. The <span class="inline-stat"><span class="count-up" data-target="10">10</span>–<span class="count-up" data-target="0">0</span>–<span class="count-up" data-target="0">0</span></span> record above covers Escher qualifications.</figcaption>
      </figure>
    </section>

    <section id="intothedeep-people" class="archive-section">
      <p class="section-kicker">04 / Team &amp; moments</p>
      <h2>The people behind the robot.</h2>
      <div class="photo-story-grid" aria-label="INTO THE DEEP team moments">
        <figure v-for="moment in moments" :key="moment[0]">
          <img :class="moment[3]" :src="moment[0]" :alt="moment[1]" loading="lazy" decoding="async">
          <figcaption>{{ moment[2] }}</figcaption>
        </figure>
      </div>
    </section>
  </SeasonShell>
</template>
