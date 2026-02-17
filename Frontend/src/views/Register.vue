<template>
    <main v-if="!username">
        <form @submit.prevent="handleRegister">
            <h2>Register</h2>

            <label for="username">Username:</label>
            <input type="text" id="username" v-model="form.username" required />

            <label for="password">Password:</label>
            <input type="password" id="password" v-model="form.password" required />

            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" v-model="form.confirmPassword" required />

            <button type="submit">Register</button>

            <p v-if="error" class="error">{{ error }}</p>

            <p>
                ¿Tienes cuenta?
                <RouterLink to="/login">Iniciar sesión</RouterLink>
            </p>
        </form>
    </main>

    <div v-else>
        <h2>Ya estás registrado como {{ username }}</h2>
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
    password: '',
    confirmPassword: ''
})

const handleRegister = async () => {
    error.value = null

    if (form.value.password !== form.value.confirmPassword) {
        error.value = "Las contraseñas no coinciden"
        return
    }

    try {
        const res = await fetch(`${URL_B}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: form.value.username,
                password: form.value.password
            })
        })

        if (!res.ok) {
            throw new Error('Error en el registro')
        }

        // Redirigir después de registro
        router.push('/protected')

    } catch (err) {
        error.value = err.message
    }
}
</script>

<style scoped>
/* Contenedor principal */
main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #ecf0f1;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Card formulario */
form {
  background-color: #ffffff;
  padding: 35px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  width: 340px;
  display: flex;
  flex-direction: column;
}

/* Título */
form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

/* Labels */
label {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #2c3e50;
}

/* Inputs */
input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  outline: none;
}

/* Focus elegante */
input:focus {
  border-color: #1abc9c;
  box-shadow: 0 0 0 3px rgba(26, 188, 156, 0.15);
}

/* Botón */
button {
  padding: 12px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 5px;
}

button:hover {
  background-color: #16a085;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0px);
}

/* Error */
.error {
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
}

/* Link login */
form p {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

form a {
  color: #1abc9c;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

form a:hover {
  color: #16a085;
  text-decoration: underline;
}

/* Ya registrado */
div[v-else] {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  font-size: 1.2rem;
}

/* Responsive */
@media (max-width: 600px) {
  form {
    width: 100%;
    max-width: 350px;
  }
}
</style>
