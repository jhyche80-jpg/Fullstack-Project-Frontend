import { useTheme } from "../../Hooks/hooks"
import '../../Styles/navBar.css'
export default function NavBar() {
    const { theme, toggleTheme } = useTheme()
    return (
        <div id="NavBar">
            <h1 id="NavTitle">Momentum</h1>
            <button id='BtnMode' onClick={toggleTheme}>{theme === "light" ? 'Dark mode' : 'Light mode'}</button>

        </div>
    )
}
