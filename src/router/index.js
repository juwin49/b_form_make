import Vue from 'vue'
import Router from 'vue-router'

import Home from '../demo/Home.vue'
import PhoneTest from '../demo/phoneTest.vue'
import Move from '../demo/move.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/phoneTest',
      component: PhoneTest
    },
    {
      path: '/move',
      component: Move
    }
  ]
})
