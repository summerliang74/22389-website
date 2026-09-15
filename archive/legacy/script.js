gsap.registerPlugin(ScrollTrigger);

// 1. HORIZONTAL MAIN NAVIGATION
const panels = gsap.utils.toArray(".panel");
gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal-container",
        pin: true,
        scrub: 1,
        end: () => "+=" + (panels.length * window.innerWidth)
    }
});

// 2. SPOTLIGHT INTERACTION
const spotlightZone = document.getElementById('slogan-spotlight');
const revealLayer = document.getElementById('slogan-reveal');

spotlightZone.addEventListener('mousemove', (e) => {
    const rect = spotlightZone.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gsap.to(revealLayer, {
        clipPath: `circle(140px at ${x}px ${y}px)`,
        duration: 0.4,
        ease: "power2.out"
    });
});

spotlightZone.addEventListener('mouseleave', () => {
    gsap.to(revealLayer, {
        clipPath: `circle(0% at 50% 50%)`,
        duration: 0.8,
        ease: "expo.out"
    });
});

// 3. PERSONNEL GALLERY DRAG PHYSICS
const slider = document.getElementById('member-slider');
let isDown = false;
let startX;
let scrollLeft;
let velocity = 0;
let lastX = 0;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    velocity = 0;
});

slider.addEventListener('mouseleave', () => isDown = false);
slider.addEventListener('mouseup', () => {
    isDown = false;
    // Optional: Add momentum here
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2.5; 
    slider.scrollLeft = scrollLeft - walk;
});

// 4. SUBPAGE STATE CONTROLS
function openSubpage(id) {
    const sub = document.getElementById(`sub-${id}`);
    if (!sub) return;

    // Reset visibility
    sub.style.display = 'block';
    
    // Animate
    gsap.fromTo(sub, 
        { clipPath: "circle(0% at 50% 50%)", opacity: 0 }, 
        { 
            clipPath: "circle(150% at 50% 50%)", 
            opacity: 1, 
            duration: 1.2, 
            ease: "expo.inOut",
            onStart: () => {
                document.body.style.overflow = 'hidden'; // Stop background scroll
            }
        }
    );
    
    // Hide Navigation
    gsap.to(".nav-dock", { opacity: 0, y: 50, duration: 0.5 });
}

function closeAllSubpages() {
    const subs = document.querySelectorAll('.subpage');
    subs.forEach(sub => {
        if(sub.style.display !== 'none') {
            gsap.to(sub, { 
                clipPath: "circle(0% at 50% 50%)", 
                opacity: 0,
                duration: 0.8, 
                ease: "expo.in", 
                onComplete: () => {
                    sub.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Re-enable scroll
                    gsap.to(".nav-dock", { opacity: 1, y: 0, duration: 0.5 });
                }
            });
        }
    });
}

// 5. PARALLAX EFFECT FOR CARDS
slider.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.member-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const screenCenter = window.innerWidth / 2;
        const cardCenter = rect.left + rect.width / 2;
        const distanceFromCenter = (cardCenter - screenCenter) / screenCenter;
        
        // Subtle tilt based on scroll position
        gsap.to(card, {
            rotationY: distanceFromCenter * 15,
            duration: 0.5
        });
    });
});