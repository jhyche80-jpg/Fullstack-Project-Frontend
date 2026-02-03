import { useNavigate } from "react-router-dom"
import { useTheme } from "../../Hooks/hooks"
import '../../Styles/navBar.css'
import { userLogout } from "../../utils/api/userApi"
import { useContext } from "react"
import { LoginContext } from "../../context/Context"
export default function NavBar() {
    const navigate = useNavigate()
    const loginContext = useContext(LoginContext)

    if (!loginContext) {
        throw new Error("NavBar must be used within a LoginProvider")
    }

    const { loggedin, toggleLogin } = loginContext

    async function HandleLogout() {
        try {
            await userLogout()
            navigate('/')
            toggleLogin()

        } catch (error) {

        }


    }
    const { theme, toggleTheme } = useTheme()
    return (
        <div id="NavBar">
            <h1 id="NavTitle">Momentum</h1>
            {loggedin && <div id='ContolButton'>
                <button onClick={HandleLogout} className='BtnMode' id="Logout">Logout </button>
                <button className='BtnMode' id="Switcher" onClick={toggleTheme}>{theme === "light" ? 'Dark mode' : 'Light mode'}</button>
            </div>}


        </div>
    )
}
