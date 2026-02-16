<template>
  <main v-if="!username">
    <form @submit.prevent="handleLogin">
      <h2>Login</h2>

      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        v-model="form.username"
        required
      />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="form.password"
        required
      />

      <button type="submit">Login</button>

      <p v-if="error" class="error">{{ error }}</p>

      <p>
        No tienes cuenta?
        <RouterLink to="/register">Registrarse</RouterLink>
      </p>
    </form>
  </main>

  <div v-else>
    <h2>Ya estás logueado como {{ username }}</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { URL_B } from '../../config'

const router = useRouter()

const username = ref(null)
const error = ref(null)

const form = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  error.value = null

  try {
    const res = await fetch(`${URL_B}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',//guarda la cookie
      body: JSON.stringify(form.value)
    })

    if (!res.ok) {
      throw new Error('Credenciales incorrectas')
    }

    // Opciona para hacer un fetch al perfil
    const profile = await fetch(`${URL_B}/`, {
      credentials: 'include'
    })

    const data = await profile.json()
    username.value = data.username

    // Redirigir después de login
    router.push('/protected')

  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

form {
  width: 300px;
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 5px;
}

button {
  padding: 8px;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
