import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://test-api.sister.app.br/'
})

