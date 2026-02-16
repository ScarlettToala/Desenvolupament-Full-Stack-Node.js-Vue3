<template>
  <div v-if="product">
    <header>
      <h1>Editar Producto: {{ product.name }}</h1>
    </header>

    <main>
      <ProductForm
        :product="product"
        buttonText="Guardar Cambios"
        @submit="updateProduct"
      />

      <RouterLink to="/products">
        Volver al listado
      </RouterLink>
    </main>
  </div>

  <div v-else>
    <p>Cargando producto...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import ProductForm from '@/components/ProductForm.vue'
import { URL_B } from '../../config.js'

const route = useRoute()
const router = useRouter()

const product = ref(null)

// 1. Obtener producto por ID
onMounted(async () => {
  const res = await fetch(
    `${URL_B}/api/products/${route.params.id}`,
    { credentials: 'include' }
  )

  product.value = await res.json()
})

// 2. Actualizar producto
const updateProduct = async (updatedData) => {
  await fetch(
    `${URL_B}/api/products/${route.params.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(updatedData)
    }
  )

  router.push('/products')
}
</script>
