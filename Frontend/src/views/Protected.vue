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

<style scoped>
/* Contenedor principal */
div[v-if="user"] {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ecf0f1;
}

/* Card */
div[v-if="user"] {
  background: #ffffff;
  padding: 40px;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  max-width: 550px;
  width: 100%;
  text-align: center;
  transition: transform 0.2s ease;
}

div[v-if="user"]:hover {
  transform: translateY(-4px);
}

/* Título */
h1 {
  color: #2c3e50;
  margin-bottom: 15px;
}

/* Textos */
p {
  color: #555;
  margin-bottom: 10px;
}

/* Sección links */
.links {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

/* Botón logout */
button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 12px 22px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

button:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}

/* Navegación */
nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

nav a {
  text-decoration: none;
  background-color: #1abc9c;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

nav a:hover {
  background-color: #16a085;
  transform: translateY(-2px);
}

/* Loading */
div[v-else] {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.2rem;
  color: #2c3e50;
}

/* Responsive */
@media (max-width: 600px) {
  div[v-if="user"] {
    padding: 25px;
  }

  nav ul {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
