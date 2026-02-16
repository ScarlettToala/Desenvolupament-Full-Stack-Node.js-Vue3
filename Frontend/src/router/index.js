import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import AddProduct from '@/views/AddProduct.vue';
import EditProduct from '@/views/EditProduct.vue';
import Profile from '@/views/Profile.vue';
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue';
import Protected from '@/views/Protected.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/products/:id', component: ProductDetail },
    { path: '/products/add', component: AddProduct },
    { path: '/products/edit/:id', component: EditProduct },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/protected', component: Protected},
    { path: '/profile', component: Profile }
  ]
})

export default router
