<template>
  <div v-if="product" class="product-detail">
    <h1>{{ product.name }}</h1>
    <p><strong>Precio:</strong> {{ product.price }} €</p>
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

    <RouterLink to="/products" class="back-link">Volver</RouterLink>
  </div>

  <div v-else class="loading">
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

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

.product-detail h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.product-detail p {
  font-size: 1.2rem;
  color: #555;
  margin: 10px 0;
}

.product-detail p strong {
  color: #2c3e50;
}

.actions {
  margin: 30px 0;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.actions a,
.actions button {
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  cursor: pointer;
  border: none;
}

.actions a {
  background-color: #3498db;
  color: white;
}

.actions a:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.actions button {
  background-color: #e74c3c;
  color: white;
}

.actions button:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  padding: 10px 20px;
  border: 1px solid #3498db;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.back-link:hover {
  background-color: #3498db;
  color: white;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  font-size: 1.2rem;
}

/* Responsive */
@media (max-width: 600px) {
  .product-detail {
    padding: 20px;
    margin: 20px;
  }

  .product-detail h1 {
    font-size: 2rem;
  }

  .actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
