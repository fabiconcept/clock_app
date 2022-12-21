import React, { useContext, useEffect, useState } from 'react'
import { contextData } from '../App';
import AlarmClock from '../widgets/alarm'

const Alarm = () => {
    const {setShowSettings, setSettingsType, nav, alarmArr, setAlarmArr, setToEdit} = useContext(contextData);

    const [editDiv, setEditDiv] = useState(false)
    const [alarms, setAlarms] = useState(alarmArr)

    const openSetings = () =>{
        setShowSettings(true)
        setSettingsType(4)
    }

    const setEditMode = () =>{
        setEditDiv(!editDiv)
        setAlarmArr(alarmArr.map(e=>{
            return{
                ...e, editMode: !editDiv
            }
        }))
    }

    useEffect(()=>{
        setAlarms(alarmArr)
    }, [alarmArr])

    return (
        <div className="timerW">
            {alarms.map(e=>{
                if (!e.end) {
                    return <AlarmClock setAlarmArr={setAlarmArr} alarmArr={alarmArr} nav={nav} setShowSettings={setShowSettings} setToEdit={setToEdit} setSettingsType={setSettingsType} data={e} key={e.id}/>
                }
            })}
            <div className="hanger">
                <div onClick={setEditMode}>
                    {!editDiv && <img src="icons/pencil.svg" alt="" />}
                    {editDiv && <img src="icons/check.svg" alt="" />}
                    <div className='hover'>Edit timers <div className="in"></div></div>
                </div>
                <div className={` ${editDiv && "editMode"}`} onClick = {openSetings} >
                    <img src="icons/plus.svg" alt="" />
                    <div className={`hover`}>Add timer<div className="in"></div></div>
                </div>
            </div>
        </div>
    )
}

export default Alarm