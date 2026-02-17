import { ref } from 'vue'
import { URL_B } from '../config'

const user = ref(null)

const fetchUser = async () => {
  try {
    const res = await fetch(`${URL_B}/profile`, {
      credentials: 'include'
    })

    if (!res.ok) {
      user.value = null
      return
    }

    user.value = await res.json()
  } catch {
    user.value = null
  }
}

const logout = async () => {
  await fetch(`${URL_B}/logout`, {
    credentials: 'include'
  })

  user.value = null
}

export function useAuth() {
  return { user, fetchUser, logout }
}
