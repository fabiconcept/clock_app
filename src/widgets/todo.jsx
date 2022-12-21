import React from 'react'
import { useState } from 'react'

const Todo = ({ text, complete, edit, setTodos, todos, id}) => {
    const [txt, setTxt] = useState('');

    const checkHandler = (e) =>{
        e.preventDefault();
        if (txt.length > 0) {
            setTodos(todos.map(item =>{
                if (item.id === id) {
                    return{
                        ...item, text: txt, edit: !edit
                    }
                }
                return item;
            }))
        }
    }

    const doubleCheckHandler = () =>{
        setTodos(todos.map(item =>{
            if (item.id === id) {
                return{
                    ...item, complete: true
                }
            }
            return item;
        }))
    }

    const editHandler = () =>{
        setTodos(todos.map(item =>{
            if (item.id === id) {
                return{
                    ...item, edit: true
                }
            }
            return item;
        }))
    }

    const deleteHandler = () =>{
        setTodos(todos.filter(item => item.id !== id))
    }

    return (
        <div className={`todo ${!edit && "noEdit"} ${complete && "done"}`}>
            <form onSubmit={checkHandler}>
                <input type="text" value={txt} disabled={!edit && true} onChange={(e)=>setTxt(e.target.value)} placeholder='Enter todo name...' />
            </form>
            <div className="ico">
                {!edit && <img src="icons/trash-alt.svg" alt="" onClick={deleteHandler} />}
                {!edit && <img src="icons/check-double.svg" className='check' alt="" onClick={doubleCheckHandler} />}
                {edit && <img src="icons/check.svg" alt="" onClick={checkHandler} />}
                {!edit && <img src="icons/pencil.svg" className='pen' alt="" onClick={editHandler} />}
            </div>
        </div>
    )
}

export default Todo