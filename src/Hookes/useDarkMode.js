import React, { useEffect, useState } from 'react'

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const setTheme = localStorage.getItem('darkMode');
        const isDark = setTheme === 'true';
        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark)
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        document.documentElement.classList.toggle('dark', newMode)
    };

  return [darkMode, toggleDarkMode]
}

export default useDarkMode