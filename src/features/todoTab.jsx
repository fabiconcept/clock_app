import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { contextData } from '../App'
import Todos from '../widgets/todos'

const TodoTab = () => {
    const [todos, setTodos] = useState([])
    const [elp, setElp] = useState(false);

    const audioFile = useRef()

    const addTodosHandler = () =>{
        let choice = true;
        todos.forEach(element => {
            if (element.text.length === 0) {
                choice = false
            }
        });
        if (choice && todos.length < 5) {
            setTodos([...todos, {text: "", complete: false, edit: true, id: Date.now()}])
        }
        setElp(false)
    }

    useEffect(()=>{
        let canPlay = true;
        if (todos.length > 0) {
            todos.forEach(element => {
                if (!element.complete) {
                    canPlay = false;
                }
            });

            if (canPlay) {
                audioFile.current.play();
            }else{
                audioFile.current.pause();
                audioFile.current.currentTime = 0;
            }
        }else{
            audioFile.current.pause()
        }
    }, [todos])

    return (
        <div className="feature">
            <div className="top">
                <span>
                    <img src="icons/check.svg" alt="" />
                    <h5>To Do</h5>
                </span>
                <div className={`elp ${elp && "open"}`}>
                    <img src="icons/ellipsis-h.svg" alt="" onClick={()=>setElp(!elp)}/>
                    <div className="menu">
                        <span onClick={addTodosHandler}>Add To Do item</span>
                    </div>
                </div>
            </div>
            {<audio ref={audioFile} src="sound/s1.mp3"></audio>}
            {todos.length === 0 && <div className="msg">
                You have nothing on your Todo
            </div>}

            {todos.length > 0 && <Todos
                todos={todos}
                setTodos={setTodos}
            />}

        </div>
    )
}

export default TodoTab