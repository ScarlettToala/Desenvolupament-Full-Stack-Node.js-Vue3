<template>
  <div v-if="user">
    <h1>Hola {{ user.username }}</h1>
    <p>Estás dentro de una zona protegida</p>
    <p>Solo los usuarios autenticados pueden ver esta página.</p>

    <div class="links">
      <button @click="logout">
        Cerrar Sesión
      </button>

      <nav>
        <ul>
          <li><RouterLink to="/profile">Perfil</RouterLink></li>
          <li><RouterLink to="/products">CRUD de productos</RouterLink></li>
        </ul>
      </nav>
    </div>
  </div>

  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { URL_B } from '../../config'

const router = useRouter()
const user = ref(null)

// Obtener info del usuario
const fetchUser = async () => {
  try {
    const res = await fetch(`${URL_B}/profile`, {
      credentials: 'include'
    })
    if (!res.ok) return router.push('/login')
    user.value = await res.json()
  } catch {
    router.push('/login')
  }
}

// Logout
const logout = async () => {
  await fetch(`${URL_B}/logout`, { credentials: 'include' })
  router.push('/login')
}

onMounted(fetchUser)
</script>
