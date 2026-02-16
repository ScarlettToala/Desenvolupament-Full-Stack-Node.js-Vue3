<template>
    <div v-if="user">
        <header>
            <h1>{{ user.username }}</h1>

            <div class="marco">
                <img src="https://via.placeholder.com/150" alt="Foto">
            </div>

            <div class="links">
                <nav>
                    <ul>
                        <li>
                            <button @click="logout">
                                Cerrar sesión
                            </button>
                        </li>

                        <li>
                            <RouterLink to="/">
                                Volver
                            </RouterLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

        <section>
            <p>Tu ID de usuario es: {{ user.id }}</p>
        </section>
    </div>

    <div v-else>
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

// 🔹 Obtener perfil
const fetchProfile = async () => {
    try {
        const res = await fetch(`${URL_B}/profile`, {
            credentials: 'include'
        })

        if (!res.ok) {
            console.log("Sesión no válida o error en servidor");
            router.push('/login')
            return
        }

        user.value = await res.json()

    } catch (error) {
        router.push('/login')
    }
}

// 🔹 Logout
const logout = async () => {
    await fetch(`${URL_B}/logout`, {
        credentials: 'include'
    })

    router.push('/')
}

onMounted(fetchProfile)
</script>

<style scoped>
.marco img {
    width: 150px;
    border-radius: 50%;
}
</style>
