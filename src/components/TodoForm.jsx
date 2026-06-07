import React,{useState} from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault()
        if(!todo) return;
        addTodo({todo, completed: false})
        setTodo("")// empties the input box
    }

    return (
        <form  onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 md:px-4 outline-none duration-150 bg-white/20 py-1.5 md:py-3 text-sm md:text-base dark:text-white dark:bg-transparent dark:placeholder-gray-400"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 md:px-4 py-1 md:py-3 bg-green-600 text-white shrink-0 text-sm md:text-base">
                Add
            </button>
        </form>
    );
}

export default TodoForm;