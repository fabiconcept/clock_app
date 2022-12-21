import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import FocusTime from '../widgets/focusTime';
import BreakTime from '../widgets/breakTime';
import FocusCountDown from '../widgets/focusCountDown';

const SetFocus = () => {
    const [focusData, setFocusdata] = useState({
        time: 0,
        breaks: 0,
        skipBreaks: false,
        isFocus: false
    });

    const [canPlaySound, setCanPlaySound] = useState(true)
    const [elp, setElp] = useState(false);

    const [originalBreak, setOriginalBreak] = useState(0);
    const [divTime, setDivTime] = useState(0);
    const [divEnded, setDivEnded] = useState(false);
    const [divStop, setDivStop] = useState(false);
    const [isBreakTime, setIsBreakTime] = useState(false);
    const [isBreakTimeEnd, setIsBreakTimeEnd] = useState(true);

    const calculateBreaks = () =>{
        const totalTime = focusData.time/60;
        let breakPoints = focusData.skipBreaks ? 0 : originalBreak;
        let counterTime;

        if (breakPoints === 1) {
            counterTime = (((totalTime)-(5*breakPoints))/2);
        }else if (breakPoints ===2){
            counterTime = ((totalTime)-(5*breakPoints))/3;
        }else if (breakPoints ===3){
            counterTime = ((totalTime)-(5*breakPoints))/4;
        }else if (breakPoints ===4){
            counterTime = ((totalTime)-(5*breakPoints))/5;
        }else if (breakPoints ===5){
            counterTime = ((totalTime)-(5*breakPoints))/6;
        }else if (breakPoints ===6){
            counterTime = ((totalTime)-(5*breakPoints))/7;
        }else if (breakPoints ===7){
            counterTime = ((totalTime)-(5*breakPoints))/8;
        }else if (breakPoints ===8){
            counterTime = ((totalTime)-(5*breakPoints))/9;
        }else{
            counterTime = totalTime
        }
            
        setDivTime(counterTime*60);
    }
    

    const reStart = () =>{
        let breakElement = focusData.breaks;

        if (breakElement > 0) {
            breakElement--;
            setFocusdata({
                isFocus: true,
                breaks: breakElement,
                skipBreaks: focusData.skipBreaks,
                time: focusData.time
            })
        }else{
            setDivStop(true)
        }
        setDivEnded(false)
        calculateBreaks()
    }

    
    useEffect(()=>{
        setTimeout(() => {
            if (divEnded && !divStop && !focusData.skipBreaks) {
                setFocusdata({
                    isFocus: false,
                    breaks: focusData.breaks,
                    skipBreaks: focusData.skipBreaks,
                    time: focusData.time
                })
                if (focusData.breaks > 0) {
                    setIsBreakTime(true)
                }
            }else if (divEnded && divStop){
                setFocusdata({
                    isFocus: false,
                    breaks: focusData.breaks,
                    skipBreaks: focusData.skipBreaks,
                    time: focusData.time
                })
            }
        }, 100);
    }, [divEnded])

    useEffect(()=>{
        if (isBreakTimeEnd === false) {
            setIsBreakTime(false)
            setIsBreakTimeEnd(true)
            reStart()
        }
    }, [isBreakTimeEnd])
    
    useEffect(()=>{
        calculateBreaks()
        if (focusData.isFocus) {
            setDivStop(false)
            setDivEnded(false)
        }
    }, [focusData.isFocus])

    useEffect(()=>{
        setElp(false)
    },[canPlaySound])


    return (
        <div className="feature">
            {isBreakTime && <BreakTime setIsBreakTime={setIsBreakTimeEnd} canPlaySound={canPlaySound} />}
            {focusData.isFocus && divTime > 0 && !divEnded && <FocusCountDown breaks={focusData.skipBreaks ? 0 : focusData.breaks} divEnded={setDivEnded} divStop={setDivStop} setDivTime={setDivTime} divTime = {divTime}/>}
            <div className="top">
                <span>
                    {focusData.isFocus && <h5>Focus Session {originalBreak>0 && !focusData.skipBreaks && `${originalBreak-focusData.breaks} - ${originalBreak}`}</h5>}
                    {isBreakTime && <h5>Breaktime</h5>}
                </span>
                <div className={`elp ${elp && "open"}`}>
                    <img src="icons/ellipsis-h.svg" alt="" onClick={()=>isBreakTime && setElp(!elp)}/>
                    <div className="menu">
                        <span onClick={()=>setCanPlaySound(!canPlaySound)}>
                            {canPlaySound ? "Mute" : "Play"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="txt">
                <h1>Ready, set, focus!</h1>
                <span>Achieve your goals and get more done with focus sessions. Tell us how much time you have, and we'll set up the rest.</span>
            </div>
            <div className="mid">
                <FocusTime setOriginalBreak={setOriginalBreak} setFocusdata ={setFocusdata}/>
            </div>
        </div>
    )
}

export default SetFocus;