import React, { useEffect, useState } from 'react'
import API from '../lib/api';
import CreateContactModal from '../Components/ui/CreateContactModal';
import EditContactModal from '../Components/ui/EditContactModal';
import { Slide, toast, ToastContainer } from 'react-toastify';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

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

  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await API.get(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSelectedContact(response.data);
      console.log(response.data);
      setIsOpenEdit(true);
    } catch (err) {
      console.log("Failed to fetch contact for editing: ", err);
    } 
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
        toast.success("Contact deleted successfully")
      } catch (err) {
        console.log("Deletion failed", err);
      }
    }
  }

  return (
    <>
    <ToastContainer position="top-right" transition={Slide} className="z-50" autoClose={6000} closeButton={true} pauseOnHover={true} />
      <CreateContactModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <EditContactModal isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} contact={selectedContact} />
      <div className="px-4 w-full min-h-screen mx-auto py-12 xl:px-32 2xl:px-40 bg-white dark:bg-dark-background overflow-x-hidden">
        <div className="flex sm:flex-row flex-col gap-y-3 justify-center items-center sm:justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center dark:text-white flex-1">Contact Manager</h1>
          <button
            className={`flex w-fit cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-500 focus:border-0 focus:outline-none`}
            onClick={() => setIsOpen(true)}
          >
            Create Contact
          </button>
        </div>

        {contacts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-200">No contacts available.</p>
        ) : (
          <ul className="space-y-4">
            {contacts.map((contact) => (
              <li key={contact._id} className="border border-light dark:border-gray-100 rounded-lg p-4 shadow-sm flex sm:justify-between justify-center sm:flex-row flex-col gap-y-4 items-center">
                <div>
                  <p className="font-semibold text-gray-800 text-lg dark:text-gray-100 capitalize">{contact.name}</p>
                  <p className="text-gray-600 dark:text-gray-400">{contact.email}</p>
                  <p className="text-gray-600 dark:text-gray-400">{contact.phone}</p>
                </div>
                <div className="space-x-2 sm:w-fit w-full text-right">
                  <button
                    onClick={() => handleEdit(contact._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:border-0 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:border-0 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Home