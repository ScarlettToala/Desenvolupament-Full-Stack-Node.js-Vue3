<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">Nombre:</label>
    <input
      type="text"
      id="name"
      v-model="form.name"
      required
    />

    <label for="category">Categoría:</label>
    <input
      type="text"
      id="category"
      v-model="form.category"
      required
    />

    <label for="price">Precio (€):</label>
    <input
      type="number"
      id="price"
      v-model="form.price"
      step="0.01"
      required
    />

    <button type="submit">
      {{ buttonText }}
    </button>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    default: null
  },
  buttonText: {
    type: String,
    default: 'Guardar'
  }
})

const emit = defineEmits(['submit'])

const form = reactive({
  name: '',
  category: '',
  price: ''
})

// Si viene producto (modo editar), rellenamos formulario
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      form.name = newProduct.name
      form.category = newProduct.category
      form.price = newProduct.price
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('submit', { ...form })
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Labels */
label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

/* Inputs */
input {
  padding: 10px 12px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  outline: none;
}

/* Efecto focus moderno */
input:focus {
  border-color: #1abc9c;
  box-shadow: 0 0 0 3px rgba(26, 188, 156, 0.15);
}

/* Botón */
button {
  margin-top: 10px;
  padding: 12px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

/* Hover */
button:hover {
  background-color: #16a085;
  transform: translateY(-2px);
}

/* Active click */
button:active {
  transform: translateY(0px);
}

/* Responsive */
@media (max-width: 600px) {
  input {
    font-size: 13px;
  }

  button {
    font-size: 13px;
  }
}
</style>

