import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home';
import Products from "@/views/Products";
import ProductDetail from "@/src/views/ProductDetail";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/products/:id', component: ProductDetail }
  ]
})

export default router
