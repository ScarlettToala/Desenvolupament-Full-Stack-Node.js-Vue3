<template>
  <main v-if="!username" class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Iniciar Sesión</h2>

      <label for="username">Usuario:</label>
      <input
        type="text"
        id="username"
        v-model="form.username"
        placeholder="Tu usuario"
        required
      />

      <label for="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        v-model="form.password"
        placeholder="Tu contraseña"
        required
      />

      <button type="submit" class="btn-login">Iniciar Sesión</button>

      <p v-if="error" class="error">{{ error }}</p>

      <p class="register-text">
        ¿No tienes cuenta?
        <RouterLink class="register-link" to="/register">Registrarse</RouterLink>
      </p>
    </form>
  </main>

  <div v-else class="logged-in-message">
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
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form.value)
    })

    if (!res.ok) {
      throw new Error('Credenciales incorrectas')
    }

    const profile = await fetch(`${URL_B}/`, { credentials: 'include' })
    const data = await profile.json()
    username.value = data.username

    router.push('/protected')

  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
/* Contenedor principal centrado */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #ecf0f1;
  padding: 20px;
}

/* Formulario */
.login-form {
  background-color: #fff;
  padding: 30px 25px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  width: 320px;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

/* Inputs */
.login-form input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.login-form input:focus {
  border-color: #1abc9c;
  outline: none;
}

/* Botón login */
.btn-login {
  padding: 10px;
  background-color: #1abc9c;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-login:hover {
  background-color: #16a085;
}

/* Error */
.error {
  color: #e74c3c;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  text-align: center;
}

/* Registro */
.register-text {
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}

.register-link {
  color: #1abc9c;
  text-decoration: none;
  font-weight: 500;
}

.register-link:hover {
  text-decoration: underline;
}

/* Mensaje cuando ya está logueado */
.logged-in-message {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}
</style>
