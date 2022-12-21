import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Options = ({cdpctData, setCdpctData}) => {

    const minRef = useRef()
    const dummyRef = useRef()
    const hrRef = useRef()
    const [minutes, setMinutes] = useState(cdpctData.m);
    const [hour, setHour] = useState(cdpctData.h);
    const [am, setAm] = useState(cdpctData.a);
    const [minuteDiv, setMinuteDiv] = useState([])
    const [hourDiv, setHourDiv] = useState([])


    const generateValues = () => {
        let hoursDef = []
        let minutesDef = []
        for (let i = 0; i < 60; i++) {
            minutesDef.push(i);
        }

        for (let index = 0; index < 25; index++) {
            hoursDef.push(index);
        }
        setHourDiv(hoursDef);
        setMinuteDiv(minutesDef);
    }

    useEffect(() => {
        generateValues()
    }, [])
    
    setTimeout(() => {
        minRef.current.click()
    }, 10);
    
    setTimeout(() => {
        hrRef.current.click()
    }, 700);

    const submitChoice =  () =>{
        setCdpctData(
            {h: hour, m: minutes, a: am}
        )
    }

    useEffect(() => {
        submitChoice()
    }, [minutes, hour, am])

    return (
        <div className="options">
            <section>
                <div className="ul">
                    <div className="list">
                        {hourDiv.map(item => (
                            <a key={item} href={`#h${item}`} ref={item === hour ? hrRef : dummyRef} onClick={()=>setHour(item)}><li className={`${item === hour && 'selected'}`} id={`h${item}`}>{item > 9 ? item : `0${item}`}</li></a>
                        ))}
                        <div className="empty"></div>
                    </div>
                </div>
            </section>

            <section>
                <div className="ul">
                    <div className="list">
                        {minuteDiv.map(item => (
                            <a key={item} href={`#m${item}`} ref={item === minutes ? minRef : dummyRef} onClick={()=>setMinutes(item)}><li className={`${item === minutes && 'selected'}`} id={`m${item}`}>{item > 9 ? item : `0${item}`}</li></a>
                        ))}
                        <div className="empty"></div>
                    </div>
                </div>
            </section>
            
            <section>
            <div className="ul">
                    <div className="list">
                        <div className="empty50"></div>
                        <li className={`${am === 0 && 'selected'}`} onClick={()=>setAm(0)}>AM</li>
                        <li className={`${am === 1 && 'selected'}`} onClick={()=>setAm(1)}>PM</li>
                        <div className="empty50"></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Options