const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Repeatable, compositor-friendly scroll reveals. Content stays visible when
// JavaScript is unavailable, and people who prefer less motion see no effect.
if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealTargets = new Map();

  document.querySelectorAll('[data-reveal]').forEach(group => {
    const mode = group.dataset.reveal;
    const targets = mode === 'children' || mode === 'contents'
      ? Array.from(group.children)
      : [group];

    targets.forEach((target, index) => {
      if (!revealTargets.has(target)) revealTargets.set(target, Math.min(index * 70, 280));
    });
  });

  // Season archive pages predate the data attributes, so reveal each major
  // chapter as it reaches the viewport.
  document.querySelectorAll('.season-page .archive-section').forEach(section => {
    if (!revealTargets.has(section)) revealTargets.set(section, 0);
  });

  revealTargets.forEach((delay, target) => {
    target.classList.add('scroll-reveal');
    target.style.setProperty('--reveal-delay', `${delay}ms`);
  });
  document.documentElement.classList.add('reveal-enabled');

  const revealTimers = new WeakMap();

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const target = entry.target;
      const delay = revealTargets.get(target) || 0;

      if (!entry.isIntersecting) {
        window.clearTimeout(revealTimers.get(target));
        target.classList.remove('is-visible');
        return;
      }

      target.classList.add('is-visible');
      revealTimers.set(target, window.setTimeout(() => {
        target.classList.remove('is-visible');
      }, 900 + delay));
    });
  // Start just outside the viewport so opacity never drops after content is
  // already visible. This also makes fast scrolling feel much steadier.
  }, { threshold: 0, rootMargin: '16% 0px 16% 0px' });

  requestAnimationFrame(() => revealTargets.forEach((_, target) => revealObserver.observe(target)));
}

const counterObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    counterObserver.unobserve(counter);
    const target = Number(counter.dataset.target);
    const duration = (target <= 3 ? 450 : target <= 10 ? 800 : 1600);
    const startedAt = performance.now();
    const update = now => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target;
    };
    requestAnimationFrame(update);
  });
}, { threshold: 0.5 }) : null;

document.querySelectorAll('.count-up').forEach(counter => {
  const target = counter.dataset.target;
  counter.style.minWidth = target.length + 'ch';
  counter.setAttribute('aria-label', target);
  counter.textContent = reduceMotion || !counterObserver ? target : '0';
  if (!reduceMotion) counterObserver?.observe(counter);
});

const dialog = document.getElementById('contact-dialog');
document.querySelectorAll('[data-open-contact]').forEach(button => {
  button.addEventListener('click', () => dialog?.showModal());
});
document.querySelector('[data-copy-email]')?.addEventListener('click', async () => {
  const status = document.getElementById('contact-status');
  try {
    await navigator.clipboard.writeText('julie_zhu_efz@outlook.com');
    status.textContent = 'Email copied.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('.contact-email'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Email selected. Copy it using your device’s copy command.';
  }
});
dialog?.addEventListener('close', () => {
  document.getElementById('contact-status').textContent = '';
});

document.querySelectorAll('.page-transition-link').forEach(link => {
  link.addEventListener('click', event => {
    if (reduceMotion || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(() => { window.location.href = link.href; }, 180);
  });
});

window.addEventListener('pageshow', () => document.body.classList.remove('page-leaving'));
