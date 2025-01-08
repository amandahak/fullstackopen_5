import axios from 'axios'

const baseUrl = '/api/login'

// Kirjautumisen API-kutsu
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }