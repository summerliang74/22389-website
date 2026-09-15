import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import '../assets/css/utilities.css'
import '../assets/css/site.css'
import './styles/vue.css'

export const createApp = ViteSSG(App, { routes, scrollBehavior })
