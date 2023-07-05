import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News..vue'
import New from '../views/New.vue'
import Product from '../views/Product.vue'


const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/news',
    component: News
  },{
    path:'/product',
    component: Product
  },{
    path:'/news/:id',
    component: New
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
