import { nextTick, onBeforeUnmount, onMounted } from 'vue'

export function usePageEffects() {
  const observers = []
  const timers = new Set()
  const frames = new Set()

  onMounted(async () => {
    await nextTick()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduceMotion && 'IntersectionObserver' in window) {
      const revealTargets = new Map()

      document.querySelectorAll('[data-reveal]').forEach(group => {
        const targets = ['children', 'contents'].includes(group.dataset.reveal)
          ? Array.from(group.children)
          : [group]

        targets.forEach((target, index) => {
          if (!revealTargets.has(target)) revealTargets.set(target, Math.min(index * 70, 280))
        })
      })

      document.querySelectorAll('.archive-section').forEach(section => {
        if (!revealTargets.has(section)) revealTargets.set(section, 0)
      })

      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const target = entry.target
          const delay = revealTargets.get(target) || 0

          if (!entry.isIntersecting) {
            target.classList.remove('is-visible')
            return
          }

          target.classList.add('is-visible')
          const timer = window.setTimeout(() => {
            target.classList.remove('is-visible')
            timers.delete(timer)
          }, 900 + delay)
          timers.add(timer)
        })
      }, { threshold: 0, rootMargin: '16% 0px 16% 0px' })

      revealTargets.forEach((delay, target) => {
        target.classList.add('scroll-reveal')
        target.style.setProperty('--reveal-delay', `${delay}ms`)
        revealObserver.observe(target)
      })
      document.documentElement.classList.add('reveal-enabled')
      observers.push(revealObserver)
    }

    const counters = document.querySelectorAll('.count-up')
    const counterObserver = !reduceMotion && 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return
            counterObserver.unobserve(entry.target)
            animateCounter(entry.target)
          })
        }, { threshold: 0.5 })
      : null

    counters.forEach(counter => {
      const target = counter.dataset.target
      counter.style.minWidth = `${target.length}ch`
      counter.setAttribute('aria-label', target)
      counter.textContent = counterObserver ? '0' : target
      counterObserver?.observe(counter)
    })

    if (counterObserver) observers.push(counterObserver)
  })

  function animateCounter(counter) {
    const target = Number(counter.dataset.target)
    const duration = target <= 3 ? 450 : target <= 10 ? 800 : 1600
    const startedAt = performance.now()

    const update = now => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      counter.textContent = Math.floor(target * eased)
      if (progress < 1) {
        const frame = requestAnimationFrame(update)
        frames.add(frame)
      } else {
        counter.textContent = target
      }
    }

    const frame = requestAnimationFrame(update)
    frames.add(frame)
  }

  onBeforeUnmount(() => {
    observers.forEach(observer => observer.disconnect())
    timers.forEach(timer => clearTimeout(timer))
    frames.forEach(frame => cancelAnimationFrame(frame))
  })
}
