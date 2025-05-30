import React, { useEffect, useState } from 'react'
import API from '../lib/api';
import ButtonComponent from '../Components/ButtonComponent';

const Home = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log("token", token)
      const response = await API.get("/contacts", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setContacts(response.data);
    } catch (err) {
      console.log("Failed to fetch contacts: ", err);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleEdit = () => {
    console.log("Editing Contact");
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      try {

        const token = localStorage.getItem('token')
        await API.delete(`/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchContacts();
      } catch (err) {
        console.log("Deletion failed", err);
      }
    }
  }

  return (
    <div className="px-4 w-full min-h-screen mx-auto py-12 xl:px-32 2xl:px-40 bg-white dark:bg-dark-background">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-center dark:text-white flex-1">Contact Manager</h1>
        <ButtonComponent label="Create Contact" width="w-fit" onClick={() => console.log("Create Contact")} />
      </div>

      {contacts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-200">No contacts available.</p>
      ) : (
        <ul className="space-y-4">
          {contacts.map((contact) => (
            <li key={contact._id} className="border dark:border-gray-100 rounded-lg p-4 shadow-sm flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg dark:text-gray-100">{contact.name}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{contact.email}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{contact.phone}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(contact._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home