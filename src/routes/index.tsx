import React from 'react'
import { useAuth } from '../context/auth'
import { useClass } from '../context/class'
import { useJourney } from '../context/journey'
import { AfterJourney } from './afterJourney.routes'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'
import { ClassRoutes } from './class.routes'


export function Routes() {
  const { logged } = useAuth()
  const { inClass } = useClass()
  const { afterJourney } = useJourney()

  if (inClass && logged)
    return <ClassRoutes />

  if (afterJourney)
    return <AfterJourney />
  if (logged)
    return <AppRoutes />
  else
    return <AuthRoutes />
}