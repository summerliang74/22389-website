<script setup>
import { nextTick, provide, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import ContactDialog from './components/ContactDialog.vue'
import SiteHeader from './components/SiteHeader.vue'

const contactDialog = ref(null)
const openContact = () => contactDialog.value?.open()
const route = useRoute()
const origin = 'https://www.22389-ae86.com'

const teamSchema = {
  '@context': 'https://schema.org',
  '@type': 'SportsTeam',
  name: 'AE86 Elite Robotics',
  alternateName: 'FTC Team 22389',
  url: `${origin}/`,
  image: `${origin}/assets/images/seasons/into-the-deep/robot-ascent.webp`,
  sport: 'FIRST Tech Challenge',
  foundingDate: '2022',
  location: {
    '@type': 'Place',
    name: 'Shanghai High School International Division',
    address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressCountry: 'CN' },
  },
  sameAs: ['https://ftc-events.firstinspires.org/team/22389'],
}

useHead(() => {
  const meta = route.meta
  const canonicalPath = route.path === '/' ? '/' : route.path.replace(/\.html$/, '')
  const canonicalUrl = `${origin}${canonicalPath}`
  const imageUrl = meta.image?.startsWith('http') ? meta.image : `${origin}${meta.image}`

  return {
    title: meta.title || 'AE86 FTC 22389',
    htmlAttrs: { lang: 'en' },
    bodyAttrs: { class: meta.bodyClass || '' },
    link: [{ rel: 'canonical', href: canonicalUrl }],
    meta: [
      { name: 'description', content: meta.description },
      { property: 'og:type', content: meta.type },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:alt', content: meta.imageAlt },
      { name: 'twitter:title', content: meta.title },
      { name: 'twitter:description', content: meta.description },
      { name: 'twitter:image', content: imageUrl },
    ],
    script: route.name === 'home'
      ? [{ key: 'team-schema', type: 'application/ld+json', innerHTML: JSON.stringify(teamSchema) }]
      : [],
  }
})

provide('openContact', openContact)

async function finishRouteTransition() {
  await nextTick()
  requestAnimationFrame(() => {
    if (route.hash) document.querySelector(route.hash)?.scrollIntoView({ behavior: 'auto' })
    else window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  })
}
</script>

<template>
  <SiteHeader @open-contact="openContact" />
  <ContactDialog ref="contactDialog" />
  <RouterView v-slot="{ Component, route }">
    <Transition name="route-page" mode="out-in" @after-enter="finishRouteTransition">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
</template>
