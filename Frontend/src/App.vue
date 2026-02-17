<template>
  <nav class="navbar">
    <div class="nav-left">
      <RouterLink class="nav-link" to="/">Home</RouterLink>
      <RouterLink class="nav-link" to="/products">Products</RouterLink>
    </div>

    <div class="nav-right">
      <!-- Si NO hay usuario -->
      <span v-if="!user">
        <RouterLink class="nav-link" to="/login">
          Iniciar sesión
        </RouterLink>
      </span>

      <!-- Si SÍ hay usuario -->
      <span v-else class="logged-in">
        <RouterLink class="nav-link" to="/profile">
          Perfil
        </RouterLink>

        <button class="btn-logout" @click="logout">
          Cerrar sesión
        </button>
      </span>
    </div>
  </nav>

  <RouterView />
</template>

<script setup>
import { ref, watchEffect,  provide } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import { URL_B } from '../config.js'

const user = ref(null)
const route = useRoute()

//  Esta función consulta siempre al backend
const fetchUser = async () => {
  try {
    const res = await fetch(`${URL_B}/profile`, {
      credentials: 'include'
    })

    if (!res.ok) {
      user.value = null
      return
    }

    user.value = await res.json()
  } catch {
    user.value = null
  }
}

// Se ejecuta cada vez que cambias de ruta
watchEffect(() => {
  route.fullPath
  fetchUser()
})

// Logout
const logout = async () => {
  await fetch(`${URL_B}/logout`, {
    credentials: 'include'
  })

  user.value = null
}

provide('user', user)
provide('logout', logout)

</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  padding: 0.5rem 1.5rem;
  color: #ecf0f1;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.nav-link {
  margin-right: 1rem;
  color: #ecf0f1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #1abc9c;
}

.nav-right {
  display: flex;
  align-items: center;
}

.logged-in .nav-link {
  margin-right: 1rem;
}

.btn-logout {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 0.35rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.btn-logout:hover {
  background-color: #c0392b;
}

@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-left,
  .nav-right {
    margin-bottom: 0.5rem;
  }

  .nav-link {
    margin-right: 0.5rem;
  }

  .btn-logout {
    padding: 0.3rem 0.6rem;
  }
}
</style>
