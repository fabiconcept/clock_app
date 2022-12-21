import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { contextData } from '../App'
import TimerElement from '../features/timerElement'

const Timer = () => {
  const { timers, setTimers, setShowSettings, setSettingsType, showSetting } = useContext(contextData);

  const [timersArray, setTimersArray] = useState([])

  useEffect(()=>{
    setTimersArray(timers)
  }, [timers])
  
  
  const [editDiv, setEditDiv] = useState(false)
  


  const addTimeSettingHandler = () => {
    setSettingsType(2)
    setShowSettings(true)
  }

  const changeSettingMode = () => {
    setTimers(timers.map(e=>{
      return{
        ...e, editMode: !editDiv
      }
    }))
    setEditDiv(!editDiv)
  }


  return (
    <>
      <div className="timerW">
        {timersArray.map(e => (
          <TimerElement data={e} time={e.time} title={e.title} active={e.active} isLarge={e.isLarge} editMode={e.editMode} timers={timers} setTimers={setTimers} key={e.id} id={e.id} />
        ))}
      </div>
      <div className="hanger">
        <div onClick={changeSettingMode}>
          {!editDiv && <img src="icons/pencil.svg" alt="" />}
          {editDiv && <img src="icons/check.svg" alt="" />}
          <div className='hover'>Edit timers <div className="in"></div></div>
        </div>
        <div className={` ${editDiv && "editMode"}`} onClick={addTimeSettingHandler}>
          <img src="icons/plus.svg" alt="" />
          <div className={`hover`}>Add timer<div className="in"></div></div>
        </div>
      </div>
    </>
  )
}

export default Timer