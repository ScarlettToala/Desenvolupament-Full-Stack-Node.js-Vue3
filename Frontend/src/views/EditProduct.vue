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

  if (!res.ok) {
      console.error("Status del error:", res.status);
      console.error("Error al obtener producto:", res.status);
      router.push('/'); 
      return;
  }

  const data = await res.json();
  console.log("Datos del producto recibidos:", data); // Revisa la consola del navegador
  product.value = data;
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

<style scoped>
/* Contenedor principal */
div[v-if="product"] {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

header h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin: 0;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* Link volver */
main a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  padding: 10px 20px;
  border: 1px solid #3498db;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

main a:hover {
  background-color: #3498db;
  color: white;
}

/* Estado cargando */
div[v-else] {
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
  div[v-if="product"] {
    padding: 10px;
  }

  header h1 {
    font-size: 1.5rem;
  }
}
</style>
