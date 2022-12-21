import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { contextData } from '../App';
import Alarm from '../pages/alarm';
import Focus from '../pages/focus';
import Stopwatch from '../pages/stopwatch';
import Timer from '../pages/timer';

const Board = () => {
  const {nav} = useContext(contextData)
  
  return (
    <div className="board">
      <div className={`${nav===0 ? "fopen" : "fclose"}`}>
        <Focus />
      </div>
      <div className={`${nav===1 ? "fopen" : "fclose"}`}>
        <Timer/>
      </div>
      <div className={`${nav===2 ? "fopen" : "fclose"}`}>
        <Alarm/>
      </div>
      <div className={`${nav===3 ? "fopen" : "fclose"}`}>
        <Stopwatch/>
      </div>
    </div>
  )
}

export default Board;