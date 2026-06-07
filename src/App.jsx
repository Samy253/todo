import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { TodoProvider } from './contexts/TodoContext'
import bgImage from '../todo-app-main/images/bg-desktop-light.jpg'
import bgImageDark from '../todo-app-main/images/bg-desktop-dark.jpg'
import ThemeBtn from './components/ThemeBtn'
import { ThemeContextProvider } from './contexts'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo},...prev])
  }

  const updateTodo = (id , todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id)? todo: prevTodo))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map( (prevTodo)=> prevTodo.id===id? {...prevTodo, completed : !prevTodo.completed}: prevTodo))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo)=> prevTodo.id !== id))
  }

  const activeTodos = todos.filter(todo => !todo.completed).length

  const clearCompleted = () => {
    setTodos((prev) => prev.filter(todo => !todo.completed))
  }

  const [themeMode, setThemeMode] = useState("light")

  const lightTheme = () => {
    setThemeMode("light")
  }

  const darkTheme = () => {
    setThemeMode("dark")
  }

  useEffect(() => {
    document.querySelector('html').classList.remove("light","dark")
    document.querySelector('html').classList.add(themeMode);
  },[themeMode])

  return (
    <ThemeContextProvider value={{themeMode,darkTheme,lightTheme}}>
    <TodoProvider value={{todos, addTodo, updateTodo, toggleComplete, deleteTodo}}>

      {/* full page */}
      <div
        className="min-h-screen"
        style={{
          backgroundImage: `url(${themeMode==="light"?bgImage:bgImageDark})`,
          backgroundSize: "100% 200px",
          backgroundRepeat: "no-repeat",
          backgroundColor: `${themeMode==="light"?"#e8e8e8":"#171823"}`
          
        }}
      >
        {/* centered container */}
        <div className="w-full max-w-lg mx-auto px-4 pt-10">

          {/* header - TODO title, sits on top of image */}
          <div className="flex justify-between items-center mb-8">
            <h1
              style={{fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.5em"}}
              className="text-3xl font-bold text-white"
            >
              TODO
            </h1>
            {/*the toggle icon should go here */}
            <ThemeBtn/>
          </div>

          {/* todo form - white card */}
          <div className="bg-white rounded-lg shadow-md mb-4 dark:bg-[#25273c]">
            <TodoForm/>
          </div>

          {/* todo list - white card */}
          <div className="bg-white shadow-md rounded-lg dark:bg-[#25273c]">
            {todos.map((todo) => (
              <div key={todo.id} className='w-full border-b border-gray-200 last:border-none dark:border-gray-700'>
                <TodoItem todo={todo}/>
              </div>
            ))}
              <div className='flex items-center justify-between py-1 px-3'>
                {/* items left */}
                <div
             
                className='text-sm text-gray-500 dark:text-gray-400'
                >{activeTodos} items left</div>
              
                {/* clear completed */}
                <button
                className={`text-sm text-gray-500 border-0 hover:text-gray-700 ${(todos.length===0||todos.filter(todo => todo.completed).length===0)?"hidden":""} dark:text-gray-400 dark:hover:text-white`}
                onClick={clearCompleted}
                >Clear Completed</button>
              </div>
                
              </div>
            </div>
           
            

      </div>
      
    </TodoProvider>
    </ThemeContextProvider>
  )
}

export default App
