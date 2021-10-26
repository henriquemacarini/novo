import axios from 'axios'
import { api } from './api'

export interface SignUpProps {
  name: string
  document: string
  phone: string
  email: string
  address: string
  number: string
  uf: string
  city: string
  zip_code: string
  password: string
  password_confirmation: string
  image: any
}

export async function SignInFc(user: string, password: string, expoPushToken: string | undefined) {
  const data = {
    document: user,
    password: password,
    player_id: expoPushToken
  }
  return api.post('/general/teacher/login', data)
}

export async function SignUpFc(data: SignUpProps) {
  return api.post('/general/teacher/register', data)
}

export async function getSchools(city: string, uf: string) {
  return api.get(`/general/schools/ARAXA/MG`)
}

export async function recoverPassword(document: string) {
  return api.post('/general/teacher/reset-password', { document })

}