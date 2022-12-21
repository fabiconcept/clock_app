import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { contextData } from '../App'

const AddAlarm = () => {
  const { alarmArr, setAlarmArr, setShowSettings, setSettingsType } = useContext(contextData);

  const [repeat, setRepeat] = useState(false);
  const [snoozeTxt, setSnoozeTxt] = useState("");
  const [toneTxt, setToneTxt] = useState("");
  
  const [daysArr, setDaysArr] = useState([])
  const [txt, seTxt] = useState(`Alarm ${alarmArr.length + 1}`)

  const [snoozeMenu, setSnoozeMenu] = useState(false);
  const [toneMenu, setToneMenu] = useState(false);
  const [snoozeVal, setSnoozeVal] = useState(1);
  const [toneVal, setToneVal] = useState(1);

  const [num1, setNum1] = useState(12)
  const [num2, setNum2] = useState(0)
  const [num3, setNum3] = useState(0)

  const [mon, setMon] = useState(false)
  const [tue, setTue] = useState(false)
  const [wed, setWed] = useState(false)
  const [thu, setThu] = useState(false)
  const [fri, setFri] = useState(false)
  const [sat, setSat] = useState(false)
  const [sun, setSun] = useState(false)

  const selectSnooze = (e) => {
    setSnoozeVal(e)
    setSnoozeMenu(false)
  }

  const selectTone = (e) => {
    setToneVal(e)
    setToneMenu(false)
  }

  useEffect(() => {
    switch (snoozeVal) {
      case 0:
        setSnoozeTxt("5 minutes")
        break;
      case 1:
        setSnoozeTxt("10 minutes")
        break;
      case 2:
        setSnoozeTxt("15 minute")
        break;
      case 3:
        setSnoozeTxt("20 minutes")
        break;
      case 4:
        setSnoozeTxt("25 minutes")
        break;
      default:
        setSnoozeTxt("30 Hours")
        break;
    }
  }, [toneVal])

  useEffect(() => {
    switch (toneVal) {
      case 0:
        setToneTxt("Chimes")
        break;
      case 1:
        setToneTxt("Xylophone")
        break;
      case 2:
        setToneTxt("Chords")
        break;
      case 3:
        setToneTxt("Taps")
        break;
      case 4:
        setToneTxt("Jingle")
        break;
      case 5:
        setToneTxt("Transition")
        break;
      case 6:
        setToneTxt("Descending")
        break;
      case 7:
        setToneTxt("Bounce")
        break;
      case 8:
        setToneTxt("Echo")
        break;
    }
  }, [toneVal])

  const switchA = () => {
    if (num3 === 0) {
      setNum3(1)
    } else {
      setNum3(num3 - 1)
    }
  }


  const handleAdd = (e) => {
    switch (e) {
      case 1:
        if (num1 === 12) {
          setNum1(1)
          switchA()
        } else {
          setNum1(num1 + 1)
        }
        break;
      case 2:
        if (num2 === 59) {
          setNum2(0)
        } else {
          setNum2(num2 + 1)
        }


        break;
      case 3:
        if (num3 === 1) {
          setNum3(0)
        } else {
          setNum3(num3 + 1)
        }
        break;
      default:
        if (num1 === 12) {
          setNum1(0)
        } else {
          setNum1(num1 + 1)
        }
        break;
    }

  }
  const handleSub = (e) => {
    switch (e) {
      case 1:
        if (num1 === 1) {
          setNum1(12)
          if (num3 === 0) {
            setNum3(1)
          } else {
            setNum3(num3 - 1)
          }
        } else {
          setNum1(num1 - 1)
        }
        break;
      case 2:
        if (num2 === 0) {
          setNum2(59)
        } else {
          setNum2(num2 - 1)
        }

        break;
      case 3:
        if (num3 === 0) {
          setNum3(1)
        } else {
          setNum3(num3 - 1)
        }
        break;
      default:
        if (num1 === 0) {
          setNum1(12)
        } else {
          setNum1(num1 - 1)
        }
        break;
    }
  }

  const cancelHandler = () => {
    setSettingsType(0)
    setShowSettings(false)
  }

  const daysArrHandler = (day, val) => {
    if (day) {
      if (daysArr.findIndex(e => e === val) < 0) {
        setDaysArr([...daysArr, val])
      }
    } else {
      setDaysArr(daysArr.filter(e => e !== val))
    }

  }

  useEffect(() => {
    daysArrHandler(sun, 1)
  }, [sun])

  useEffect(() => {
    daysArrHandler(mon, 2)
  }, [mon])

  useEffect(() => {
    daysArrHandler(tue, 3)
  }, [tue])

  useEffect(() => {
    daysArrHandler(wed, 4)
  }, [wed])

  useEffect(() => {
    daysArrHandler(thu, 5)
  }, [thu])

  useEffect(() => {
    daysArrHandler(fri, 6)
  }, [fri])

  useEffect(() => {
    daysArrHandler(sat, 7)
  }, [sat])

  const saveHandle = () =>{
    let hr;
    if (num3 === 1) {
      if (num1 < 12) {
        hr = num1 + 12;
      }
    }else{
      if (num1 === 12) {
        hr = 0;
      }else{
        hr = num1
      }
    }

    setAlarmArr([...alarmArr, {title: txt, time: {h: hr, m: num2}, active: true, days: daysArr, id:((Math.random()).toString(36)).slice(2), editMode: false,  tone: toneVal, repeat: repeat, snooze: snoozeVal}])
    cancelHandler()
  }

  return (
    <div className="setting">
      <h3>Add new alarm</h3>

      <div className="formData huge">
        <div className="rowBt r1">
          <div className="bts" onMouseDown={() => handleAdd(1)}><img src="icons/angle-up.svg" alt="" /></div>
          <div className="bts" onMouseDown={() => handleAdd(2)}><img src="icons/angle-up.svg" alt="" /></div>
          <div className="bts" onMouseDown={() => handleAdd(3)}><img src="icons/angle-up.svg" alt="" /></div>
        </div>
        <div className="rowBt r2">
          <span>{num1 > 9 ? num1 : `0${num1}`}</span>
          <>:</>
          <span>{num2 > 9 ? num2 : `0${num2}`}</span>
          <>:</>
          <span>{num3 === 0 ? "AM" : `PM`}</span>
        </div>
        <div className="rowBt r3">
          <div className="bts" onMouseDown={() => handleSub(1)}><img src="icons/angle-down.svg" alt="" /></div>
          <div className="bts" onMouseDown={() => handleSub(2)}><img src="icons/angle-down.svg" alt="" /></div>
          <div className="bts" onMouseDown={() => handleSub(3)}><img src="icons/angle-down.svg" alt="" /></div>
        </div>
      </div>

      <div className="formData">
        <div className="txtField">
          <div className="img"><img src="icons/edit.svg" alt="" /></div>
          <input type="text" placeholder='Title' value={txt} onChange={e => seTxt(e.target.value)} />
        </div>
      </div>

      <div className="flex m-3 mt-0" onClick={() => setRepeat(!repeat)}>
        <input type="checkbox" checked={repeat} />
        <span className=''>Repeat alarm</span>
      </div>

      <div className="arrayDays">
        <li onClick={() => setSun(!sun)} className={`${sun && "active"}`}>su</li>
        <li onClick={() => setMon(!mon)} className={`${mon && "active"}`}>mo</li>
        <li onClick={() => setTue(!tue)} className={`${tue && "active"}`}>tu</li>
        <li onClick={() => setWed(!wed)} className={`${wed && "active"}`}>we</li>
        <li onClick={() => setThu(!thu)} className={`${thu && "active"}`}>th</li>
        <li onClick={() => setFri(!fri)} className={`${fri && "active"}`}>fr</li>
        <li onClick={() => setSat(!sat)} className={`${sat && "active"}`}>sa</li>
      </div>

      <div className="formData">
        <div className="txtField">
          <div className="img"><img src="icons/music-alt.svg" alt="" /></div>
          <div className="formData">
            <div className="goalTime">
              <span style={{ justifyContent: 'left' }} onClick={() => setToneMenu(!toneMenu)}>{toneTxt}</span>
              <img src="icons/angle-down.svg" alt="" onClick={() => setToneMenu(!toneMenu)} />
              <div className={`selectList sp ${toneMenu && "open"}`} onMouseLeave={() => setToneMenu(false)}>
                <li className={`${toneVal === 0 && "selected"}`}> <section className="con"><m><img src="icons/play.svg" alt="" /></m> <t onClick={() => selectTone(0)}>Chimes</t></section> <div></div></li>
                <li className={`${toneVal === 1 && "selected"}`}> <section className="con"><m><img src="icons/play.svg" alt="" /></m> <t onClick={() => selectTone(1)}>Xylophone</t></section> <div></div></li>
                <li className={`${toneVal === 2 && "selected"}`}> <section className="con"><m><img src="icons/play.svg" alt="" /></m> <t onClick={() => selectTone(2)}>Chords</t></section> <div></div></li>
                <li className={`${toneVal === 3 && "selected"}`}> <section className="con"><m><img src="icons/play.svg" alt="" /></m> <t onClick={() => selectTone(3)}>Taps</t></section> <div></div></li>
                <li className={`${toneVal === 4 && "selected"}`}> <section className="con"><m><img src="icons/play.svg" alt="" /></m> <t onClick={() => selectTone(4)}>Jingle</t></section> <div></div></li>
                <li className={`${toneVal === 5 && "selected"}`}> <section className="con"><m><img src="icons/play.svg" alt="" /></m> <t onClick={() => selectTone(5)}>Transition</t></section> <div></div></li>
                <li className={`${toneVal === 6 && "selected"}`}> <section className="con"><m><img src="icons/play.svg" alt="" /></m> <t onClick={() => selectTone(6)}>Descending</t></section> <div></div></li>
                <li className={`${toneVal === 7 && "selected"}`}> <section className="con"><m><img src="icons/play.svg" alt="" /></m> <t onClick={() => selectTone(7)}>Bounce</t></section> <div></div></li>
                <li className={`${toneVal === 8 && "selected"}`}> <section className="con"><m><img src="icons/play.svg" alt="" /></m> <t onClick={() => selectTone(8)}>Echo</t></section> <div></div></li>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="formData">
        <div className="txtField">
          <div className="img"><img src="icons/snooze.svg" alt="" /></div>
          <div className="formData">
            <div className="goalTime">
              <span style={{ justifyContent: 'left' }} onClick={() => setSnoozeMenu(!snoozeMenu)}>{snoozeTxt}</span>
              <img src="icons/angle-down.svg" alt="" onClick={() => setSnoozeMenu(!snoozeMenu)} />
              <div className={`selectList ${snoozeMenu && "open"}`} onMouseLeave={() => setSnoozeMenu(false)}>
                <li className={`${snoozeVal === 0 && "selected"}`} onClick={() => selectSnooze(0)}>5 minutes <div></div></li>
                <li className={`${snoozeVal === 1 && "selected"}`} onClick={() => selectSnooze(1)}>10 minutes<div></div></li>
                <li className={`${snoozeVal === 2 && "selected"}`} onClick={() => selectSnooze(2)}>15 minutes <div></div></li>
                <li className={`${snoozeVal === 3 && "selected"}`} onClick={() => selectSnooze(3)}>20 minutes <div></div></li>
                <li className={`${snoozeVal === 4 && "selected"}`} onClick={() => selectSnooze(4)}>25 minutes <div></div></li>
                <li className={`${snoozeVal === 5 && "selected"}`} onClick={() => selectSnooze(5)}>30 minutes <div></div></li>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="button-area">
        <div className="button save" onClick={saveHandle}>
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

export default AddAlarm;