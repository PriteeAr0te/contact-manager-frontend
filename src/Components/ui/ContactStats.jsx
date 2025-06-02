import React, { useEffect, useState } from 'react'
import API from '../../lib/api';
import ContactStatsModal from './ContactStatsModal';

const ContactStats = () => {
    const [stats, setStats] = useState({
        totalContacts: 0,
        totalFavorites: 0,
        uniqueTags: {},
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await API.get('/contacts/stats', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStats(response.data);
                console.log('Contact Stats:', response.data);

            } catch (error) {
                console.error('Error fetching contact stats:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <>
            <div className='flex gap-3 items-center'>
                <div className="text-sm text-white bg-indigo-600 p-4 py-2 rounded-lg shadow-md">
                    <div className="flex gap-3 items-center">
                        <span>Total Contacts: </span>
                        <span className="text-xl font-bold">{stats.totalContacts}</span>
                    </div>
                </div>

                <button onClick={() => setIsOpen(true)} className='cursor-pointer hover:bg-gray-100 p-1 rounded-lg text-indigo-600 focus:border-0 focus:outline-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="currentcolor"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                </button>
            </div>

            <ContactStatsModal isOpen={isOpen} setIsOpen={setIsOpen} stats={stats} />
        </>
    )
}

export default ContactStats