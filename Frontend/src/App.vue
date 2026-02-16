<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/products">Products</RouterLink>

    <!-- Mostrar según sesión -->
    <span v-if="!username">
      <RouterLink to="/login">Iniciar sesión</RouterLink>
    </span>
    <span v-else>
      <RouterLink to="/profile">Perfil</RouterLink>
      <button @click="logout">Cerrar sesión</button>
    </span>
  </nav>

  <RouterView />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { URL_B } from '../config'

const username = ref(null)

// Al montar, verificamos si hay usuario logueado
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

// Función de logout
const logout = async () => {
  await fetch(`${URL_B}/logout`, { credentials: 'include' })
  username.value = null
}
</script>
