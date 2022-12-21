import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const StopDash = ({setValue, value}) => {
    let timeVal = 0;
    const [millsec, setMillSec] = useState(0);
    const [sec, setSec] = useState(0);
    const [pause, setPause] = useState(false);
    const clickToCount = useRef()

    const  countHandler = () =>{
        setMillSec(millsec + 1)
    }

    setInterval(() => {
        if (pause) {
            setValue(value + 1)
        }
    }, 1000);

    return (
        <section className='top'>
            <div className="face">
                <section>{sec/60/60 > 9 ? Math.floor(sec/60/60) : `0${Math.floor(sec/60/60)}`}</section>
                :
                <section>{sec/60 > 9 ? Math.floor(sec/60)%60 : `0${Math.floor(sec/60)%60}`}</section>
                :
                <section>{sec%60 > 9 ? Math.floor(sec%60) : `0${Math.floor(sec%60)}`}</section>
                <span>.{value}</span>
            </div>

            <div className="clickables">
                <div className="button main" onClick={()=>setPause(!pause)}>
                    {!pause && <img src="icons/play.svg" alt="" />}
                    {pause && <img src="icons/pause.svg" alt="" />}
                </div>
                <div className="button"><img src="icons/flag-alt.svg" alt="" /></div>
                <div className="button"><img src="icons/undo.svg" alt="" /></div>
            </div>
                <span ref={clickToCount} onClick={countHandler}>click me</span>
        </section>
    )
}

export default StopDash;