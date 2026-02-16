<template>
  <li class="product-item">
    <strong>{{ product.name }}</strong>
    <p>Categoria: {{ product.category }}</p>

    <nav class="product-actions">
      <ul>
        <!-- Siempre visible: Detalle -->
        <li>
          <RouterLink :to="`/products/${product.id}`">🔍 Detalle</RouterLink>
        </li>

        <!-- Solo usuarios logueados: Editar y eliminar -->
        <li v-if="user">
          <RouterLink :to="`/products/edit/${product.id}`" title="Editar">
            ✏️
          </RouterLink>
        </li>
        <li v-if="user">
          <button @click="deleteProduct(product.id)" title="Eliminar">
            🗑️
          </button>
        </li>
      </ul>
    </nav>
  </li>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { URL_B } from '../../config'

defineProps({
  product: Object
})

const user = ref(null)

// Obtener usuario logueado para mostrar botones
onMounted(async () => {
  try {
    const res = await fetch(`${URL_B}/profile`, { credentials: 'include' })
    if (res.ok) user.value = await res.json()
  } catch (err) {
    console.log('No hay usuario logueado')
  }
})

// Función eliminar
const deleteProduct = async (id) => {
  if (!confirm('¿Eliminar este producto?')) return
  try {
    const res = await fetch(`${URL_B}/api/products/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    if (res.ok) {
      // Emitimos un evento al padre para actualizar la lista
      const event = new CustomEvent('product-deleted', { detail: id })
      window.dispatchEvent(event)
    } else {
      alert('No tienes permisos o ocurrió un error')
    }
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
.product-actions ul {
  display: flex;
  gap: 10px;
  padding: 0;
  list-style: none;
}

.product-actions button {
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 1.2em;
}
</style>
