import { api } from "./api";


export async function StartClass(data: any) {
  return api.post('/teacher/init-class', data)
}

export async function FinishClass(data: any) {
  return api.post('/teacher/end-class', data)
}

export async function PresenceRegistrer(data: any) {
  return api.post('/teacher/read-pupil', data)
}