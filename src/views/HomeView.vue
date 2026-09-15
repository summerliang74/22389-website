<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
import PageFooter from '../components/PageFooter.vue'
import { usePageEffects } from '../composables/usePageEffects'

const openContact = inject('openContact')

const seasons = [
  {
    index: '01', years: '2022–2023', title: 'Power', accent: 'Play!', note: 'Rookie year foundation', year: '22',
    path: '/seasons/powerplay', image: '/assets/images/seasons/powerplay/robot.webp',
    label: 'Open the POWERPLAY 2022–2023 season archive',
  },
  {
    index: '02', years: '2023–2024', title: 'Center', accent: 'Stage', note: 'Our second season', year: '23',
    path: '/seasons/centerstage', image: '/assets/images/seasons/center-stage/微信图片_20260905193502_34_1136.webp',
    label: 'Open the CENTERSTAGE 2023–2024 season archive',
  },
  {
    index: '03', years: '2024–2025', title: 'Into The', accent: 'Deep', note: 'Robot, results & field photos', year: '24',
    path: '/seasons/into-the-deep', image: '/assets/images/seasons/into-the-deep/robot-ascent.webp',
    label: 'Open the INTO THE DEEP 2024–2025 season archive',
  },
  {
    index: '04', years: '2025–2026', title: '', accent: 'Decode', note: 'Current robot & team', year: '25',
    path: '/seasons/decode', image: '/assets/images/seasons/decode/微信图片_20260905220113_113_1123.webp',
    label: 'Open the DECODE 2025–2026 season archive and team roster',
  },
]

const sponsors = [
  { index: '01', image: '/assets/sponsors/zhihe.svg', alt: '志合律师事务所', name: 'Legal Partner', logoClass: 'sponsor-logo--wide' },
  { index: '02', image: '/assets/sponsors/novera.svg', alt: 'Novera by ELEGRP', name: 'Supporting Partner', logoClass: 'sponsor-logo--wide', url: 'https://www.elegrp.com/', label: 'Visit Novera by ELEGRP' },
  { index: '03', image: '/assets/sponsors/shinetech.svg', alt: 'Shinetech Software', name: 'Technology Partner', url: 'https://www.shinetechsoftware.com/', label: 'Visit Shinetech Software' },
  { index: '04', image: '/assets/sponsors/alibaba.svg', alt: 'Alibaba', name: 'Alibaba', logoClass: 'sponsor-logo--mark', url: 'https://www.alibabagroup.com/', label: 'Visit Alibaba Group' },
  { index: '05', image: '/assets/sponsors/fusrock.png', alt: 'FusRock', name: 'Materials Partner', logoClass: 'sponsor-logo--wide', url: 'https://www.fusrock.com/', label: 'Visit FusRock' },
  { index: '06', image: '/assets/sponsors/bigtreetech.png', alt: 'BIGTREETECH', name: 'Hardware Partner', logoClass: 'sponsor-logo--wide', url: 'https://bigtree-tech.com/', label: 'Visit BIGTREETECH' },
  { index: '07', image: '/assets/sponsors/hp.svg', alt: 'HP', name: 'HP', logoClass: 'sponsor-logo--mark', url: 'https://www.hp.com/', label: 'Visit HP' },
  { index: '08', image: '/assets/sponsors/dowaytech.png', alt: 'DowayTech', name: 'Sensor Technology', logoClass: 'sponsor-logo--wide', url: 'https://www.dowaytech.com/', label: 'Visit DowayTech' },
  { index: '09', image: '/assets/sponsors/microsoft.svg', alt: 'Microsoft', name: 'Technology Support', logoClass: 'sponsor-logo--wide', url: 'https://www.microsoft.com/', label: 'Visit Microsoft' },
]

usePageEffects()
</script>

