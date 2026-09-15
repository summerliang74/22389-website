<script setup>
import { ref } from 'vue'

const dialog = ref(null)
const status = ref('')
const email = 'julie_zhu_efz@outlook.com'

function open() {
  status.value = ''
  dialog.value?.showModal()
}

function close() {
  dialog.value?.close()
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email)
    status.value = 'Email copied.'
  } catch {
    const emailLink = dialog.value?.querySelector('.contact-email')
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(emailLink)
    selection.removeAllRanges()
    selection.addRange(range)
    status.value = 'Email selected. Copy it using your device’s copy command.'
  }
}

defineExpose({ open })
</script>

<template>
  <dialog ref="dialog" id="contact-dialog" aria-labelledby="contact-title" @close="status = ''">
    <button type="button" class="contact-close" aria-label="Close contact details" @click="close">×</button>
    <p class="section-kicker">AE86 / FTC 22389</p>
    <h2 id="contact-title" class="header-font">Contact us.</h2>
    <p class="contact-label">Team email</p>
    <a class="contact-email" :href="`mailto:${email}`">{{ email }}</a>
    <div class="contact-actions">
      <button type="button" class="archive-return mono" @click="copyEmail">Copy email</button>
      <a class="text-link" :href="`mailto:${email}`">Open email app ↗</a>
    </div>
    <p id="contact-status" role="status" aria-live="polite">{{ status }}</p>
  </dialog>
</template>
