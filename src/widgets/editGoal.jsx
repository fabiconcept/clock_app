import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { contextData } from '../App'
import Options from './options';

const EditGoal = () => {
  const { setShowSettings, setSettingsType } = useContext(contextData);
  const [streaks, setStreaks]  = useState(false);
  const [goalMenu, setGoalMenu] =useState(false);
  const [goalval, setGoalval] = useState(1);
  const [goalTxt, setGoalTxt] = useState("");

  const [cdpctData, setCdpctData] = useState({
    h: 12, m: 30, a:0
  })
  
  const [cdpctDataUse, setCdpctDataUse] = useState({
    h: 12, m: 30, a:0
  })

  const [CDPCT, setCDPCT] = useState(false)

  const cancelHandler = () => {
    setShowSettings(false)
    setSettingsType(0);
  }

  const selectGoal = (e) =>{
    setGoalval(e)
    setGoalMenu(false)
  }

  useEffect(() => {
    switch (goalval) {
      case 0:
        setGoalTxt("30 minutes")
        break;
      case 1:
        setGoalTxt("1 Hour")
        break;
      case 2:
        setGoalTxt("1 Hour, 30 minutes")
        break;
      case 3:
        setGoalTxt("2 Hours")
        break;
      case 4:
        setGoalTxt("2 Hours, 30 minutes")
        break;
      case 5:
        setGoalTxt("3 Hours")
        break;
      case 6:
        setGoalTxt("3 Hours, 30 minutes")
        break;
      case 7:
        setGoalTxt("4 Hours")
        break;
      case 8:
        setGoalTxt("4 Hours, 30 minutes")
        break;
      case 9:
        setGoalTxt("5 Hours")
        break;
      case 10:
        setGoalTxt("5 Hours, 30 minutes")
        break;
      case 11:
        setGoalTxt("6 Hours")
        break;
      case 12:
        setGoalTxt("6 Hours, 30 minutes")
        break;
      case 13:
        setGoalTxt("7 Hours")
        break;
      case 14:
        setGoalTxt("7 Hours, 30 minutes")
        break;
      default:
        setGoalTxt("8 Hours")
        break;
    }
  }, [goalval])

  const closeDiv = () =>{
    setCDPCT(!CDPCT)
  }

  const mainSubmitHandler = ()=>{
    setCdpctDataUse(cdpctData)
    closeDiv()
  }

  useEffect(()=>{
    console.log(CDPCT)
  }, [CDPCT])
  

  return (
    <div className="setting">
      <h3>Edit our daily goal</h3>
      <div className="hang"><img src="icons/trash-alt.svg" alt="" /></div>
      <div className="formData">
        <span>Daily goal</span>
        <div className="goalTime">
          <span style={{ justifyContent: 'left' }} onClick={()=>setGoalMenu(!goalMenu)}>{goalTxt}</span>
          <img src="icons/angle-down.svg" alt="" />
          <div className={`selectList ${goalMenu && "open"}`} onMouseLeave={()=>setGoalMenu(false)}>
            <li className={`${goalval ===0 && "selected" }`} onClick={()=>selectGoal(0)}>30 minutes <div></div></li>
            <li className={`${goalval ===1 && "selected" }`} onClick={()=>selectGoal(1)}>1 Hour <div></div></li>
            <li className={`${goalval ===2 && "selected" }`} onClick={()=>selectGoal(2)}>1 Hour, 30 minutes <div></div></li>
            <li className={`${goalval ===3 && "selected" }`} onClick={()=>selectGoal(3)}>2 Hours <div></div></li>
            <li className={`${goalval ===4 && "selected" }`} onClick={()=>selectGoal(4)}>2 Hour, 30 minutes <div></div></li>
            <li className={`${goalval ===5 && "selected" }`} onClick={()=>selectGoal(5)}>3 Hours <div></div></li>
            <li className={`${goalval ===6 && "selected" }`} onClick={()=>selectGoal(6)}>3 Hour, 30 minutes <div></div></li>
            <li className={`${goalval ===7 && "selected" }`} onClick={()=>selectGoal(7)}>4 Hours <div></div></li>
            <li className={`${goalval ===8 && "selected" }`} onClick={()=>selectGoal(8)}>4 Hour, 30 minutes <div></div></li>
            <li className={`${goalval ===9 && "selected" }`} onClick={()=>selectGoal(9)}>5 Hours <div></div></li>
            <li className={`${goalval ===10 && "selected" }`} onClick={()=>selectGoal(10)}>5 Hour, 30 minutes <div></div></li>
            <li className={`${goalval ===11 && "selected" }`} onClick={()=>selectGoal(11)}>6 Hours <div></div></li>
            <li className={`${goalval ===12 && "selected" }`} onClick={()=>selectGoal(12)}>6 Hour, 30 minutes <div></div></li>
            <li className={`${goalval ===13 && "selected" }`} onClick={()=>selectGoal(13)}>7 Hours <div></div></li>
            <li className={`${goalval ===14 && "selected" }`} onClick={()=>selectGoal(14)}>7 Hour, 30 minutes <div></div></li>
            <li className={`${goalval ===15 && "selected" }`} onClick={()=>selectGoal(15)}>8 Hours <div></div></li>
          </div>
        </div>
      </div>

      <div className="formData">
        <span>Clear daily progress and Completed tasks</span>
        <div className="goalTime">
          <span onClick={()=>setCDPCT(true)}>{cdpctDataUse.h > 9 ? cdpctDataUse.h : `0${cdpctDataUse.h}`}</span>
          <span onClick={()=>setCDPCT(true)}>{cdpctDataUse.m > 9? cdpctDataUse.m : `0${cdpctDataUse.m}`}</span>
          <span onClick={()=>setCDPCT(true)}>{cdpctDataUse.a === 0 ? "AM" : "PM"}</span>
          <div className={`selectList cdpct ${CDPCT && "open"}`}>
            {CDPCT && <Options
              setCdpctData={setCdpctData}
              cdpctData={cdpctData}
            />}
            <div className="bottom">
              <div className="imgBtn" onClick={mainSubmitHandler} ><img src="icons/check.svg" alt="" /></div>
              <div className="imgBtn" onClick={closeDiv}><img src="icons/times.svg" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex" onClick={()=>setStreaks(!streaks)}>
        <input type="checkbox" checked={streaks} />
        <span>Include weekends in streaks</span>
      </div>

      <div className="button-area">
        <div className="button save">
          <img src="icons/save.svg" alt="" />
          <span>Save</span>
        </div>
        <div className="button" onClick={cancelHandler}>
          <img src="icons/times.svg" alt="" />
          <span>Cancel</span>
        </div>
      </div>
    </div>
  )
}

export default EditGoal;