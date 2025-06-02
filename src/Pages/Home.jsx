import React, { useEffect, useState } from 'react'
import API from '../lib/api';
import EditContactModal from '../Components/ui/EditContactModal';
import { Slide, toast, ToastContainer } from 'react-toastify';
import DropdownComponent from '../Components/ui/DropdownComponent';
import PaginationComponent from '../Components/ui/PaginationComponent';

const sortOptions = [
  { label: "Name (A-Z)", value: JSON.stringify({ sortBy: "name", sortOrder: "asc" }) },
  { label: "Name (Z-A)", value: JSON.stringify({ sortBy: "name", sortOrder: "desc" }) },
  { label: "Newest First", value: JSON.stringify({ sortBy: "createdAt", sortOrder: "desc" }) },
  { label: "Oldest First", value: JSON.stringify({ sortBy: "createdAt", sortOrder: "asc" }) },
];

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({ sortBy: "name", sortOrder: "asc" });
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalFavorites, setTotalFavorites] = useState(0);
  const [totalTags, setTotalTags] = useState(0);

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      fetchContacts(currentPage);
    }, 500);
    return () => clearTimeout(delayBounce);
  }, [searchTerm, selectedTag, isFavorite, currentPage, sort.sortBy, sort.sortOrder]);

  const fetchContacts = async (page) => {
    try {
      const token = localStorage.getItem('token');

      const params = { page, limit: 3, sortBy: sort.sortBy, sortOrder: sort.sortOrder };

      if (searchTerm) params.search = searchTerm;
      if (selectedTag) params.tag = selectedTag;
      if (isFavorite) params.isFavorite = true;

      const response = await API.get(`/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params
      });
      const data = response.data;
      setContacts(data);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);

      if (searchTerm.length > 0) {
        const names = data.map((contact) => contact.name);
        setSuggestions(names.slice(0, 5));
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (err) {
      console.log("Failed to fetch contacts: ", err);
    }
  }

  useEffect(() => {
    const fetchInitialContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get(`/contacts`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setContacts(response.data);

        
      console.log("contacts :", response.data)

      setTotalContacts(response.data.contacts.length);

      const favorites = contacts.filter(contact => contact.isFavorite);
      setTotalFavorites(favorites.length);

      const tagSet = new Set();
      contacts.forEach(contact => {
        if (Array.isArray(contact.tags)) {
          contact.tags.forEach(tag => tagSet.add(tag.toLowerCase()));
        }
      });
      setTotalTags(tagSet.size);


      } catch (err) {
        console.log("Failed to fetch contacts: ", err);
      }
    };
    fetchInitialContacts();
  }, []);

  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
  };

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

  // console.log("contact length:", totalContacts);

  return (
    <>
      <EditContactModal isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} contact={selectedContact} />
      <div className="px-4 w-full min-h-screen mx-auto py-12 xl:px-32 2xl:px-40 bg-white dark:bg-dark-background overflow-x-hidden">
        <div className="w-fit sm:w-auto flex justify-end gap-4 mb-4">
          <div className="grid gap-4 text-sm text-white bg-purple-900 p-4 py-2 rounded-lg shadow-md">
            <div className="flex gap-3 items-center">
              <span className="text-xl font-bold">{totalContacts}</span>
              <span>Total Contacts</span>
            </div>
            {/* <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{totalFavorites}</span>
              <span>Favorites</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{totalTags}</span>
              <span>Unique Tags</span>
            </div> */}
          </div>
        </div>

        <div className="flex sm:flex-row flex-col gap-y-3 justify-between items-center sm:justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-left dark:text-white flex-1">Contact Manager</h1>
          <div className='flex gap-2 items-start'>
            <button
              onClick={() => setIsFavorite(prev => !prev)}
              className="ml-4 p-2"
              title="Show Favorites Only cursor-pointer"
            >
              {isFavorite ? (
                <svg
                  className="text-indigo-600 w-6 h-6 fill-current cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                </svg>
              ) : (
                <svg
                  className="text-indigo-600 w-7 h-6 fill-none stroke-current cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  strokeWidth="40"
                >
                  <path d="M256 96L244 84.02C211.4 51.37 164.1 36.51 119.4 44.1C50.52 55.58 0 115.2 0 185.1V190.9C0 232.4 17.23 272.1 47.59 300.4L228.3 469.1C235.8 476.1 245.7 480 256 480C266.3 480 276.2 476.1 283.7 469.1L464.4 300.4C494.8 272.1 512 232.4 512 190.9V185.1C512 115.2 461.5 55.58 392.6 44.1C347 36.51 300.6 51.37 267.1 84.02L256 96Z" />
                </svg>
              )}
            </button>

            <div className="flex items-center rounded-md bg-transparent pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-1 has-[input:focus-within]:-outline-offset-1 has-[input:focus-within]:outline-indigo-600 relative">
              <div className="shrink-0 text-base text-gray-500 dark:text-gray select-none sm:text-sm/6">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
              </div>
              <input
                id="search"
                name="search"
                type="search"
                placeholder="Search Contacts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block min-w-0 grow py-2.5 pr-3 pl-1 text-base dark:text-white text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-11 z-40 mt-1 left-0 bg-white dark:bg-dark-background border border-gray-300 dark:border-gray-700 rounded-md w-full max-w-sm shadow-md">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSearchTerm(suggestion);
                        setShowSuggestions(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-hover text-gray-800 dark:text-gray-200"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-0 w-full sm:w-[200px]">
              <DropdownComponent
                isLabel={false}
                options={[
                  { value: "Primary", label: "Primary" },
                  { value: "Family", label: "Family" },
                  { value: "Friends", label: "Friends" },
                  { value: "Work", label: "Work" },
                  { value: "College", label: "College" },
                ]}
                selectedValue={selectedTag}
                onChange={handleTagChange}
                showSearch={false}
              />
            </div>
            {selectedTag && (
              <button
                className="ml-1 text-sm text-indigo-600 underline mt-2 hover:bg-gray-100 rounded-md p-1"
                onClick={() => setSelectedTag(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
              </button>
            )}

            <div className="mb-0 w-full sm:w-[200px]">
              <DropdownComponent
                name="Sort"
                label="Sort Contacts"
                isLabel={false}
                options={sortOptions}
                selectedValue={JSON.stringify(sort)}
                onChange={(val) => {
                  const parsed = JSON.parse(val);
                  setSort(parsed);
                }}
              />
            </div>
          </div>
        </div>

        {contacts.contacts?.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-200">No contacts available.</p>
        ) : (
          <ul className="space-y-4">
            {contacts?.contacts?.map((contact) => (
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
        <div className='mt-14 bg-transparent'>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>


    </>
  );
}

export default Home;