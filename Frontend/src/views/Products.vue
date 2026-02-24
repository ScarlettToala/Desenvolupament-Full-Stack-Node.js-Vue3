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
  <RouterLink to="/products/add">
    <button>Añadir producto</button>
  </RouterLink>

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
section {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 2rem;
}

.alert-login {
  background-color: #fdecea;
  color: #e74c3c;
  padding: 12px 16px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 25px;
  border: 1px solid #f5c6cb;
}

/* Grid de productos */
.product-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

/* Botón añadir producto */
button {
  display: block;
  margin: 20px auto;
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}
</style>
