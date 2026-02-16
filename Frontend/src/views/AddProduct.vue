<template>
  <div>
    <header>
      <h1>Añadir un nuevo producto</h1>
    </header>

    <main>
      <ProductForm
        buttonText="Agregar Producto"
        @submit="createProduct"
      />

      <RouterLink to="/products">
        Volver al listado
      </RouterLink>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import ProductForm from '@/components/ProductForm.vue'
import { URL_B } from '../../config'

const router = useRouter()

const createProduct = async (productData) => {
  await fetch(`${URL_B}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(productData)
  })

  router.push('/products')
}
</script>
