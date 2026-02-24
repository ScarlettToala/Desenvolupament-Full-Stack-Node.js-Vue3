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

<style scoped>
div {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
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

a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  padding: 10px 20px;
  border: 1px solid #3498db;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

a:hover {
  background-color: #3498db;
  color: white;
}
</style>
