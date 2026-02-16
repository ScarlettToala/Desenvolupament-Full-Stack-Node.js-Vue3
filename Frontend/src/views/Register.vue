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
