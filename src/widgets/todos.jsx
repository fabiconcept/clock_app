import React from 'react'
import Todo from './todo'

const Todos = ({ setTodos, todos }) => {
    return (
        <div className="todos">
            {todos.map(item =>(
                <Todo text={item.text} id={item.id} key={item.id} setTodos ={setTodos} todos={todos} complete={item.complete} edit={item.edit} />
            ))}
        </div>
    )
}

export default Todos