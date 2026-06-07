import React from "react";
import { TodoContext, useTodo, ThemeContext, useTheme, TodoProvider, ThemeContextProvider } from "../contexts";
import sun from "../../todo-app-main/images/icon-sun.svg"
import moon from "../../todo-app-main/images/icon-moon.svg"

export default function ThemeBtn() {
    const {themeMode, darkTheme, lightTheme } = useTheme()

    const clickHandle = (e) => {
        
        if(themeMode==="light") darkTheme()
        else lightTheme()

    }
    return (
        <button
        onClick={clickHandle}
        className="focus:outline-none"
        >
          {(themeMode==="dark")
          ?<img src={sun} alt="light mode" className="w-4 h-4"/>
          :<img src={moon} alt="dark mode" className="w-4 h-4"/>}
        </button>
    )
}