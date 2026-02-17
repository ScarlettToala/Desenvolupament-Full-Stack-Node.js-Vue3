<template>
  <section>
    <h2>Lista de Productos</h2>

    <!-- Mensaje si no hay usuario logueado -->
    <p v-if="!user" class="alert-login">
      Inicia sesión para poder editar o eliminar productos
    </p>

    <!-- Lista de productos -->
    <ul class="product-list">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ProductItem from '@/components/ProductItem.vue'
import { URL_B } from '../../config'

const products = ref([])
const user = ref(null)

// Función para cargar productos desde la API
const loadProducts = async () => {
  try {
    const res = await fetch(`${URL_B}/api/products`, { credentials: 'include' })
    products.value = await res.json()
  } catch (err) {
    console.error('Error cargando productos', err)
  }
}

// Función para obtener usuario logueado
const loadUser = async () => {
  try {
    const res = await fetch(`${URL_B}/profile`, { credentials: 'include' })
    if (res.ok) user.value = await res.json()
  } catch (err) {
    console.log('No hay usuario logueado')
  }
}

// Escuchar evento de producto eliminado
const onProductDeleted = (event) => {
  const id = event.detail
  products.value = products.value.filter(p => p.id !== id)
}

// Montaje inicial
onMounted(() => {
  loadProducts()
  loadUser()

  // Escuchamos el evento global de ProductItem
  window.addEventListener('product-deleted', onProductDeleted)
})

// Limpiar listener al desmontar
onUnmounted(() => {
  window.removeEventListener('product-deleted', onProductDeleted)
})
</script>

<style scoped>
.product-list {
  list-style: none;
  padding: 0;
}

.alert-login {
  color: #d9534f;
  font-weight: bold;
  margin-bottom: 1em;
}

section {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 25px;
}

/* Alerta login */
.alert-login {
  background-color: #fdecea;
  color: #e74c3c;
  padding: 12px 16px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 25px;
}

/* Grid de productos */
.product-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

</style>
