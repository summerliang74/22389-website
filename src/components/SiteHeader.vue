<script setup>
import { RouterLink, useRoute } from 'vue-router'

defineEmits(['open-contact'])

const route = useRoute()
</script>

<template>
  <header class="site-header">
    <RouterLink :to="{ path: '/', hash: '#intro' }" custom v-slot="{ href, navigate }">
      <a :href="href" class="logo-btn header-font text-2xl font-black text-white" aria-label="AE86 home" @click="navigate">
        22389<span class="text-red-600">.</span>
      </a>
    </RouterLink>
    <nav class="nav-dock" aria-label="Primary navigation">
      <RouterLink :to="{ path: '/', hash: '#intro' }" custom v-slot="{ href, navigate }"><a :href="href" class="nav-item" @click="navigate">About</a></RouterLink>
      <RouterLink :to="{ path: '/', hash: '#team-intro' }" custom v-slot="{ href, navigate }"><a :href="href" class="nav-item" @click="navigate">Team</a></RouterLink>
      <RouterLink :to="{ path: '/', hash: '#timeline' }" custom v-slot="{ href, navigate }"><a :href="href" class="nav-item" @click="navigate">Seasons</a></RouterLink>
      <RouterLink :to="{ path: '/', hash: '#sponsors' }" custom v-slot="{ href, navigate }"><a :href="href" class="nav-item" @click="navigate">Partners</a></RouterLink>
      <RouterLink to="/uniform" class="nav-item" :class="{ 'uniform-nav-current': route.name === 'uniform' }" :aria-current="route.name === 'uniform' ? 'page' : undefined">Uniform</RouterLink>
    </nav>
    <button type="button" class="nav-item contact-button header-contact" aria-label="Open contact details" @click="$emit('open-contact')">Contact Us</button>
  </header>
</template>
