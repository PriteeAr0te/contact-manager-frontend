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
    <div className="p-6 max-w-4xl min-w-6xl mx-auto py-12">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-center flex-1">Contact Manager</h1>
        <ButtonComponent label="Create Contact" width="w-fit" onClick={() => console.log("Create Contact")} />
      </div>

      {contacts.length === 0 ? (
        <p className="text-center text-gray-500">No contacts available.</p>
      ) : (
        <ul className="space-y-4">
          {contacts.map((contact) => (
            <li key={contact._id} className="border rounded-lg p-4 shadow-sm flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{contact.name}</p>
                <p className="text-gray-600 text-sm">{contact.email}</p>
                <p className="text-gray-600 text-sm">{contact.phone}</p>
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