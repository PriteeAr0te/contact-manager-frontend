import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react'

const ContactStatsModal = ({ isOpen, setIsOpen, stats }) => {
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full h-fit sm:max-w-xl rounded-xl bg-white dark:bg-dark-background p-6 shadow-lg">
                    <DialogTitle className="text-lg font-bold flex justify-between items-center dark:text-white text-primary mb-4">
                        <span>Contact Statistics</span>
                        <div className="cursor-pointer text-gray-800 dark:text-gray-300 p-1 hover:bg-gray-50 rounded-lg dark:hover:text-gray-800" onClick={() => setIsOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        </div>
                    </DialogTitle>
                    <div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            <div className="flex gap-3 items-center mb-2">
                                <span className='text-gray-800 dark:text-gray-300 text-lg'>Total Contacts:</span>
                                <span className="text-xl font-bold">{stats.totalContacts}</span>
                            </div>
                            <div className="flex gap-3 items-center mb-2">
                                <span className='text-gray-800 dark:text-gray-300 text-lg'>Total Favorites:</span>
                                <span className="text-xl font-bold">{stats.totalFavorites}</span>
                            </div>
                            <div className="mt-2">
                                <p className="text-lg text-gray-800 dark:text-gray-300 font-medium flex">Top Tags:</p>
                                <div className='flex gap-2 items-center flex-wrap mt-2' >
                                    {Object.entries(stats.uniqueTags).slice(0, 3).map(([tag, count]) => (
                                        <div className='p-2 bg-indigo-600 rounded-lg text-white' key={tag}>
                                            <p key={tag} className="">#{tag} ({count})</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default ContactStatsModal;