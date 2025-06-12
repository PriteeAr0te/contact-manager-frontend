import { Link } from 'react-router-dom';
import { useAuth } from '../../Hookes/useAuth';
import Logo from '../../assets/logo.png';
import useDarkMode from '../../Hookes/useDarkMode';
import ProfilePicture from '../../../src/assets/profile-pic.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { fetchUnseenSharedStatus } from '../../redux/slices/sharedContactsSlice';

const Header = () => {
    const [darkMode, toggleDarkMode] = useDarkMode();
    const { logout, isLoggedIn } = useAuth();
    const user = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    const hasUnseen = useSelector((state) => state.sharedContacts.hasUnseen);
    const dropdownRef = useRef(null);

    useEffect(() => {
        dispatch(fetchUnseenSharedStatus());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                dropdownRef.current.removeAttribute('open');
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);


    const handleClose = () => {
        const dropdown = document.getElementById('profile-dropdown');
        if (dropdown?.open) dropdown.removeAttribute('open');
    };

    console.log("is Contact Seen: ", hasUnseen);

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
                        <span className="ml-2 font-bold sm:text-lg text-white">Contact Book</span>
                    </Link>

                    <div className="flex items-center space-x-4">

                        <Link
                            to="/create-contact"
                            className={`flex w-fit text-sm whitespace-nowrap sm:text-base cursor-pointer justify-center rounded-md bg-indigo-700 px-3 py-1.5 font-semibold text-white hover:bg-indigo-600 focus:border-0 focus:outline-none`}
                        >
                            Create Contact
                        </Link>

                        <details
                            id="profile-dropdown"
                            className="relative group"
                            ref={dropdownRef}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <summary className="cursor-pointer flex items-center list-none focus:outline-none">
                                <div className='relative'>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={user?.profilePhoto || ProfilePicture}
                                        alt="Profile"
                                    />
                                    {hasUnseen && (
                                        <span className="absolute -top-1 right-0 w-2.5 h-2.5 bg-red-600 rounded-full" />
                                    )}
                                </div>
                            </summary>

                            <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-100 dark:border-gray-700">
                                <Link
                                    to='/myprofile'
                                    onClick={handleClose}
                                    className='py-2 px-4 text-sm text-gray-700 dark:text-gray-200 hover:bg-background-hover dark:hover:bg-background-hover cursor-pointer flex gap-2 items-center'
                                >
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg>
                                    </span>
                                    <span
                                        className=""
                                    >
                                        My Profile
                                    </span>
                                </Link>
                                <Link
                                    to='/shared-contacts'
                                    onClick={handleClose}
                                    className='py-2 px-4 text-sm text-gray-700 dark:text-gray-200 hover:bg-background-hover dark:hover:bg-background-hover cursor-pointer flex gap-2 items-center'
                                >
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z" /></svg>
                                    </span>
                                    <span
                                        className=""
                                    >
                                        Shared Contact
                                    </span>
                                    {hasUnseen && (
                                        <span className="w-2.5 h-2.5 bg-red-600 rounded-full" />
                                    )}
                                </Link>
                                {isLoggedIn && <button className="text-sm 2xl:text-base font-medium px-4 py-2 text-gray-700 dark:text-white cursor-pointer flex gap-2 items-center hover:bg-background-hover dark:hover:bg-background-hover w-full" onClick={logout}>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg></span> Logout
                                </button>}
                            </ul>
                        </details>

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