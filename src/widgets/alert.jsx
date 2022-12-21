import React from 'react';
import { useState } from 'react';

const Alert = ({e, notifications, setNotifications}) => {

    const [type, setType] = useState(e.type)
    const closeHandler = ()=>{
        setNotifications(notifications.filter(element=> element.id !== e.id));
    }

    setTimeout(() => {
        closeHandler()
    }, type === 2 ? 60000: 10000);

    return (
        <div className={`alert ${type===2 && "ring"}`}>
            <div className="img">
                {type === 3 && <img src="icons/stopwatch.svg" alt="" />}
                {type === 2 && <img src="icons/alarm-clock.svg" alt="" />}
                {type === 1 && <img src="icons/hourglass.svg" alt="" />}
                {type === 0 && <img src="icons/scarecrow.svg" alt="" />}
            </div>
            <div className="txt">
                <div className="title">{e.title}</div>
                {type === 0 && !e.subtext && <audio src="sound/alarm02.mp3" autoPlay={true}></audio>}
                {type === 1 && <audio src="sound/alarm03.mp3" autoPlay={true}></audio>}
                {type === 2 && <audio src="sound/alarm01.mp3" loop={true} autoPlay={true}></audio>}
                {type === 3 && <audio src="sound/alarm02.mp3" autoPlay={true}></audio>}
                {e.subtext && <div className="time">{e.subtext}</div>}
            </div>
            <div className="close" onClick={closeHandler}>
                <img src="icons/times.svg" alt="" />
            </div>
        </div>
    )
}

export default Alert;