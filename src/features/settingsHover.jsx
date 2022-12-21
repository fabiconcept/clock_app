import React, { useContext } from 'react';
import { contextData } from '../App';
import AddAlarm from '../widgets/addAlarm';
import AddTime from '../widgets/addTime';
import EditAlarm from '../widgets/EditAlarm';
import EditGoal from '../widgets/editGoal';
import EditTime from '../widgets/editTime';


const SettingsHover = () => {
  const { showSetting, setShowSettings, settingType } = useContext(contextData)

  const toggleSetting = () => {
    setShowSettings(!showSetting)
  }

  return (
    <div className="SettingsHover">
      <div className="whiteCover" onClick={toggleSetting}>
      </div>
      <div className="main">
        {settingType === 1 && <EditGoal/>}
      </div>
      <div className="main">
        {settingType === 2 && <AddTime/>}
      </div>
      <div className="main">
        {settingType === 3 && <EditTime/>}
      </div>
      <div className="main">
        {settingType === 4 && <AddAlarm/>}
      </div>
      <div className="main">
        {settingType === 5 && <EditAlarm/>}
      </div>
    </div>
  )
}

export default SettingsHover;