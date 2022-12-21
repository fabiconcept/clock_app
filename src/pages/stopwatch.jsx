import React from 'react';
import { useState } from 'react';
import StopDash from '../features/stopDash';
import StopTable from '../features/stopTable';

const Stopwatch = () => {
    const [value, setValue] =useState(0)
    return (
        <div className="stopwatch">
            <StopDash setValue={setValue} value={value}/>
            <StopTable />
        </div>
    )
}

export default Stopwatch;