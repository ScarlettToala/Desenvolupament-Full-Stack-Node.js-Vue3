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
