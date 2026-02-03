import { createContext } from "react";
import type { ThemeContextType } from "../types/themeTypes";
type LoginContextType = {
    loggedin: boolean
    toggleLogin: () => void
}
export const ThemeContext = createContext<ThemeContextType | null>(null)
export const LoginContext = createContext<LoginContextType | null>(null)