import { createContext } from "react";
import type { ThemeContextType } from "../types/themeTypes";
type LoginContextType = {
    loggedin: boolean
    toggleLogin: (choice: boolean) => void
}
export const ThemeContext = createContext<ThemeContextType | null>(null)
export const LoginContext = createContext<LoginContextType | null>(null)