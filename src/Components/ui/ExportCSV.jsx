import React from 'react'
import API from '../../lib/api';
import { exportContactsToCSV } from '../../utils/exportToCSV';

const ExportCSV = () => {

    const handleExport = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.get('/contacts/stats', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const contacts = response.data.contacts; 
            if(!contacts || contacts.length === 0) {
                console.error('No contacts available to export.');
                return;
            }

            exportContactsToCSV(contacts, 'contacts.csv');
        } catch (error) {
            console.error('Error exporting contacts to CSV:', error);
        }

    }

    return (
        <button onClick={handleExport} className='text-white cursor-pointer hover:bg-indigo-500 bg-indigo-600 p-4 py-2 rounded-lg shadow-md flex gap-2 items-center'>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg>
            </span>
            <span>Export CSV</span>
        </button>
    )
}

export default ExportCSV