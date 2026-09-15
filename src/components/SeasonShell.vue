<script setup>
import { RouterLink } from 'vue-router'
import PageFooter from './PageFooter.vue'
import { usePageEffects } from '../composables/usePageEffects'

defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  lead: { type: String, required: true },
  sections: { type: Array, required: true },
})

usePageEffects()
</script>

<template>
  <div class="route-view">
    <main class="standalone-archive season-archive">
      <div class="archive-wrap">
        <RouterLink class="archive-return mono" :to="{ path: '/', hash: '#timeline' }">← Back to seasons</RouterLink>
        <header>
          <p class="section-kicker">{{ eyebrow }}</p>
          <h1 class="archive-title header-font">{{ title }}</h1>
          <p class="archive-lead">{{ lead }}</p>
        </header>

        <nav class="archive-nav" :aria-label="`${title} sections`">
          <a v-for="section in sections" :key="section.id" :href="`#${section.id}`">{{ section.label }}</a>
        </nav>

        <slot />

        <RouterLink class="archive-return mono" :to="{ path: '/', hash: '#timeline' }">← Back to seasons</RouterLink>
      </div>
    </main>
    <PageFooter season />
  </div>
</template>
