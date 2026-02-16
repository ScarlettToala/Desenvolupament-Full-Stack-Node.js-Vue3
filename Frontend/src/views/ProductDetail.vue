<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p><strong>Precio:</strong> {{ product.price }}</p>
    <p><strong>Categoría:</strong> {{ product.category }}</p>

    <!--  Solo si está autenticado -->
    <div v-if="isAuthenticated" class="actions">
      <RouterLink :to="`/products/edit/${product.id}`">
        Editar
      </RouterLink>

      <button @click="deleteProduct">
        Eliminar
      </button>
    </div>

    <RouterLink to="/products">Volver</RouterLink>
  </div>

  <div v-else>
    <p>Cargando producto...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { URL_B } from '../../config.js'

const route = useRoute()
const router = useRouter()

const product = ref(null)
const isAuthenticated = ref(false)

// 1. Comprobar si hay usuario
const checkAuth = async () => {
  const res = await fetch(`${URL_B}/`, {
    credentials: 'include'
  })

  const data = await res.json()
  isAuthenticated.value = !!data.username
}

// 2. Obtener producto
const fetchProduct = async () => {
  const res = await fetch(
    `${URL_B}/api/products/${route.params.id}`,
    { credentials: 'include' }
  )

  product.value = await res.json()
}

// 3. Eliminar producto
const deleteProduct = async () => {
  await fetch(
    `${URL_B}/api/products/${route.params.id}`,
    {
      method: 'DELETE',
      credentials: 'include'
    }
  )

  router.push('/products')
}

onMounted(() => {
  checkAuth()
  fetchProduct()
})
</script>
