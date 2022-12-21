import React, { useEffect, useState } from 'react';

const BreakTime = ({setIsBreakTime, canPlaySound}) => {
    const [countTime, setCountTime] = useState(300)

    setTimeout(() => {
        if (countTime > 0) {
            setCountTime(countTime-1);
        }
    }, 1000);

    useEffect(() => {
        if (countTime === 0) {
            setIsBreakTime(false)
        }
    }, [countTime])
    

    return (
        <div className="BreakTime">
            <span>Take a break <br /> Go do Something Fun</span>
            <audio src="sound/s3.mp3" autoPlay={true} loop={true} muted={!canPlaySound}></audio>
            <div className="timeLeft">
                <span>{`${Math.floor(countTime / 60)}:${Math.floor(countTime % 60) > 9 ? Math.floor(countTime % 60) : `0${Math.floor(countTime % 60)}`}`}</span>
            </div>
        </div>
    )
}

export default BreakTime;