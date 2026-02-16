<template>
  <div>
    <!-- Saludo -->
    <div class="saludo">
      <h1 v-if="!username">Bienvenido a ProductosS</h1>
      <h1 v-else>Bienvenido {{ username }}</h1>
    </div>

    <!-- Contenedor principal -->
    <div class="rectangulo">
      <div class="Navegacion">
        <h1>HOME</h1>
      </div>

      <!-- Iconos -->
      <div class="iconos">
        <!-- Usuario NO logueado -->
        <RouterLink v-if="!username" to="/login" title="Iniciar sesión">
          Iniciar Sesión
        </RouterLink>

        <!-- Usuario logueado -->
        <div v-else>
          <button @click="logout" title="Cerrar sesión">
            Cerrar Sesión
          </button>

          <RouterLink to="/cart" title="Carrito de compras">
            Carrito
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { URL_B } from "../../config.js"

const username = ref(null)

onMounted(async () => {
  try {
    const res = await fetch(`${URL_B}/`, {
      credentials: 'include'
    })
    const data = await res.json()
    username.value = data.username
  } catch (error) {
    console.error(error)
  }
})

const logout = async () => {
  await fetch(`${URL_B}/logout`, {
    credentials: 'include'
  })
  username.value = null
}
</script>

<style scoped>
.saludo {
  text-align: center;
  margin-top: 20px;
}

.rectangulo {
  margin: 20px;
}

.iconos img {
  width: 40px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
