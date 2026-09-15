<script setup>
import { computed } from 'vue'
import SeasonShell from '../components/SeasonShell.vue'

const props = defineProps({ seasonKey: { type: String, required: true } })

const seasons = {
  powerplay: {
    eyebrow: 'Season archive · 2022–2023',
    title: 'POWERPLAY',
    lead: 'Our first robot, first competition field and the season that established AE86.',
    overviewId: 'powerplay-overview',
    momentsId: 'powerplay-moments',
    recordsId: 'powerplay-records',
    overviewTitle: 'Our rookie year.',
    overview: 'AE86 began in 2022. POWERPLAY taught us how to turn a student-built machine into a competition robot and work together under match pressure.',
    momentsTitle: 'The first chapter.',
    officialUrl: 'https://ftc-events.firstinspires.org/2022/team/22389',
    photos: [
      ['/assets/images/seasons/powerplay/robot.webp', 'AE86 robot 22389 on the POWERPLAY field', 'Robot 22389 / POWERPLAY competition'],
      ['/assets/images/seasons/powerplay/微信图片_20260905192002_18_1136.webp', 'POWERPLAY competition field at the Heyuan event', 'Competition field / Heyuan · 2023'],
      ['/assets/images/seasons/powerplay/微信图片_20260905192002_22_1136.webp', 'AE86 Motivate Award trophy from the POWERPLAY season', 'Motivate Award / rookie-season archive'],
    ],
  },
  centerstage: {
    eyebrow: 'Season archive · 2023–2024',
    title: 'CENTERSTAGE',
    lead: 'A more refined machine, tighter driver coordination and a stronger second season.',
    overviewId: 'centerstage-overview',
    momentsId: 'centerstage-moments',
    recordsId: 'centerstage-records',
    overviewTitle: 'Building on our first year.',
    overview: 'During CENTERSTAGE, we improved the robot and learned to test hardware, driving and match strategy as one connected system.',
    momentsTitle: 'Machine, drivers, team.',
    officialUrl: 'https://ftc-events.firstinspires.org/2023/team/22389',
    photos: [
      ['/assets/images/seasons/center-stage/微信图片_20260905193502_34_1136.webp', 'AE86 CENTERSTAGE robot 22389 with its hanging hooks raised', 'Robot 22389 / CENTERSTAGE configuration'],
      ['/assets/images/seasons/center-stage/微信图片_20260905193502_48_1136.webp', 'AE86 drive team concentrating during a CENTERSTAGE match', 'Drive team / match focus'],
      ['/assets/images/seasons/center-stage/微信图片_20260905193502_56_1136.webp', 'AE86 team with robot 22389 at the Guangzhou off-season event', 'Guangzhou off-season event / 2024'],
    ],
  },
}

const season = computed(() => seasons[props.seasonKey])
const sections = computed(() => [
  { id: season.value.overviewId, label: '01 / Overview' },
  { id: season.value.momentsId, label: season.value.title === 'POWERPLAY' ? '02 / Photo story' : '02 / Robot & moments' },
  { id: season.value.recordsId, label: '03 / Season records' },
])
</script>

<template>
  <SeasonShell :eyebrow="season.eyebrow" :title="season.title" :lead="season.lead" :sections="sections">
    <section :id="season.overviewId" class="archive-section">
      <p class="section-kicker">01 / Overview</p>
      <h2>{{ season.overviewTitle }}</h2>
      <p>{{ season.overview }}</p>
    </section>

    <section :id="season.momentsId" class="archive-section">
      <p class="section-kicker">02 / {{ season.title === 'POWERPLAY' ? 'Photo story' : 'Robot & moments' }}</p>
      <h2>{{ season.momentsTitle }}</h2>
      <div class="photo-story-grid">
        <figure v-for="photo in season.photos" :key="photo[0]">
          <img :src="photo[0]" :alt="photo[1]" loading="lazy" decoding="async">
          <figcaption>{{ photo[2] }}</figcaption>
        </figure>
      </div>
    </section>

    <section :id="season.recordsId" class="archive-section">
      <p class="section-kicker">03 / Season records</p>
      <h2>Official results.</h2>
      <p>Match results and awards are maintained by FIRST.</p>
      <a class="text-link" :href="season.officialUrl" target="_blank" rel="noopener noreferrer">View the official season record ↗</a>
    </section>
  </SeasonShell>
</template>
