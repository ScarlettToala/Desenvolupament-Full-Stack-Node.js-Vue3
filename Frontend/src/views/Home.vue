<template>
  <div class="home-container">
    <!-- Saludo -->
    <div class="saludo">
      <h1 v-if="!user">Bienvenido a Productos SA</h1>
      <h1 v-else>Bienvenido {{ user.username }}</h1>
    </div>

    <!-- Contenedor principal -->
    <div class="rectangulo">
      <div class="navegacion">
        <h2>HOME</h2>
      </div>

      <!-- Acciones -->
      <div class="iconos">
        <!-- Usuario NO logueado -->
        <RouterLink
          v-if="!user"
          to="/login"
          class="btn-link"
        >
          Iniciar Sesión
        </RouterLink>

        <!-- Usuario logueado -->
        <div v-else class="logged-actions">
          <button @click="logout" class="btn-logout">
            Cerrar Sesión
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { inject } from 'vue'

/*
  👇 Recibimos el user desde App.vue
*/
const user = inject('user')
const logout = inject('logout')
</script>


<style scoped>
.home-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
}

/* Saludo */
.saludo {
  text-align: center;
  margin-top: 30px;
}

.saludo h1 {
  font-size: 2.2rem;
  color: #2c3e50;
}

/* Rectángulo principal */
.rectangulo {
  background-color: #fff;
  margin: 30px auto;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  max-width: 500px;
}

/* Navegación dentro del rectángulo */
.navegacion h2 {
  text-align: center;
  color: #1abc9c;
  margin-bottom: 20px;
}

/* Iconos / Botones */
.iconos {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.btn-link {
  text-decoration: none;
  background-color: #1abc9c;
  color: #fff;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-link:hover {
  background-color: #16a085;
}

.logged-actions button.btn-logout {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.logged-actions button.btn-logout:hover {
  background-color: #c0392b;
}

/* Responsive */
@media (max-width: 600px) {
  .rectangulo {
    padding: 20px;
    margin: 20px 10px;
  }
  .saludo h1 {
    font-size: 1.8rem;
  }
  .iconos {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
