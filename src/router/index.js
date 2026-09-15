export const routes = [
  {
    path: '/',
    alias: '/index.html',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: '22389 | AE86 Elite Robotics',
      description: 'Meet AE86, FTC Team 22389 from Shanghai. Explore our robots, season archives, competition results and student team.',
      type: 'website',
      image: '/assets/images/seasons/into-the-deep/robot-ascent.webp',
      imageAlt: 'AE86 robot 22389 on the INTO THE DEEP field',
    },
  },
  {
    path: '/uniform',
    alias: '/uniform.html',
    name: 'uniform',
    component: () => import('../views/UniformView.vue'),
    meta: {
      title: 'Team Uniform | AE86 FTC 22389',
      description: 'Explore the AE86 FTC 22389 team uniform, including our team hoodie and competition T-shirt designs.',
      type: 'website',
      image: '/assets/images/uniform/cutout/hoodie-white.png',
      imageAlt: 'White AE86 team hoodie shown from the front and back',
      bodyClass: 'uniform-page',
    },
  },
  {
    path: '/seasons/powerplay',
    alias: '/seasons/powerplay.html',
    name: 'powerplay',
    component: () => import('../views/SimpleSeasonView.vue'),
    props: { seasonKey: 'powerplay' },
    meta: {
      title: 'POWERPLAY 2022–2023 | AE86 FTC 22389',
      description: "Explore AE86 FTC Team 22389's POWERPLAY rookie season, first competition robot and official 2022–2023 results.",
      type: 'article',
      image: '/assets/images/seasons/powerplay/robot.webp',
      imageAlt: 'AE86 robot 22389 on the POWERPLAY field',
      bodyClass: 'season-page',
    },
  },
  {
    path: '/seasons/centerstage',
    alias: '/seasons/centerstage.html',
    name: 'centerstage',
    component: () => import('../views/SimpleSeasonView.vue'),
    props: { seasonKey: 'centerstage' },
    meta: {
      title: 'CENTERSTAGE 2023–2024 | AE86 FTC 22389',
      description: "Explore AE86 FTC Team 22389's CENTERSTAGE robot, competition story and official 2023–2024 season results.",
      type: 'article',
      image: '/assets/images/seasons/center-stage/微信图片_20260905193502_34_1136.webp',
      imageAlt: 'AE86 CENTERSTAGE robot 22389 with its hanging hooks raised',
      bodyClass: 'season-page',
    },
  },
  {
    path: '/seasons/into-the-deep',
    alias: '/seasons/into-the-deep.html',
    name: 'into-the-deep',
    component: () => import('../views/IntoTheDeepView.vue'),
    meta: {
      title: 'INTO THE DEEP 2024–2025 | AE86 FTC 22389',
      description: "Explore AE86 FTC Team 22389's INTO THE DEEP robot, engineering, international competition results and 2024–2025 team.",
      type: 'article',
      image: '/assets/images/seasons/into-the-deep/robot-ascent.webp',
      imageAlt: 'AE86 robot 22389 hanging from the INTO THE DEEP field structure',
      bodyClass: 'season-page',
    },
  },
  {
    path: '/seasons/decode',
    alias: '/seasons/decode.html',
    name: 'decode',
    component: () => import('../views/DecodeView.vue'),
    meta: {
      title: 'DECODE 2025–2026 | AE86 FTC 22389',
      description: "Explore AE86 FTC Team 22389's DECODE robot design, swerve chassis, auto-aim launcher, competition results and 2025–2026 team.",
      type: 'article',
      image: '/assets/images/seasons/decode/robot-cad-1.png',
      imageAlt: "Front-left CAD view of AE86's DECODE robot",
      bodyClass: 'season-page',
    },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition
  if (to.hash) return { el: to.hash, top: 88, behavior: from.path === to.path ? 'smooth' : 'auto' }
  return { top: 0 }
}
