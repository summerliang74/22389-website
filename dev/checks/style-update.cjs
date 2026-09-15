const fs=require('fs');let h=fs.readFileSync('index.html','utf8');h=h.replace('</style>',`
        /* Content hierarchy and season archives */
        * { box-sizing: border-box; }
        button, a { -webkit-tap-highlight-color: transparent; }
        button:focus-visible, a:focus-visible { outline: 2px solid #f87171; outline-offset: 5px; }
        .nav-dock .nav-item { color: #a1a1aa; }
        .home-hero, .home-section { padding: 7rem max(1.5rem, calc((100vw - 1280px) / 2)); }
        .home-hero { padding-top: 9rem; padding-bottom: 0; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .hero-title { font-size: clamp(5rem, 8vw, 8rem); line-height: .88; font-style: italic; letter-spacing: -.07em; margin: 2rem 0; }
        .hero-title span { color: var(--accent); }
        .hero-summary { font-size: 1.2rem; line-height: 1.6; max-width: 34rem; color: #eee; }
        .hero-detail { margin-top: 1rem; color: #a1a1aa; line-height: 1.8; max-width: 34rem; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; margin-top: 2rem; }
        .primary-action { display: inline-block; padding: 1rem 1.3rem; background: var(--accent); color: white; font-size: .85rem; font-weight: 700; }
        .primary-action:hover { background: #b91c1c; }
        .text-link { color: #f4f4f5; font-size: .85rem; font-weight: 700; text-underline-offset: 5px; display: inline-block; padding-block: .5rem; }
        .text-link:hover { color: #f87171; text-decoration: underline; }
        .hero-photo { border: 1px solid #27272a; margin: 0; }
        .hero-photo img { width: 100%; height: 470px; object-fit: cover; object-position: 49% center; }
        figcaption { color: #a1a1aa; font-size: .75rem; line-height: 1.6; padding-top: 1rem; }
        .hero-photo figcaption { padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: .65rem; }
        .hero-motto { border-top: 1px solid #27272a; margin-top: 4rem; padding: 2rem 0; display: flex; gap: 1rem; align-items: center; justify-content: space-between; }
        .hero-motto > span { font-size: .65rem; color: #a1a1aa; letter-spacing: .14em; }
        .hero-motto p { font-style: italic; font-size: clamp(1rem, 2vw, 1.8rem); }
        .home-section { border-top: 1px solid #27272a; }
        .home-heading { font-size: clamp(2.5rem, 5vw, 4.6rem); line-height: 1; font-style: italic; text-transform: uppercase; margin-top: 1.5rem; }
        .section-intro { max-width: 42rem; line-height: 1.8; color: #a1a1aa; margin: 1.5rem 0 2.5rem; }
        .highlight-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .highlight-card { display: flex; flex-direction: column; background: #0a0a0a; border: 1px solid #27272a; padding: 2rem; }
        .highlight-number { font-size: clamp(3rem, 5vw, 5rem); line-height: 1.2; color: #ef4444; font-style: italic; }
        .highlight-card h3 { margin-top: 1.5rem; font-size: 1.1rem; font-weight: 700; }
        .highlight-card > p:not(.highlight-number) { color: #a1a1aa; line-height: 1.7; margin: 1rem 0; flex: 1; }
        .section-bottom { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; align-items: center; padding-top: 2rem; }
        .section-bottom span { color: #a1a1aa; font-size: .8rem; }
        #contact { order: 6; }
        .site-footer { order: 7; padding: 2rem 1.5rem; border-top: 1px solid #27272a; color: #a1a1aa; font-size: .65rem; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; }
        .contact-address { margin-top: 1.2rem; color: #a1a1aa; font-size: .85rem; overflow-wrap: anywhere; }
        .season-archive { padding: 7.5rem 1.5rem 3rem; }
        .archive-wrap { max-width: 1120px; margin: auto; }
        .archive-title { font-size: clamp(2.7rem, 8vw, 6rem); line-height: 1; color: #ef4444; font-style: italic; margin: 1.5rem 0; overflow-wrap: anywhere; }
        .archive-lead { max-width: 44rem; color: #a1a1aa; font-size: 1.1rem; line-height: 1.8; }
        .archive-nav { display: flex; flex-wrap: wrap; gap: .7rem; padding: 2rem 0; }
        .archive-nav button { border: 1px solid #3f3f46; padding: .7rem 1rem; font-size: .75rem; color: #d4d4d8; }
        .archive-nav button:hover { border-color: #ef4444; color: white; }
        .archive-section { padding: 3rem 0; border-top: 1px solid #27272a; scroll-margin-top: 7rem; }
        .archive-section h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 900; margin: 1rem 0 1.5rem; }
        .archive-section > p:not(.section-kicker) { color: #a1a1aa; line-height: 1.8; max-width: 48rem; }
        .archive-section .archive-note { margin-top: 1.5rem; font-size: .85rem; }
        .mechanism-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem; }
        .mechanism-grid article { border: 1px solid #27272a; background: #0a0a0a; }
        .mechanism-grid img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
        .mechanism-copy { padding: 1.5rem; }
        .mechanism-copy h3 { font-size: 1.3rem; font-weight: 700; }
        .mechanism-copy dt { color: #f87171; margin-top: 1.2rem; font-size: .75rem; text-transform: uppercase; }
        .mechanism-copy dd { color: #a1a1aa; margin-top: .4rem; line-height: 1.7; font-size: .95rem; }
        .archive-results { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
        .archive-results > div { padding: 1.5rem; border: 1px solid #27272a; }
        .archive-results strong { font-size: 3rem; color: #ef4444; }
        .archive-results p { color: #a1a1aa; font-size: .85rem; line-height: 1.8; margin: .7rem 0; }
        .score-evidence { max-width: 550px; margin-top: 2rem; }
        .score-evidence img { width: 100%; }
        .archive-wide-photo { width: 100%; max-height: 650px; object-fit: contain; background: #0a0a0a; }
        #decode-roster { border: 0; padding-bottom: 0; }
        #decode-roster h2 { font-size: clamp(2rem, 4vw, 4rem); line-height: 1; }
        @media (max-width: 767px) {
            .hero-grid, .highlight-grid, .mechanism-grid, .archive-results { grid-template-columns: 1fr; }
            .home-hero { padding-top: 8rem; }
            .hero-grid { gap: 2.5rem; }
            .hero-photo img { height: 320px; }
            .hero-motto { align-items: flex-start; flex-direction: column; margin-top: 2rem; }
            .home-section { padding-block: 4rem; }
            .timeline-section { padding: 4rem 1.5rem; }
            .highlight-card { padding: 1.5rem; }
            .archive-section { padding-block: 2rem; }
        }
    </style>`);
