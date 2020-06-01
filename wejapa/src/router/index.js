import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Message from '../views/Message.vue'
import Jobs from '../views/JobListing.vue' 



// This is for importing the necessary layouts for the webpages
import Auth from '../layouts/auth'
import Default from '../layouts/default'

// This is where the imported layouts are used by vue
Vue.component('auth-layout', Auth)
Vue.component('default-layout', Default)

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    meta: { layout: 'auth' },
    component: Login,
  },  
  {
    path: '/dashboard',
    name: 'WeJapa',
    meta: { layout: 'default' },
    component: Jobs,
  },  
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'default' },
    component: Profile,
  },  
  {
    path: '/message',
    name: 'Message',
    meta: { layout: 'default' },
    component: Message,
  },   
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
