import { Link } from 'react-router-dom';
import { useAuth } from '../../Hookes/useAuth';
import Logo from '../../assets/logo.png';
import useDarkMode from '../../Hookes/useDarkMode';

const Header = () => {
    const [darkMode, toggleDarkMode] = useDarkMode();
    const { logout, isLoggedIn } = useAuth();

    return (
        <nav className="bg-dark shadow">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex-shrink-0 flex items-center">
                        <img
                            className="h-8 w-auto"
                            width={200}
                            height={60}
                            src={Logo}
                            alt="TalentDeck Logo"
                        />
                        <span className="ml-2 font-bold sm:text-lg text-white">Contact Manager</span>
                    </Link>

                    <div className="flex items-center space-x-4">

                        <Link
                            to="/create-contact"
                            className={`flex w-fit text-sm whitespace-nowrap sm:text-base cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-500 focus:border-0 focus:outline-none`}
                        >
                            Create Contact
                        </Link>

                        {isLoggedIn &&
                            <button onClick={logout}>
                                <span className=" text-sm 2xl:text-base font-medium px-4 py-2.5 rounded-md text-primary bg-white transition hover:bg-[#7E21D4] hover:text-white cursor-pointer flex gap-2 items-center">
                                    <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg></span>
                                    <span className='hidden sm:block'>Logout</span>
                                </span>
                            </button>
                        }
                        <button onClick={toggleDarkMode}
                            className="h-10 w-10 mr-2 sm:mr-4 rounded-lg p-1 cursor-pointer">
                            {darkMode ?
                                <span className='text-white bg-white'>
                                    <svg className="fill-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                    </svg>
                                </span>
                                :
                                <span className='text-white bg-white'>
                                    <svg className="fill-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                            fillRule="evenodd" clipRule="evenodd"></path>
                                    </svg>
                                </span>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header