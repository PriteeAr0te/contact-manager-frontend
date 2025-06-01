import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../Hookes/useAuth';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const { logout, isLoggedIn } = useAuth();

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
        if (typeof window !== 'undefined') {
            document.documentElement.classList.toggle('dark', !darkMode);
        }
    };

    return (
        <nav className="bg-dark shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex-shrink-0 flex items-center">
                        <img
                            className="h-8 w-auto"
                            width={200}
                            height={60}
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                            alt="TalentDeck Logo"
                        />
                        <span className="ml-2 font-bold text-lg text-white">Contact Manager</span>
                    </Link>

                    <div className="flex items-center space-x-4">

                        <Link
                            to="/create-contact"
                            className={`flex w-fit cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-500 focus:border-0 focus:outline-none`}
                        >
                            Create Contact
                        </Link>
                        
                        {isLoggedIn &&
                            <button onClick={logout}>
                                <span className="hidden sm:block text-sm 2xl:text-base font-medium px-4 py-2.5 rounded-md text-primary bg-white transition hover:bg-[#7E21D4] hover:text-white cursor-pointer">
                                    Logout
                                </span>
                            </button>
                        }
                        <button onClick={toggleDarkMode}
                            className="h-10 w-10 mr-2 sm:mr-4 rounded-lg p-1 cursor-pointer">
                            <svg className="fill-white block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                            <svg className="fill-white hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header