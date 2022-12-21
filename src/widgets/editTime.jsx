import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { contextData } from '../App'

const EditTime = () => {
  const { timers,setTimers, setShowSettings, setSettingsType,toEdit, setToEdit } = useContext(contextData);

  let ssMain =toEdit.ssMain;
  let msMain =toEdit.msMain;
  let hsMain = toEdit.hsMain;
  let titleMain = toEdit.divTitle;
  let idMain = toEdit.divId;

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [editNum, setEditNum] = useState(0);
  const [txt, seTxt] = useState(``);
  const [del, setDel] = useState(false)

  useEffect(()=>{
    setNum1(hsMain);
    setNum2(msMain);
    setNum3(ssMain);
    seTxt(titleMain);
  }, [])
  
  useEffect(()=>{
    if(num1> 23){
      setNum2(0)
      setNum3(0)
    }
  }, [num1, num2, num3])

  const cancelHandler = () =>{
    setShowSettings(false)
    setSettingsType(0);
  }

  const handleAdd = (e) =>{
    switch(e){
      case 1:
        if (num1 >= 24) {
          setNum1(0)
        }else{
          setNum1(num1 + 1)
        }
        setEditNum(1)
        break;
      case 2:
        if (num2 >= 59) {
          setNum2(0)
        }else{
          setNum2(num2 + 1)
        }
        setEditNum(2)
        break;
      case 3:
        if (num3 >= 59) {
          setNum3(0)
        }else{
          setNum3(num3 + 1)
        }
        setEditNum(3)
        break;
      default:
        if (num1 >= 24) {
          setNum1(0)
        }else{
          setNum1(num1 + 1)
        }
        setEditNum(1)
        break;
    }
    
  }
  const handleSub = (e) =>{
    switch(e){
      case 1:
        if (num1 <= 0) {
          setNum1(24)
        }else{
          setNum1(num1 - 1)
        }
        setEditNum(1)
        break;
      case 2:
        if (num2 <= 0) {
          setNum2(59)
        }else{
          setNum2(num2 - 1)
        }
        setEditNum(2)
        break;
      case 3:
        if (num3 <= 0) {
          setNum3(59)
        }else{
          setNum3(num3 - 1)
        }
        setEditNum(3)
        break;
      default:
        if (num1 <= 0) {
          setNum1(24)
        }else{
          setNum1(num1 - 1)
        }
        setEditNum(1)
        break;
    }
  }

  const handleSubmit = () =>{
    let hs = num1*60*60
    let ms = num2 * 60
    let ss = num3

    const totalTime = hs+ms+ss;
    console.log(totalTime)
    if (totalTime > 0) {
      setTimers(timers.map(e=>{
        if (e.id === idMain) {
          return{
            ...e, time: totalTime, title: txt, active: true
          }
        }
        return e
      }))
  
      cancelHandler()
    }
  }

  const handleDelete = () =>{
    if (timers.length > 1) {
      if (window.confirm("Do you want to delete this Timer Element?")) {
        setTimers(timers.filter(item=> item.id !== idMain));
        cancelHandler()
      }
    }
  }

  useEffect(()=>{
    if (del) {
      handleDelete() 
      setDel(false)
    }
  }, [del])

  return (
    <div className="setting ad">
      <h3>Edit {titleMain}
        <div className="del" onClick={() => setDel(true)}>
          <img src="icons/trash-alt.svg" alt="" />
        </div>
      </h3>

      <div className="formData">
        <div className="rowBt r1">
          <div className="bts" onClick={()=>handleAdd(1)}><img src="icons/angle-up.svg" alt="" /></div>
          <div className="bts" onClick={()=>handleAdd(2)}><img src="icons/angle-up.svg" alt="" /></div>
          <div className="bts" onClick={()=>handleAdd(3)}><img src="icons/angle-up.svg" alt="" /></div>
        </div>
        <div className="rowBt r2">
          <span className={`${editNum ===1 && "active"}`} onClick={()=>setEditNum(1)}>{num1 > 9 ? num1 : `0${num1}`}</span>
          <>:</>
          <span className={`${editNum ===2 && "active"}`} onClick={()=>setEditNum(2)}>{num2 > 9 ? num2 : `0${num2}`}</span>
          <>:</>
          <span className={`${editNum ===3 && "active"}`} onClick={()=>setEditNum(3)}>{num3 > 9 ? num3 : `0${num3}`}</span>
        </div>
        <div className="rowBt r3">
          <div className="bts" onClick={()=>handleSub(1)}><img src="icons/angle-down.svg" alt="" /></div>
          <div className="bts" onClick={()=>handleSub(2)}><img src="icons/angle-down.svg" alt="" /></div>
          <div className="bts" onClick={()=>handleSub(3)}><img src="icons/angle-down.svg" alt="" /></div>
        </div>
      </div>

      <div className="formData">
        <div className="txtField">
          <div className="img"><img src="icons/edit.svg" alt="" /></div>
          <input type="text" placeholder='Title' value={txt} onChange={e=>seTxt(e.target.value)} />
        </div>
      </div>

      <div className="button-area">
        <div className="button save" onClick={handleSubmit}>
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

export default EditTime;