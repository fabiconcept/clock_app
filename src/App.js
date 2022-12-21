import React from 'react';
import { useState } from 'react';
import Board from './components/board';
import NavigationArea from './components/Navigation-area';
import Notifications from './components/Notifications';
import SettingsHover from './features/settingsHover';

export const contextData = React.createContext();

const App = () => {
  const [showSetting, setShowSettings] = useState(false);
  const [settingType, setSettingsType] = useState(0);
  const [toEdit, setToEdit] = useState({})
  const [nav, setNav] = useState(0);
  const [timers, setTimers] = useState([
    { time: 300, isLarge: false, active: true, id: ((Math.random()).toString(36)).slice(2), editMode: false, title: "Timer" },
  ])
  const [notifications, setNotifications] = useState([])

  const [alarmArr, setAlarmArr] = useState([
    { title: "Default", time: { h: 12, m: 30 }, active: true, days: [1, 2, 3, 4, 5, 6, 7], id: ((Math.random()).toString(36)).slice(2), editMode: false, tone: 3, repeat: true, snooze: 1, end: false },

  ])

  return (
    <contextData.Provider value={{ notifications, setNotifications, nav, setNav, showSetting, alarmArr, setAlarmArr, setShowSettings, settingType, toEdit, setToEdit, timers, setTimers, setSettingsType }}>
      <div className="app">
        <NavigationArea />
        <Board />
        {showSetting && <SettingsHover />}
        <Notifications />
      </div>
    </contextData.Provider>
  )
}

export default App