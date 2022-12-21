import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { contextData } from '../App';
import TimerCountDown from '../widgets/TimerCountDown'

const TimerElement = ({time,title, active, id, isLarge, timers,editMode, setTimers, data}) => {
    const  [divTime, setDivTime] = useState(time);
    const { setShowSettings, setSettingsType, setToEdit } = useContext(contextData);


    useEffect(()=>{
        // setDivTime(time)
    }, [divTime])
    
    useEffect(()=>{
        setDivTime(time)
    }, [time])

    const setLarge = () =>{
        !editMode && setTimers(timers.map(e=>{
            if (e.id === id) {
                return{
                    ...e, isLarge: !isLarge
                }
            }else{
                return{
                    ...e, isLarge: false
                }
            }
        }))
    }

    const editTimerDiv = () =>{
        if (editMode) {
            let ssMain = parseFloat(Math.round((time % 60)));
            let msMain = parseFloat(Math.floor(time / 60));
            let hsMain = parseFloat(Math.floor(time / 60 / 60));
            let divId = id;
            let divTitle = title

            const dataSend = {ssMain, hsMain, msMain, divId, divTitle}
            setShowSettings(true)
            setSettingsType(3)
            setToEdit(dataSend);

            console.log({dataSend, data})
        }
    }

    return (
        <div className={`feature ${isLarge ? "large":"normal"} ${editMode && "editMode"}`} onClick={editTimerDiv}>
            <div className="top">
                <span>
                    <h5>{title}</h5>
                </span>
                <img src="icons/arrows-h.svg" alt="" onClick={setLarge}/>
            </div>
            <div className="hold">
                <TimerCountDown divTime = {divTime} title={title} time={time} setTimers={setTimers} timers={timers} id={id} active={active} setDivTime={setDivTime} />
            </div>
        </div>
    )
}

export default TimerElement