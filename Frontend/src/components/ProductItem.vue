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
.product-item {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

/* Acciones */
.product-actions ul {
  display: flex;
  gap: 12px;
  padding: 0;
  list-style: none;
  align-items: center;
}

.product-actions a {
  text-decoration: none;
  font-size: 0.9rem;
  color: #1abc9c;
  font-weight: 500;
  transition: color 0.2s;
}

.product-actions a:hover {
  color: #16a085;
}

.product-actions button {
  cursor: pointer;
  background: #e74c3c;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  transition: background-color 0.2s;
}

.product-actions button:hover {
  background-color: #c0392b;
}
</style>

