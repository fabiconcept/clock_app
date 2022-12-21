import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { contextData } from '../App';

const NavigationArea = () => {
    const [activeNav, setActiveNav] = useState(0);
    const [colapsed, setColapsed] = useState(false);
    const {setNav} = useContext(contextData)

    useEffect(()=>{
       setNav(activeNav) 
    }, [activeNav]);

    useEffect(()=>{
        setColapsed(true)
    }, [activeNav]);

    return (
        <div className="case">
            <div className="hamburger" onClick={() => setColapsed(!colapsed)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`navArea ${colapsed && "colapsed"}`}>
                <div className="navs">
                    <section>
                        <div className={`item ${activeNav === 0 && "active"}`} onClick={() => setActiveNav(0)}>
                            <img src="icons/scarecrow.svg" alt="" />
                            <span>Focus Session</span>
                        </div>
                        <div className={`item ${activeNav === 1 && "active"}`} onClick={() => setActiveNav(1)}>
                            <img src="icons/hourglass.svg" alt="" />
                            <span>Timer</span>
                        </div>
                        <div className={`item ${activeNav === 2 && "active"}`} onClick={() => setActiveNav(2)}>
                            <img src="icons/alarm-clock.svg" alt="" />
                            <span>Alarm</span>
                        </div>
                        {/* <div className={`item ${activeNav === 3 && "active"}`} onClick={() => setActiveNav(3)}>
                            <img src="icons/stopwatch.svg" alt="" />
                            <span>Stopwatch</span>
                        </div> */}
                    </section>
                    <section>
                        <div className={`item ${activeNav === 5 && "active"}`}>
                            <img src="icons/user.svg" alt="" />
                            <span>Sign in</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default NavigationArea