import React from 'react'; import type { Theme, } from '../types/themeTypes';
import { useState } from 'react'; import { ThemeContext } from '../context/Context';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme}>{children}</div>
        </ThemeContext.Provider>
    );
}