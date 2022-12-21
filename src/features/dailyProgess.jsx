import React from 'react';
import { useContext } from 'react';
import { contextData } from '../App';

const DailyProgess = () => {
    const {showSetting, setShowSettings, setSettingsType} = useContext(contextData)

    const toggleSetting = ()=>{
        setShowSettings(!showSetting)
        setSettingsType(1);
    }
    return (
        <div className="feature">
            <div className="top">
                <span>
                    <h5>Daily Progress</h5>
                </span>
                <img src="icons/pencil.svg" style={{ height: '1.2rem' }} alt="" onClick={toggleSetting}/>
            </div>
            <div className="mid-section">
                <section className='yesterday'>
                    <span>Yesterday</span>
                    <h2>9</h2>
                    <span>minutes</span>
                </section>
                <section className='goal'>
                    <div className="clock-circle">
                        <div className="cirlce">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="185px" height="185px">
                                <defs>
                                    <linearGradient id="GradientColor">
                                        <stop offset="0%" stopColor="#e91e63" />
                                        <stop offset="100%" stopColor="#673ab7" />
                                    </linearGradient>
                                </defs>
                                <circle cx="92.5" cy="92.5" r="84.5" strokeLinecap="round" style={{ strokeDashoffset: `250` }} />
                            </svg>
                        </div>
                    </div>
                    <div className="txt">
                        <span style={{fontSize: "1.05rem"}}>Daily goal</span>
                        <h2>1.5</h2>
                        <span style={{fontSize: "1.05rem"}}>hours</span>
                    </div>
                </section>
                <section className='streak'>
                    <span>Streak</span>
                    <h2>0</h2>
                    <span>days</span>
                </section>
            </div>
            <span className='com'>Completed: 38 minutes</span>
        </div>
    )
}

export default DailyProgess;