import React, { createContext, ReactNode, useState, useEffect } from 'react'
import { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { useAuth } from './auth';
import * as Location from 'expo-location';
import { Alert } from "react-native";

import { finishJourney, getHistory, getSchedule, searchJourney, startJourney } from '../services/journeyServices'
interface JourneyContextData {
  inJourney: boolean
  handleStartJourney(data: any): Promise<boolean | undefined>
  handleFinishJourney(data: string): Promise<boolean | undefined>
  history: any[]
  schedule: any[]
  journeyAbstract: any[]
  afterJourney: boolean
  school: string
  closeJourneyAbstract(): void
  checkStatus(status: string): void
  status: boolean | null
}
interface AuthProviderProp {
  children: ReactNode
}
interface location {
  coords: {
    latitude: string,
    longitude: string
  }
}

const JourneyContext = createContext<JourneyContextData>({} as JourneyContextData)

function JourneyProvider({ children }: AuthProviderProp) {

  const [inJourney, setInJourney] = useState(false)

  const [journeyID, setJourneyID] = useState('')

  const [location, setLocation] = useState<any | null>(null)

  const [history, setHistory] = useState([])

  const [schedule, setSchedule] = useState([])

  const { acess_token } = useAuth()

  const [journeyAbstract, setJourneyAbstract] = useState([])

  const [afterJourney, setafterJourney] = useState(false)

  const [school, setSchool] = useState('')

  const [status, setStatus] = useState<boolean | null>(null)

  function checkStatus(status: string) {
    if (status == '0')
      setStatus(false)
    else
      setStatus(true)
  }

  function closeJourneyAbstract() {
    setafterJourney(false)
  }
  useEffect(() => {
    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location)
      } catch (error) {
        console.log(error)
      }

    }

    async function searchForJourney() {
      const currentInJourney = await AsyncStorage.getItem('@sister:journeyId')

      const history = await AsyncStorage.getItem('@sister:history')

      const schedule = await AsyncStorage.getItem('@sister:schedule')

      const school = await AsyncStorage.getItem('@sister:school')

      if (school)
        setSchool(JSON.parse(school))
      if (schedule)
        setSchedule(JSON.parse(schedule))

      if (history)
        setHistory(JSON.parse(history))

      api.defaults.headers.authorization = `Bearer ${acess_token}`
      if (acess_token && currentInJourney) {
        const response = await searchJourney(currentInJourney)
        console.log(response.data)
        if (response.data.message) {
          setInJourney(false)
          setJourneyID('')
          await AsyncStorage.removeItem('@sister:journeyId')
          await AsyncStorage.removeItem('@sisterProfessor:journey')
        }
        else {
          setInJourney(true)
          setJourneyID(response.data.id)
          await AsyncStorage.setItem('@sisterProfessor:journey', JSON.stringify(true))
          await AsyncStorage.setItem('@sister:journeyId', JSON.stringify(response.data.id))
        }
      }
    }

    getLocation()
    searchForJourney()

  }, [acess_token])


  async function handleStartJourney(data: any) {

    const startJourneyInfo = {
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      document: data
    }
    api.defaults.headers.authorization = `Bearer ${acess_token}`
    const response = await startJourney(startJourneyInfo)
    console.log(response.data)
    if (response.data.checkin) {
      setInJourney(true)
      setJourneyID(response.data.checkin.id)
      setSchool(response.data.school.name)

      await AsyncStorage.setItem('@sister:school', JSON.stringify(response.data.school.name))

      await AsyncStorage.setItem('@sisterProfessor:journey', JSON.stringify(true))
      await AsyncStorage.setItem('@sister:journeyId', JSON.stringify(response.data.checkin.id))

      api.defaults.headers.authorization = `Bearer ${acess_token}`

      const schedule = await getSchedule(response.data.school.id)

      setSchedule(schedule.data)

      await AsyncStorage.setItem('@sister:schedule', JSON.stringify(schedule.data))

      const history = await getHistory(response.data.school.id)

      await AsyncStorage.setItem('@sister:history', JSON.stringify(history.data))

      setHistory(history.data)

      return Promise.resolve(true)
    }
    else {
      Alert.alert("Erro", response.data.message, [
        { text: "OK!" },
      ]);
    }
  }

  async function handleFinishJourney(data: string) {
    api.defaults.headers.authorization = `Bearer ${acess_token}`
    const response = await finishJourney(data)
    console.log(response.data)
    if (response.data.message) {
      await AsyncStorage.removeItem('@sisterProfessor:journey')
      await AsyncStorage.removeItem('@sister:journeyId')
      setJourneyAbstract(response.data.resume)
      setInJourney(false)
      setafterJourney(true)
      return Promise.resolve(true)
    }
    else {

    }
  }

  return (
    <JourneyContext.Provider value={{ inJourney, status, handleStartJourney, handleFinishJourney, closeJourneyAbstract, checkStatus, history, schedule, journeyAbstract, afterJourney, school }}>
      {children}
    </JourneyContext.Provider>
  )
}

function useJourney() {
  const context = useContext(JourneyContext)

  return context
}
export {
  JourneyProvider,
  useJourney
}