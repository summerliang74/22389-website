<script setup>
import PageFooter from '../components/PageFooter.vue'
import { usePageEffects } from '../composables/usePageEffects'

const series = [
  {
    key: 'A', className: 'uniform-series--race', range: 'SERIES A / 01–03', title: 'Race graphic.',
    description: 'AE86 wordmark and season robot artwork.',
    products: [
      ['tee-race-white.png', 'White and blue AE86 race graphic T-shirt shown from the front and back'],
      ['tee-race-grey.png', 'Grey and pink AE86 race graphic T-shirt shown from the front and back'],
      ['tee-race-black.png', 'Black and red AE86 race graphic T-shirt shown from the front and back'],
    ],
  },
  {
    key: 'B', className: 'uniform-series--cad', range: 'SERIES B / 04–06', title: 'CAD graphic.',
    description: 'Robot linework, team number and member identity.',
    products: [
      ['tee-cad-white.png', 'White and blue AE86 CAD graphic T-shirt shown from the front and back'],
      ['tee-cad-navy.png', 'Navy and orange AE86 CAD graphic T-shirt shown from the front and back'],
      ['tee-cad-black.png', 'Black and cyan AE86 CAD graphic T-shirt shown from the front and back'],
    ],
  },
]

usePageEffects()
</script>

<template>
  <div class="route-view">
    <main class="uniform-page-main">
    <section class="uniform-page-hero">
      <div class="uniform-page-wrap uniform-hero-grid" data-reveal="children">
        <div>
          <p class="section-kicker">AE86 / FTC 22389 / Team wear</p>
          <h1 class="uniform-page-title header-font">Team<br><span>uniform.</span></h1>
        </div>
        <div class="uniform-hero-copy">
          <p>Robot geometry, race-inspired graphics and the 22389 number system come together as one unmistakable AE86 identity.</p>
          <dl class="uniform-hero-meta mono">
            <div><dt>Design</dt><dd>Race + CAD</dd></div>
            <div><dt>Identity</dt><dd>AE86 / 22389</dd></div>
          </dl>
        </div>
      </div>
    </section>

    <section class="uniform-lookbook-section uniform-page-wrap" aria-labelledby="hoodie-title">
      <header class="uniform-block-header" data-reveal>
        <div>
          <p class="section-kicker">01 / Signature piece</p>
          <h2 id="hoodie-title" class="header-font">The AE86 hoodie.</h2>
        </div>
      </header>
      <figure class="uniform-hoodie-frame" data-reveal>
        <img src="/assets/images/uniform/微信图片_20260906133157_23_1142.webp" alt="White AE86 team hoodie shown from the front and back" loading="lazy" decoding="async">
      </figure>
    </section>

    <section class="uniform-lookbook-section uniform-page-wrap" aria-labelledby="tees-title">
      <header class="uniform-block-header" data-reveal>
        <div>
          <p class="section-kicker">02 / Competition T-shirts</p>
          <h2 id="tees-title" class="header-font">Two graphics.<br>Six team shirts.</h2>
        </div>
        <p class="mono">AE86 / 22389</p>
      </header>

      <div class="uniform-series-layout">
        <article v-for="item in series" :key="item.key" class="uniform-series" :class="item.className" data-reveal="children">
          <header class="uniform-series-header" :data-index="item.key">
            <span class="mono">{{ item.range }}</span>
            <h3 class="header-font">{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </header>
          <figure v-for="product in item.products" :key="product[0]" class="uniform-product-frame">
            <img :src="`/assets/images/uniform/cutout/${product[0]}`" :alt="product[1]" loading="lazy" decoding="async">
          </figure>
        </article>
      </div>
    </section>

    <section class="uniform-page-end" data-reveal>
      <div class="uniform-page-wrap">
        <p class="mono">AE86 / FTC 22389 / SHSID ROBOTICS</p>
        <p class="header-font">ONE TEAM. <span>ONE LOOK.</span></p>
      </div>
    </section>
    </main>
    <PageFooter />
  </div>
</template>
