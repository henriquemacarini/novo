import { api } from './api'


export async function startJourney(data: any) {
  return api.post('/teacher/journey-start', data)
}

export async function finishJourney(data: any) {
  return api.post('/teacher/journey-end', { document: data })
}

export async function getSchedule(school_id: string) {
  return api.post('/teacher/schedule', { school_id })
}

export async function getHistory(school_id: string) {
  return api.post('/teacher/history', { school_id })
}

export async function getTie() {
  return api.get('/teacher/get-tie')
}

export async function sendUnavailability(note: string) {
  return api.post('/teacher/unavailability', { status: 0, note })
}

export async function sendAvailability(note: string) {
  return api.post('/teacher/unavailability', { status: 1, note })
}

export async function searchJourney(id: string) {
  return api.post('/teacher/get-journey', { id })
}
