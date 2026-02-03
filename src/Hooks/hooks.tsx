import { useContext } from "react";
import { ThemeContext } from "../context/Context";
import { useEffect } from "react";

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }
    return context;
}


export function useSave<T>(key: string, value: T) {
    useEffect(() => {
        if (value === undefined) return;

        const valueToStore =
            typeof value === "object"
                ? JSON.stringify(value)
                : String(value);

        localStorage.setItem(key, valueToStore);
    }, [key, value]);
}