<template>
  <main id="main-view">
    <section id="intro" class="home-hero">
      <div class="hero-grid">
        <div>
          <p class="section-kicker">FTC 22389 / Shanghai / Since 2022</p>
          <h1 class="hero-title header-font">WE ARE<br><span>AE86.</span></h1>
          <p class="hero-summary">A student-organized, self-funded robotics team from Shanghai High School International Division.</p>
          <p class="hero-detail">We bring engineering, programming and teamwork together through FIRST Tech Challenge — building a new robot for each season's challenge.</p>
          <div class="hero-actions">
            <a class="primary-action" href="#timeline">Explore our seasons →</a>
            <a class="text-link" href="#team-intro">Meet our club ↓</a>
          </div>
        </div>
        <figure class="hero-photo">
          <img src="/assets/images/seasons/into-the-deep/robot-ascent.webp" alt="AE86 robot 22389 suspended from the field structure during INTO THE DEEP" fetchpriority="high">
          <figcaption>INTO THE DEEP / 2024–2025 / ROBOT 22389</figcaption>
        </figure>
      </div>
      <div id="interactive-slogan" class="hero-motto">
        <span class="mono">OUR TEAM SPIRIT</span>
        <p class="header-font">ALL FOR ONE. <span class="text-red-600">ONE FOR ALL.</span></p>
      </div>
    </section>

    <section id="team-intro" class="home-section team-intro-section">
      <div class="team-intro-grid" data-reveal="children">
        <div class="team-intro-copy">
          <h2 class="home-heading header-font">Robotics starts<br><span class="text-red-600">with people.</span></h2>
          <p>AE86 is where SHSID students turn ideas into competition robots. Each season, members take ownership of engineering, software, design, outreach, driving and strategy.</p>
          <p>We learn by building, testing and competing together — then carry those lessons into the next version of the robot.</p>
          <p class="team-mission"><span>Our mission</span> Inspire more students to explore robotics, take on ambitious technical challenges and grow through FIRST.</p>
          <div class="team-links">
            <RouterLink class="text-link" :to="{ path: '/seasons/decode', hash: '#decode-members' }">Meet the current team ↗</RouterLink>
            <a class="text-link" href="#timeline">View seasons ↓</a>
          </div>
        </div>
        <figure class="team-intro-photo">
          <img src="/assets/images/seasons/into-the-deep/微信图片_20260905220113_128_1123.webp" alt="AE86 team members together in Eindhoven" loading="lazy" decoding="async">
          <figcaption>AE86 TEAM / EINDHOVEN 2025</figcaption>
        </figure>
      </div>
    </section>

    <section id="timeline" class="timeline-section">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16" data-reveal>
          <div>
            <p class="section-kicker mb-5">Our season archives</p>
            <h2 class="header-font text-5xl md:text-7xl font-black italic uppercase leading-[0.9]">Season<br><span class="text-red-600">archives.</span></h2>
          </div>
          <p class="mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] md:text-right">Established 2022<br>FTC Team 22389</p>
        </div>

        <div class="season-grid" data-reveal="children">
          <RouterLink
            v-for="season in seasons"
            :key="season.path"
            class="season-card"
            :to="season.path"
            :style="{ '--season-image': `url('${season.image}')` }"
            :aria-label="season.label"
          >
            <div>
              <p class="section-kicker">{{ season.index }} · {{ season.years }}</p>
              <h2 class="header-font season-card-title mt-8">
                <template v-if="season.title">{{ season.title }}<br></template><span class="text-red-600">{{ season.accent }}</span>
              </h2>
            </div>
            <div class="season-card-footer">
              <p class="mono">{{ season.note }}</p>
              <span class="season-card-arrow" aria-hidden="true">↗</span>
            </div>
            <span class="header-font season-year">{{ season.year }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <section id="sponsors" class="sponsors-section">
      <div class="max-w-7xl mx-auto">
        <div class="sponsors-header" data-reveal>
          <div>
            <h2 class="header-font text-4xl md:text-6xl font-black italic uppercase leading-[0.92]">Our <span class="text-red-600">partners.</span></h2>
          </div>
          <p class="sponsors-copy">Organizations working with AE86 across engineering, technology and team operations.</p>
        </div>

        <div class="sponsor-grid" aria-label="AE86 partners and sponsors" data-reveal="contents">
          <component
            :is="sponsor.url ? 'a' : 'article'"
            v-for="sponsor in sponsors"
            :key="sponsor.index"
            class="sponsor-card"
            :data-index="sponsor.index"
            :href="sponsor.url"
            :target="sponsor.url ? '_blank' : undefined"
            :rel="sponsor.url ? 'noopener noreferrer' : undefined"
            :aria-label="sponsor.label"
          >
            <img class="sponsor-logo" :class="sponsor.logoClass" :src="sponsor.image" :alt="sponsor.alt">
            <span class="sponsor-name">{{ sponsor.name }}</span>
          </component>
        </div>

        <aside class="sponsor-contact-card" data-reveal>
          <div>
            <h3 class="header-font">Connect with AE86.</h3>
            <p>Support the team, meet our members or explore how we build our robots.</p>
          </div>
          <div class="audience-actions">
            <button type="button" @click="openContact">Partnerships &amp; events <span>↗</span></button>
            <RouterLink :to="{ path: '/seasons/into-the-deep', hash: '#intothedeep-robot' }">Explore engineering <span>↗</span></RouterLink>
          </div>
        </aside>
      </div>
    </section>
    <PageFooter />
  </main>
</template>
