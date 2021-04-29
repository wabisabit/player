import React from 'react'

export const initialValue = {
  notification: '',
  setNotification: (notification: string) => {},
}

export const NotificationContext = React.createContext<typeof initialValue>(
  initialValue
)
