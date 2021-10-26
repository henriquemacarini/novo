import React, { createContext, ReactNode, useState, useEffect, useRef } from 'react'
import Constants from 'expo-constants';
import { useContext } from 'react'
import { SignInFc } from '../services/auth'

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

interface AuthContextData {
  acess_token: string
  signIn: (user: string, password: string) => Promise<boolean | undefined>
  logOut(): void
  getFullDate(date: string): void
  loading: boolean
  logged: boolean
  fullDate: string
}
interface AuthProviderProp {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProp) {

  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<any>(false);

  const notificationListener = useRef();

  const responseListener = useRef();


  useEffect(() => {
    registerForPushNotificationsAsync().then(async token => {
      setExpoPushToken(token)
      await AsyncStorage.setItem('@sister:token', JSON.stringify(token))
    });
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;


    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }


    return token;
  }

  const [acess_token, setAcessToken] = useState('')
  const [loading, setLoading] = useState(false)

  const [fullDate, setFullDate] = useState('')

  function getFullDate(date: string) {
    setFullDate(date)
  }

  async function signIn(user: string, password: string) {
    try {
      setLoading(true)
      const response = await SignInFc(user, password, expoPushToken)
      console.log(response.data)
      if (response.data.access_token !== '') {
        setAcessToken(response.data.access_token.toString())
      }
    } catch {
      return false
    } finally {
      setLoading(false)
    }
  }

  async function logOut() {
    setAcessToken('')
  }

  return (
    <AuthContext.Provider value={{ acess_token, signIn, loading, logged: !!acess_token, logOut, fullDate, getFullDate }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}
export {
  AuthProvider,
  useAuth
}