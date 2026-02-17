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

<style scoped>
.product-card {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  padding: 35px 25px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.product-card h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 20px;
}

.product-card p {
  color: #555;
  font-size: 1rem;
  margin: 10px 0;
}

.product-card p strong {
  color: #2c3e50;
}

.product-card .price {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1abc9c;
  margin-bottom: 15px;
}

/* Acciones */
.product-item {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 15px;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15);
}

.product-item strong {
  font-size: 1.2rem;
  color: #2c3e50;
}

.product-item p {
  color: #7f8c8d;
  margin: 10px 0 15px 0;
}

/* Acciones del item */
.product-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.product-actions a,
.product-actions button {
  font-size: 0.9rem;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s, transform 0.2s;
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.product-actions a {
  color: #1abc9c;
}

.product-actions a:hover {
  color: #16a085;
}

.product-actions button {
  background-color: #e74c3c;
  color: white;
}

.product-actions button:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}
</style>
