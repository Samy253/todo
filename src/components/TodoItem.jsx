import React, {useState} from "react";
import { useTodo } from "../contexts/TodoContext";
import tick from '../../todo-app-main/images/icon-check.svg'
import cross from '../../todo-app-main/images/icon-cross.svg'
import edit from '../../todo-app-main/images/edit-svgrepo-com.svg'
import save from '../../todo-app-main/images/document-save-16-svgrepo-com.svg'

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const {updateTodo, toggleComplete, deleteTodo} = useTodo()

    const editTodo=()=>{
        updateTodo(todo.id,{...todo,todo: todoMsg})
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        if(isTodoEditable) return;
        toggleComplete( todo.id )
    }

    return (
        
        <div
            className={`group flex items-center px-3 md:px-4 py-2 md:py-4 gap-x-3 md:gap-x-4 bg-white hover:bg-gray-50 dark:bg-[#25273c] dark:hover:bg-[#2e3048] duration-200
                ${todo.completed ? "text-gray-500 dark:text-gray-600": "text-gray-700 dark:text-gray-300"}
                `}
        >
            <div
                onClick={toggleCompleted}
                className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center cursor-pointer shrink-0
                    ${todo.completed 
                        ? "border-purple-400 bg-gradient-to-br from-purple-400 to-blue-400" 
                        : "border-gray-300"}
                `}
            >
                {todo.completed && <img src={tick} alt="tick" className="w-3 h-3" />}
            </div>
            <input
                type="checkbox"
                className="hidden cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg text-sm md:text-base ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            {/* CHANGED: always visible on mobile, hover only on desktop */}
            <button
                className="opacity-100 md:opacity-0 md:group-hover:opacity-80 inline-flex w-8 h-8 text-sm border-0 justify-center items-center bg-transparent shrink-0"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? <img src={save} alt="save" className="w-3 h-3 opacity-50 dark:invert"/> : <img src={edit} alt="edit" className="w-3 h-3 opacity-50 dark:invert"/>}
            </button>
            {/* Delete Todo Button */}
            {/* CHANGED: always visible on mobile, hover only on desktop */}
            <button
                className="opacity-100 md:opacity-0 md:group-hover:opacity-80 inline-flex w-3 h-3 text-sm border-0 justify-center items-center shrink-0 "
                onClick={() => deleteTodo(todo.id)}
            >
                <img src={cross} alt="cross" className="w-3 h-3 dark:invert"/>
            </button>
        </div>
    );
}

export default TodoItem;