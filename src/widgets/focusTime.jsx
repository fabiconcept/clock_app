import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const FocusTime = ({setFocusdata, setOriginalBreak}) => {
    const [timer, setTimer] = useState(15);
    const [breaks, setBreaks] = useState(0);
    const [skip, setSkip] = useState(false);

    const handleAddTimer = () =>{
        setTimer(timer+15)
    }
    
    const handleReduceTimer = () =>{
        setTimer(timer-15)
    }

    const handleStartBtn = () =>{
        setFocusdata({
            time: timer*60,
            breaks: breaks,
            skipBreaks: skip,
            isFocus: true
        })
    }

    useEffect(()=>{
        switch (timer) {
            case 15:
                setBreaks(0)
                setOriginalBreak(0)
                break;
            case 30:
                setBreaks(0)
                setOriginalBreak(0)
                break;
            case 45:
                setBreaks(1)
                setOriginalBreak(1)
                break;
            case 60:
                setBreaks(1)
                setOriginalBreak(1)
                break;
            case 75:
                setBreaks(2)
                setOriginalBreak(2)
                break;
            case 90:
                setBreaks(2)
                setOriginalBreak(2)
                break;
            case 105:
                setBreaks(3)
                setOriginalBreak(3)
                break;
            case 120:
                setBreaks(3)
                setOriginalBreak(3)
                break;
            case 135:
                setBreaks(4)
                setOriginalBreak(4)
                break;
            case 150:
                setBreaks(5)
                setOriginalBreak(5)
                break;
            case 165:
                setBreaks(5)
                setOriginalBreak(5)
                break;
            case 180:
                setBreaks(6)
                setOriginalBreak(6)
                break;
            case 195:
                setBreaks(6)
                setOriginalBreak(6)
                break;
            case 210:
                setBreaks(7)
                setOriginalBreak(7)
                break;
            case 225:
                setBreaks(8)
                setOriginalBreak(8)
                break;
            case 240:
                setBreaks(8)
                setOriginalBreak(8)
                break;
        
            default:
                break;
        }
    }, [timer])

    return (
        <section>
            <div className="timer">
                <div className="minutes">
                    <span>{timer}</span>
                    <span>mins</span>
                </div>
                <div className="control">
                    <div className={`up ${timer === 240 && "no"}`} onClick={handleAddTimer}>
                        <img src="icons/angle-up.svg" alt="" />
                    </div>
                    <div className={`down ${timer === 15 && "no"}`} onClick={handleReduceTimer}>
                        <img src="icons/angle-down.svg" alt="" />
                    </div>
                </div>
            </div>

            <p className="msg">You'll have {breaks <= 0 ? "no" : Math.floor(breaks)} {Math.floor(breaks) > 1 ? "breaks" : "break"}</p>
            <div className={`skip ${breaks > 0 ? "": "not"}`}>
                <input type="checkbox" name="" id="" onChange={()=>setSkip(!skip)}/>
                <span>Skip Breaks</span>
            </div>
            <div className="button" onClick={handleStartBtn}>
                <img src="icons/play.svg" alt="" />
                <span>Start focus session</span>
            </div>
        </section>
    )
}

export default FocusTime;