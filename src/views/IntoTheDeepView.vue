<script setup>
import SeasonShell from '../components/SeasonShell.vue'

const sections = [
  { id: 'intothedeep-overview', label: '01 / Overview' },
  { id: 'intothedeep-robot', label: '02 / Robot & engineering' },
  { id: 'intothedeep-results', label: '03 / Achievements' },
  { id: 'intothedeep-people', label: '04 / Team & moments' },
]

const mechanisms = [
  {
    image: '/assets/images/seasons/into-the-deep/robot-specimen.webp',
    alt: 'AE86 robot with its raised arm next to a specimen on the field bar',
    title: 'Specimen placement',
    facts: [
      ['The task', 'Bring a game piece up to the scoring bar.'],
      ['Our solution', 'A three-motor vertical slide and adaptive arm position the gripper above the chassis.'],
      ['Result', 'The complete scoring sequence could be triggered with one button.'],
    ],
  },
  {
    image: '/assets/images/seasons/into-the-deep/robot-ascent.webp',
    alt: 'AE86 robot hanging from the field structure with wheels lifted off the floor',
    title: 'Endgame ascent',
    facts: [
      ['The task', 'Lift the robot onto the field structure.'],
      ['Our solution', 'An upgraded winch and hook system raise the complete chassis.'],
      ['Result', 'The robot completed the endgame ascent with all four wheels clear of the floor.'],
    ],
  },
]

const iterations = [
  ['V1', 'Modular foundation', 'Reliable by design', 'Separate intake and scoring mechanisms, protected wiring and replaceable carbon-fiber structures established a serviceable first robot.'],
  ['V2', 'Cycle optimization', '5 → 3 s scoring cycle', 'The second version upgraded the scoring geometry, elevator and chassis. The portfolio records a three-times-faster chassis and a 36.7% reduction in intake errors.'],
  ['V3', 'Field adaptation', '180° vision-assisted intake', 'A wider claw, rotating intake platform, Limelight 3A, adaptive scoring arm and upgraded climb winch formed the competition-ready third version.'],
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

    <section id="intothedeep-robot" class="archive-section">
      <p class="section-kicker">02 / Robot &amp; engineering</p>
      <h2>Three versions. Faster cycles. More control.</h2>
      <p>We rebuilt the robot around repeatable scoring: a serviceable first version, a faster second version and a vision-assisted third version ready for Eindhoven.</p>

      <div class="mechanism-grid">
        <article v-for="mechanism in mechanisms" :key="mechanism.title">
          <img :src="mechanism.image" :alt="mechanism.alt" loading="lazy" decoding="async">
          <div class="mechanism-copy">
            <h3>{{ mechanism.title }}</h3>
            <dl>
              <template v-for="fact in mechanism.facts" :key="fact[0]">
                <dt>{{ fact[0] }}</dt><dd>{{ fact[1] }}</dd>
              </template>
            </dl>
          </div>
        </article>
      </div>

      <div class="cad-grid engineering-drawing-grid" aria-label="INTO THE DEEP robot engineering drawings">
        <figure class="cad-frame engineering-drawing-frame">
          <img src="/assets/images/seasons/into-the-deep/robot-drawing-perspective.png" alt="Three-quarter engineering drawing of the complete AE86 INTO THE DEEP robot" loading="lazy" decoding="async">
          <figcaption>Complete assembly / three-quarter view</figcaption>
        </figure>
        <figure class="cad-frame engineering-drawing-frame">
          <img src="/assets/images/seasons/into-the-deep/robot-drawing-side.png" alt="Side engineering drawing showing the AE86 robot arm and scoring mechanism" loading="lazy" decoding="async">
          <figcaption>Arm, transfer and lift / side view</figcaption>
        </figure>
      </div>

      <div class="system-grid engineering-iterations" aria-label="INTO THE DEEP engineering iterations">
        <article v-for="iteration in iterations" :key="iteration[0]" class="system-card" :data-index="iteration[0]">
          <p class="mono">{{ iteration[1] }}</p>
          <h3><span v-if="iteration[0] === 'V2'" class="inline-stat">5 → 3 s</span><template v-if="iteration[0] === 'V2'"> scoring cycle</template><template v-else>{{ iteration[2] }}</template></h3>
          <p>{{ iteration[3] }}</p>
        </article>
      </div>

      <div class="metric-ribbon" aria-label="INTO THE DEEP control metrics">
        <article><strong>103</strong><span>point specimen autonomous path</span></article>
        <article><strong>99</strong><span>point sample autonomous path</span></article>
        <article><strong>Field-oriented</strong><span>drive with one-button scoring sequences</span></article>
      </div>
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
