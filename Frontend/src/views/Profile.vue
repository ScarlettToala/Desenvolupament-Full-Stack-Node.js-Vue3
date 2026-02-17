<template>
  <div class="profile-container" v-if="user">
    <div class="profile-card">
      <header class="profile-header">
        <div class="marco">
          <img src="https://via.placeholder.com/150" alt="Foto de perfil">
        </div>

        <h1>{{ user.username }}</h1>
        <p class="user-id">ID: {{ user.id }}</p>
      </header>

      <nav class="profile-actions">
        <button @click="logout" class="btn-logout">
          Cerrar sesión
        </button>

        <RouterLink to="/" class="btn-back">
          Volver
        </RouterLink>
      </nav>
    </div>
  </div>

  <div v-else class="loading">
    <p>Cargando perfil...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { URL_B } from '../../config'

const router = useRouter()
const user = ref(null)

const fetchProfile = async () => {
  try {
    const res = await fetch(`${URL_B}/profile`, {
      credentials: 'include'
    })

    if (!res.ok) {
      router.push('/login')
      return
    }

    user.value = await res.json()

  } catch (error) {
    router.push('/login')
  }
}

const logout = async () => {
  await fetch(`${URL_B}/logout`, {
    credentials: 'include'
  })

  router.push('/')
}

onMounted(fetchProfile)
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #ecf0f1;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.profile-card {
  background: white;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  width: 350px;
  text-align: center;
}

.profile-header h1 {
  margin-top: 15px;
  margin-bottom: 5px;
  color: #2c3e50;
}

.user-id {
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 20px;
}

/* Avatar */
.marco {
  display: flex;
  justify-content: center;
}

.marco img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 4px solid #1abc9c;
  object-fit: cover;
}

/* Botones */
.profile-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.btn-logout {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-logout:hover {
  background-color: #c0392b;
}

.btn-back {
  text-decoration: none;
  background-color: #1abc9c;
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-back:hover {
  background-color: #16a085;
}

/* Loading */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}

/* Responsive */
@media (max-width: 500px) {
  .profile-card {
    width: 100%;
    padding: 25px;
  }

  .profile-actions {
    flex-direction: column;
  }
}
</style>
