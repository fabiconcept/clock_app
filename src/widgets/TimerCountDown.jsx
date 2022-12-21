import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { contextData } from '../App';

const TimerCountDown = ({setDivTime, time, divTime, editMode,title, active, id, timers, setTimers}) => {

    const {notifications, setNotifications} = useContext(contextData)

    const [countTime, setCountTime] = useState(divTime)
    const [svgOff, setSvgOff] = useState(0);
    const [pause, setPause] = useState(true);
    const [canCount, setCanCount] = useState(true);

    const handleEnd = () =>{
        setPause(true);
        setDivTime(0)

        setTimers(timers.map(e=>{
            if(e.id === id){
                return{
                    ...e, active: false
                }
            }
            return e
        }))
        setCanCount(true)
    } 
    
    const handleReset = () =>{
        setPause(true)
        setCountTime(0)
        handleEnd()
        setTimeout(() => {
            setDivTime(time)
            setTimers(timers.map(e=>{
                if(e.id === id){
                    return{
                        ...e, active: true
                    }
                }
                return e
            }))
        }, 100);
    }

    const handleSvg = () =>{
        let complete = 535;
        let fNum = divTime;
        let wNum = countTime;
        let percent = (100/fNum) * wNum;

        let setNum = (percent*complete)/100;

        setSvgOff(complete - setNum)
    }
    
    setTimeout(() => {
        if (!pause) {
            setCanCount(false)
            if (countTime > 0) {
                setCountTime(countTime - 1) 
            } else {
                handleEnd()
                let canAddAlert = true;
                let txtTime = `${Math.floor((divTime/60)/60) > 0 ? Math.floor((divTime/60)/60): `00`}:${Math.floor(divTime/60) > 9 ? (Math.floor((divTime/60)) > 59 ? `${Math.floor((divTime/60))%60 > 9 ? Math.floor((divTime/60)%60) : `0${Math.floor((divTime/60)%60)}`}` : `${Math.floor((divTime/60)) <= 9 ? `0${Math.floor((divTime/60))}`: Math.floor((divTime/60))}`): `0${Math.floor(divTime/60)}`}:${Math.floor(divTime%60) > 9 ? Math.floor(divTime%60) : `0${Math.floor(divTime%60)}`}`
                notifications.forEach(element => {
                    if (element.id === id) {
                        canAddAlert = false;
                    }
                });
                if (canAddAlert) {
                    setNotifications([...notifications, { type: 1, title: `${title} Ended`, subtext: txtTime, id: id}])
                }
            }
        }
    }, 1000);

    useEffect(()=>{
        handleSvg()
    }, [countTime, divTime])
    
    useEffect(()=>{
        setCountTime(divTime);
    }, [divTime, time])
    
    useEffect(()=>{
        // setCountTime(divTime)
        if (editMode) {
            setPause(true)
        }
    }, [editMode])
    
    

    return (
        <section className='focusMode'>
            <div className={`clock-circle ${!active && "disable"}`}>
                <div className="cirlce">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="185px" height="185px">
                        <defs>
                            <linearGradient id="GradientColor">
                                <stop offset="0%" stopColor="#e91e63" />
                                <stop offset="100%" stopColor="#673ab7" />
                            </linearGradient>
                        </defs>
                        <circle cx="92.5" cy="92.5" r="84.5" strokeLinecap="round" style={{strokeDashoffset: `${svgOff}`}} />
                    </svg>
                </div>
                <div className="time">
                {countTime > 0 && `
                        ${Math.floor((countTime/60)/60) > 0 ? 
                            `${Math.floor((countTime/60)/60) > 0 ? 
                                Math.floor((countTime/60)/60): `00`}:` 
                            : ""}
                        ${Math.floor(countTime/60) > 0 ? `${Math.floor(countTime/60) > 9 ?
                        (Math.floor((countTime/60)) > 59 ? 
                            `${Math.floor((countTime/60))%60 > 9 ? Math.floor((countTime/60)%60) 
                        : `0${Math.floor((countTime/60)%60)}`}` 
                    :`${Math.floor((countTime/60)) <= 9 ? 
                        `0${Math.floor((countTime/60))}`: Math.floor((countTime/60))}`): 
                        `0${Math.floor(countTime/60)}`}:`:""}${Math.floor(countTime%60) > 9 ? 
                            Math.floor(countTime%60) : 
                            `0${Math.floor(countTime%60)}`}${countTime<60 ? "s": ""}
                    `}
                    {countTime === 0 && `${Math.floor((divTime/60)/60) > 0 ? Math.floor((divTime/60)/60): `00`}:${Math.floor(divTime/60) > 9 ? (Math.floor((divTime/60)) > 59 ? `${Math.floor((divTime/60))%60 > 9 ? Math.floor((divTime/60)%60) : `0${Math.floor((divTime/60)%60)}`}` : `${Math.floor((divTime/60)) <= 9 ? `0${Math.floor((divTime/60))}`: Math.floor((divTime/60))}`): `0${Math.floor(divTime/60)}`}:${Math.floor(divTime%60) > 9 ? Math.floor(divTime%60) : `0${Math.floor(divTime%60)}`}`}
                </div>
            </div>
            <div className="flex">
                <div className={`stop ${countTime === 0 && "disable non"}`} onClick={()=>setPause(!pause)}>
                    {pause && <img src="icons/play.svg" alt="" />}
                    {!pause && <img src="icons/pause.svg" alt="" />}
                </div>
                <div className={`stop ${!canCount && "disable non"} ${countTime > 0 && "disable non"}`} onClick={handleReset}>
                    <img src="icons/undo.svg" alt="" />
                </div>

            </div>
        </section>
    )
}

export default TimerCountDown