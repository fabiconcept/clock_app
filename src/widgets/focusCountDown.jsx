import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { contextData } from '../App';

const FocusCountDown = ({breaks, setDivTime, divStop, divEnded,divTime}) => {

    const {notifications, setNotifications} = useContext(contextData)
    
    const time = divTime;

    const [countTime, setCountTime] = useState(time)
    const [svgOff, setSvgOff] = useState(0);

    const handleStop = () =>{
        divEnded(true);
        divStop(true);
        setDivTime(0)
    }
    const handleEnd = () =>{
        divEnded(true);
        setDivTime(0)
        setNotifications([...notifications, { type: 0, title: "Session Ended", subtext: breaks > 0 ? "5 minutes break": "", id: Math.random().toString(36).slice(1)},])
    }

    const handleSvg = () =>{
        let complete = 535;
        let fNum = time;
        let wNum = countTime;
        let percent = (100/fNum) * wNum;

        let setNum = (percent*complete)/100;

        setSvgOff(complete - setNum)  
    }
    
    setTimeout(() => {
        if (countTime > 0) {
            setCountTime(countTime - 1)
        }else{
            handleEnd()
        }
    }, 1000);

    useEffect(()=>{
        handleSvg()
    }, [countTime, divEnded, divTime])
    

    return (
        <section className='focusMode'>
            <div className="clock-circle">
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
                    {`${Math.floor(countTime/60)}:${Math.floor(countTime%60) > 9 ? Math.floor(countTime%60) : `0${Math.floor(countTime%60)}`}`}
                </div>
            </div>
            <div className="stop" onClick={handleStop}>
                <img src="icons/stop.svg" alt="" />
            </div>
            {breaks > 0 && <div className="breakText">Next: <span>5 mins break</span></div>}
        </section>
    )
}

export default FocusCountDown