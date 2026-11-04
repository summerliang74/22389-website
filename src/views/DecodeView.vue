<script setup>
import SeasonShell from '../components/SeasonShell.vue'

const sections = [
  { id: 'decode-overview', label: '01 / Overview' },
  { id: 'decode-robot', label: '02 / Robot & software' },
  { id: 'decode-records', label: '03 / Competition Record' },
]

const systems = [
  {
    index: '01', kicker: 'Chassis / rebuild', title: 'Swerve, iteration two',
    copy: 'After belt and assembly tolerances ended the first build, the team rebuilt all four modules with replaceable FDM parts and one consistent assembly process. Analog angle feedback and PID steering are present in the current code.',
  },
  {
    index: '02', kicker: 'Intake / measured', title: '29 → 43 game pieces', stat: true,
    copy: 'A movable roller added downward and horizontal force, while elastic belts and a dual-servo deflector reduced jams. In the documented comparison, intake rose from 29 to 43 and scoring from 23 to 38.',
  },
  {
    index: '03', kicker: 'Launcher / auto-aim', title: 'Range through control',
    copy: 'Dual flywheels, harder silicone wheels and a 200 g counterweight stabilize the shot. A servo guide plate, encoder feedback, voltage compensation and odometry-based aiming adapt it to field position.',
  },
]

const records = [
  ['China FTC Shanghai #1 Qualifier', 'Winning Alliance — Captain · Think Award'],
  ['China FTC Shanghai #2 Qualifier', 'Winning Alliance — 1st Team Selected · Reach Award'],
  ['China Championship', 'Sustain Award'],
  ['İstanbul Premier Event · Rumeli Division', 'Finalist Alliance — Captain'],
]

const moments = [
  ['/assets/images/seasons/decode/微信图片_20260905220113_117_1123.webp', 'AE86 members watching the DECODE field in team jackets', 'Drive team / watching the field', ''],
  ['/assets/images/seasons/decode/微信图片_20260905220113_113_1123.webp', 'AE86 DECODE robot displayed with two Shanghai qualifier trophies', 'Robot 22389 / two Shanghai qualifier wins', ''],
  ['/assets/images/seasons/decode/微信图片_20260905220113_116_1123.webp', 'AE86 Sustain Award trophy at the 2026 China FTC Championship', 'Sustain Award / China Championship', 'photo-focus-award'],
]

</script>

<template>
  <SeasonShell
    eyebrow="Season archive · 2025–2026"
    title="DECODE"
    lead="A rebuilt swerve chassis, a tested intake and an auto-aim launcher — AE86’s fourth season, documented from first failure to field-ready system."
    :sections="sections"
  >
    <section id="decode-overview" class="archive-section">
      <p class="section-kicker">01 / Overview</p>
      <h2>We kept the risky idea — and rebuilt it properly.</h2>
      <p>The first swerve build failed on belt and assembly tolerances. We rebuilt all four modules, measured the intake changes and connected odometry to the launcher’s aiming system.</p>
    </section>

    <section id="decode-robot" class="archive-section">
      <p class="section-kicker">02 / Robot &amp; software</p>
      <h2>What changed, and why it worked.</h2>
      <p>The CAD views show the complete machine. The three systems below explain the rebuilds and measurements that shaped the field-ready robot.</p>

      <div class="cad-grid">
        <figure class="cad-frame">
          <img src="/assets/images/seasons/decode/robot-cad-1.png" alt="Front-left CAD view of AE86's DECODE robot" loading="lazy" decoding="async">
          <figcaption>DECODE robot / front-left assembly view</figcaption>
        </figure>
        <figure class="cad-frame">
          <img src="/assets/images/seasons/decode/robot-cad-2.png" alt="Front-right CAD view of AE86's DECODE robot" loading="lazy" decoding="async">
          <figcaption>DECODE robot / front-right assembly view</figcaption>
        </figure>
      </div>

      <div class="system-grid" aria-label="DECODE engineering highlights">
        <article v-for="system in systems" :key="system.index" class="system-card" :data-index="system.index">
          <p class="mono">{{ system.kicker }}</p>
          <h3><span v-if="system.stat" class="inline-stat">29 → 43</span><template v-if="system.stat"> game pieces</template><template v-else>{{ system.title }}</template></h3>
          <p>{{ system.copy }}</p>
        </article>
      </div>
    </section>

    <section id="decode-records" class="archive-section">
      <p class="section-kicker">03 / Competition Record</p>
      <h2>Scores, results &amp; awards.</h2>
      <div class="archive-results">
        <div>
          <strong class="result-stat"><span class="count-up" data-target="5">5</span>–<span class="count-up" data-target="1">1</span></strong>
          <p>Playoff wins–losses<br>Shanghai #1 Qualifier<br>December 27–28, 2025</p>
        </div>
        <div><strong class="result-stat">Winner</strong><p>Winning Alliance Captain<br>Shanghai #1 Qualifier<br>December 27–28, 2025</p></div>
      </div>
      <div class="season-record-list">
        <article v-for="record in records" :key="record[0]"><h3>{{ record[0] }}</h3><p>{{ record[1] }}</p></article>
      </div>
      <div class="photo-story-grid" aria-label="DECODE competition moments">
        <figure v-for="moment in moments" :key="moment[0]">
          <img :class="moment[3]" :src="moment[0]" :alt="moment[1]" loading="lazy" decoding="async">
          <figcaption>{{ moment[2] }}</figcaption>
        </figure>
      </div>
      <a class="text-link" href="https://ftc-events.firstinspires.org/2025/team/22389" target="_blank" rel="noopener noreferrer">Official results &amp; awards on FIRST Events ↗</a>
    </section>

  </SeasonShell>
</template>
