import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { contextData } from '../App'

const AlarmClock = ({ nav, setToEdit, data, alarmArr, setAlarmArr, setShowSettings, setSettingsType }) => {

    const {setNotifications, notifications} = useContext(contextData)
    const clickThis =  useRef()

    const [switchOn, setSwitchOn] = useState(data.active)
    const [daysArr, setDaysArr] = useState(data?.days)
    const [alarmDateVal, setAlarmDateVal] = useState({
        date: 0,
        getMinutes: 0,
        getHours:0,
        getTime: 0
    })

    const [mon, setMon] = useState(false)
    const [tue, setTue] = useState(false)
    const [wed, setWed] = useState(false)
    const [thu, setThu] = useState(false)
    const [fri, setFri] = useState(false)
    const [sat, setSat] = useState(false)
    const [sun, setSun] = useState(false)

    const [txtHr, setTxtHr] = useState(0)
    const [txtMin, setTxtMin] = useState(0)
    const [txtDays, setTxtDays] = useState(0)

    const initDays = () => {
        let arr = data.days

        arr.forEach(element => {

            switch (element) {
                case 1:
                    setSun(true);
                    break;
                case 2:
                    setMon(true);
                    break;
                case 3:
                    setTue(true)
                    break;
                case 4:
                    setWed(true);
                    break;
                case 5:
                    setThu(true);
                    break;
                case 6:
                    setFri(true);
                    break;
                case 7:
                    setSat(true);
                    break;
            }
        });
    }

    const editDays = () => {
        let thisId = data.id;

        setAlarmArr(alarmArr.map(e => {
            if (e.id === thisId) {
                return {
                    ...e, days: daysArr
                }
            }
            return e;
        }))
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
        initDays()
    }, [])

    useEffect(() => {
        editDays()
    }, [daysArr])

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

    const triggerEdit = () => {
        let dataToSend = {
            h: data.time.h,
            m: data.time.m,
            title: data.title,
            days: daysArr,
            tone: data.tone,
            snooze: data.snooze,
            repeat: data.repeat,
            id: data.id
        }
        if (data.editMode) {
            setShowSettings(true)
            setSettingsType(5)
            setToEdit(dataToSend)
        }
    }

    const consdtructDifference = () => {
        let arr = daysArr
        let diff = 0;
        let diffLeast = [];
        let arrSave = [];
        let today = new Date();
        let alarmDate = new Date();
        let exDay = 0;

        let hr = data.time.h;
        let min = data.time.m;

        arr.forEach(element => {
            let td = today.getDay() + 1
            diff = element - td
            if (diff >= 0) {
                arrSave.push({ diff, element })
            } else {
                diff = diff + 7
                arrSave.push({ diff, element })
            }

        });

        arrSave.forEach(element => {
            diffLeast.push(element.diff)
        });

        let tempArr = diffLeast.sort()

        arrSave?.forEach(element => {
            if (element.diff === tempArr[0]) {
                exDay = (element.diff)
            }
        })

        alarmDate.setDate(today.getDate() + exDay);
        alarmDate.setHours(hr, min, 0)

        setAlarmDateVal({
            date: alarmDate,
            getMinutes: alarmDate.getMinutes(),
            getHours: alarmDate.getHours(),
            getTime: alarmDate.getTime()
        });

    }

    const constructText = () => {
        let alarmDate = alarmDateVal;
        const today = new Date();

        
        let diffL = (alarmDate.getTime - today.getTime())
        let daysDiff = Math.floor(diffL / 24 / 60 / 60 / 1000)
        let minsDiff = (alarmDate.getMinutes - today.getMinutes())
        minsDiff = minsDiff >= 0 ? minsDiff : minsDiff + 60;

        let hrsDiff = (alarmDate.getHours - today.getHours()) >= 0 ? alarmDate.getHours - today.getHours() : (alarmDate.getHours - today.getHours())+23;
        
        setTxtHr(hrsDiff)
        setTxtMin(minsDiff)
        setTxtDays(daysDiff)

        
        if (daysDiff === 0 && minsDiff === 0 && hrsDiff ===0) {
            sendNotification()
            console.log("Yes")
        }

    }

    const sendNotification = ()=>{
        let canAdd = true;
        let timeTxt = `${data.time.h}:${data.time.m} ${data.time.h > 11 ? "PM" : "AM"}`

        if (switchOn) {
            notifications.forEach(element => {
                if(element.id === data.id){
                    canAdd = false
                }
            });
            if (canAdd) {
                setNotifications([...notifications, { type: 2, title: `${data.title}`, subtext: timeTxt, id: data.id}])
            }
        }
    }
    
    useEffect(() => {
        consdtructDifference()
        setDaysArr(data.days);
    }, [data.days])
    
    useEffect(() => {
        consdtructDifference()
        constructText()
    }, [])
    
    useEffect(() => {
        setAlarmArr(alarmArr.map(item=>{
            if (item.id === data.id) {
                return{
                    ...item, active: !switchOn
                }
            }
            return item
        }))
    }, [switchOn])
    
    setInterval(() => {
        nav === 2 && clickThis.current.click()
    }, 1000);






    return (
        <div className={`alarm ${switchOn ? "on" : "off"} ${data.editMode && "editMode"}`}>
            {data.editMode && <div onClick={triggerEdit} className="clickToEdit">Edit Alarm</div>}
            <div className={`switch-thing ${switchOn ? "on" : "off"}`} onClick={() => setSwitchOn(!switchOn)}>
                <div className="ball"></div>
            </div>
            <div className="timeValue">
                <span className='b1'><span>{data.time.h%24}</span>:<span>{data.time.m > 9 ? data.time.m : `0${data.time.m}`}</span></span><span>{data.time.h > 11 ? "PM" : "AM"}</span>
            </div>
            <div className="remain">
                {switchOn ? <img src="icons/bell-on.svg" alt="" /> : <img src="icons/bell-slash.svg" alt="" />}
                {switchOn ? `in ${txtDays > 0 ? `${txtDays} ${txtDays > 1 ? "days" : "day"},` : ''} ${txtDays > 0 || txtHr > 0 ? `${txtHr} ${txtHr > 1 ? "hours," : "hour,"}` : ''} ${txtMin > 0 ? txtMin : (txtMin + 60)%60} ${txtMin > 1 ? "minutes" : "minute"}` : 'Deactivated'}
            </div>
            <div className="title">{data.title} <span className='turn' ref={clickThis} onClick={()=>constructText()}></span></div>
            <div className="days">
                <li onClick={() => switchOn && setSun(!sun)} className={`${sun && "active"}`}> <span>su</span></li>
                <li onClick={() => switchOn && setMon(!mon)} className={`${mon && "active"}`}> <span>mo</span></li>
                <li onClick={() => switchOn && setTue(!tue)} className={`${tue && "active"}`}> <span>tu</span></li>
                <li onClick={() => switchOn && setWed(!wed)} className={`${wed && "active"}`}> <span>we</span></li>
                <li onClick={() => switchOn && setThu(!thu)} className={`${thu && "active"}`}> <span>th</span></li>
                <li onClick={() => switchOn && setFri(!fri)} className={`${fri && "active"}`}> <span>fri</span></li>
                <li onClick={() => switchOn && setSat(!sat)} className={`${sat && "active"}`}> <span>sa</span></li>
            </div>
        </div>
    )
}

export default AlarmClock