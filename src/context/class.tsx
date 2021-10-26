import React, { createContext, ReactNode, useState, useEffect } from 'react'
import { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { useAuth } from './auth';
import { FinishClass, PresenceRegistrer, StartClass } from '../services/class';
import { useNavigation } from '@react-navigation/core';
interface JourneyContextData {
  inClass: boolean
  startClass(firstId: string, secondId: string): Promise<boolean | undefined>
  finishClass(note: string): Promise<boolean | undefined>
  setToInClass(): void
  scanStudent(data: string): void
  deleteData(): void
  currentClass: string
  alunos: any[]
  registrados: any[]
  abstract: string
  lastClass: any
  classAbstract: any
}
interface AuthProviderProp {
  children: ReactNode
}

const ClassContext = createContext<JourneyContextData>({} as JourneyContextData)

function ClassProvider({ children }: AuthProviderProp) {

  const navigation: any = useNavigation()

  const [inClass, setInClass] = useState(false)
  const [currentClass, setCurrentClass] = useState('')
  const [classId, setClassId] = useState('')
  const [alunos, setAlunos] = useState([])
  const [registrados, setRegistrados] = useState([])
  const [abstract, setAbstract] = useState('')
  const [lastClass, setLastClass] = useState({})
  const [classAbstract, setClassAbstract] = useState({})

  useEffect(() => {
    async function getData() {
      const storagedClassId = await AsyncStorage.getItem('@sister:currentClassId')
      const storagedClass = await AsyncStorage.getItem('@sister:currentClass')
      const storagedPupils = await AsyncStorage.getItem('@sister:pupils')
      const storagedStudents = await AsyncStorage.getItem('@sister:students')
      const storagedLastClass = await AsyncStorage.getItem('@sister:lastClass')

      if (storagedLastClass)
        setLastClass(JSON.parse(storagedLastClass))

      if (storagedClassId) {
        setClassId(JSON.parse(storagedClassId))
        setInClass(true)
      }
      if (storagedClass)
        setCurrentClass(JSON.parse(storagedClass))
      if (storagedPupils)
        setRegistrados(JSON.parse(storagedPupils))
      if (storagedStudents)
        setAlunos(JSON.parse(storagedStudents))
    }
    getData()
  }, [])

  useEffect(() => {
    async function savePupils() {
      if (registrados.length > 0)
        await AsyncStorage.setItem('@sister:pupils', JSON.stringify(registrados))
    }
    savePupils()
  }, [registrados])

  useEffect(() => {
    async function savePupils() {
      if (alunos.length > 0)
        await AsyncStorage.setItem('@sister:students', JSON.stringify(alunos))
    }
    savePupils()
  }, [alunos])

  const { acess_token } = useAuth()

  async function startClass(firstID: string, secondId: string) {

    const object = {
      class_room_teachers_subject_id: firstID,
      class_room_id: secondId
    }

    api.defaults.headers.authorization = `Bearer ${acess_token}`

    const response = await StartClass(object)
    console.log(response.data)
    if (response.data.Class_room) {
      setClassId(response.data.Class_room.id)
      setAlunos(response.data.Alunos)
      setCurrentClass(response.data.Class_room.disciplina.toString())
      setLastClass(response.data.lastClass)

      await AsyncStorage.setItem('@sister:lastClass', JSON.stringify(response.data.lastClass))
      await AsyncStorage.setItem('@sister:currentClassId', JSON.stringify(response.data.Class_room.id))
      await AsyncStorage.setItem('@sister:currentClass', JSON.stringify(response.data.Class_room.disciplina))

      setToInClass()
      return Promise.resolve(true)
    }
    else {
      return Promise.resolve(false)
    }

  }

  async function finishClass(note: string) {
    setAbstract(note)
    api.defaults.headers.authorization = `Bearer ${acess_token}`

    const data = {
      note: note,
      id: classId
    }

    const response = await FinishClass(data)
    setClassAbstract(response.data)

    return Promise.resolve(true)
  }

  console.log(classAbstract)

  async function deleteData() {
    setInClass(false)
    setClassId('')
    setCurrentClass('')
    await AsyncStorage.removeItem('@sister:currentClassId')
    await AsyncStorage.removeItem('@sister:currentClass')
    await AsyncStorage.removeItem('@sister:pupils')
    await AsyncStorage.removeItem('@sister:students')
  }

  async function scanStudent(data: string) {
    const information = {
      class_id: classId,
      code: data
    }

    api.defaults.headers.authorization = `Bearer ${acess_token}`
    const response = await PresenceRegistrer(information)

    if (response.data.Alunos) {
      setRegistrados(response.data.Alunos)
      response.data.Alunos.forEach((element: string) => {
        setAlunos((prevAlunos) => {
          return prevAlunos.filter((item: any) => item.name != element)
        })

      });

      navigation.goBack()
    }
  }

  function setToInClass() {
    setInClass(!inClass)
  }

  return (
    <ClassContext.Provider value={{ inClass, startClass, finishClass, setToInClass, scanStudent, currentClass, alunos, registrados, abstract, deleteData, lastClass, classAbstract }}>
      {children}
    </ClassContext.Provider>
  )
}

function useClass() {
  const context = useContext(ClassContext)

  return context
}
export {
  ClassProvider,
  useClass
}