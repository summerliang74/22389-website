<script setup>
import { RouterLink } from 'vue-router'

defineProps({ season: Boolean })
</script>

<template>
  <footer :class="season ? 'page-footer mono' : 'site-footer mono'">
    <span v-if="season">AE86 / FTC 22389</span>
    <template v-else>AE86 / FTC 22389</template>
    <RouterLink v-if="season" :to="{ path: '/', hash: '#timeline' }">Shanghai · Student-organized since 2022</RouterLink>
    <span v-else>Shanghai · Student-organized since 2022</span>
  </footer>
</template>