// Keep keyboard focus inside an open archive and restore the trigger on return.
h=h.replace('        function openSubpage(id) {',`        let archiveTrigger = null;
        function openSubpage(id) {`);
h=h.replace("            sub.scrollTop = 0;", "            sub.scrollTop = 0;\n            archiveTrigger = document.activeElement;\n            document.getElementById('main-view').inert = true;\n            document.querySelector('.nav-dock').inert = true;\n            sub.focus({ preventScroll: true });");
h=h.replace("                            sub.style.display = 'none';", "                            sub.style.display = 'none';\n                            document.getElementById('main-view').inert = false;\n                            document.querySelector('.nav-dock').inert = false;\n                            archiveTrigger?.focus({ preventScroll: true });");
h=h.replace('        // IMPROVED LIQUID SLOGAN INTERACTION',`        document.addEventListener('keydown', event => {
            const active = Array.from(document.querySelectorAll('.subpage')).find(s => s.style.display === 'block');
            if (!active) return;
            if (event.key === 'Escape') closeAllSubpages();
            if (event.key === 'Tab') {
                const controls = Array.from(active.querySelectorAll('a[href], button, [tabindex="0"]'));
                const first = controls[0], last = controls[controls.length - 1];
                if (event.shiftKey && (document.activeElement === first || document.activeElement === active)) { event.preventDefault(); last.focus(); }
                else if (!event.shiftKey && (document.activeElement === last || document.activeElement === active)) { event.preventDefault(); first.focus(); }
            }
        });

        // IMPROVED LIQUID SLOGAN INTERACTION`);
fs.writeFileSync('index.html',h);
