import { useEffect, useState } from "react";
import API from "../lib/api";
import ProfilePhoto from "../../src/assets/profile-pic.jpg";
import moment from "moment";
import { Slide, toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SharedContacts = () => {
    const [sharedContacts, setSharedContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard!`);
    };

    useEffect(() => {
        const fetchSharedContacts = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await API.get("/contacts/shared", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSharedContacts(res.data);
            } catch (err) {
                console.error("Error fetching shared contacts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSharedContacts();
    }, []);

    return (
        <>
            <ToastContainer position="top-right" transition={Slide} className="z-50" autoClose={6000} closeButton={true} pauseOnHover={true} />

            <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 px-2 sm:px-6 xl:px-20 py-6">
                <button
                    className="mb-6 text-blue-600 dark:text-gray-800 font-medium bg-gray-100 p-2 rounded-lg hover:bg-indigo-50 cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
                <div className="w-full flex justify-center items-center">
                    <h1 className="text-3xl font-bold mb-6">Shared Contacts</h1>
                </div>
                <div className="">

                    {loading ? (
                        <p className="text-gray-500">Loading shared contacts...</p>
                    ) : sharedContacts.length === 0 ? (
                        <div className="text-center text-gray-400 mt-12">
                            <p>No contacts have been shared with you yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                            {sharedContacts.map((contact) => (
                                
                                <div
                                    key={contact._id}
                                    className="p-4 border rounded-2xl bg-white dark:bg-dark-background shadow-md hover:shadow-lg transition duration-300 flex items-start gap-4"
                                >
                                    {console.log("Contact Detail:", contact)}
                                    <img
                                        src={contact.profilePicture || ProfilePhoto}
                                        alt="Profile"
                                        className="w-14 h-14 rounded-full object-cover border border-gray-300"
                                    />

                                    <div className="flex-1">
                                        <Link to={`/contact/${contact._id}`} className="text-xl font-semibold mb-1 cursor-pointer hover:text-indigo-600">{contact.name}</Link>
                                        <div className="flex items-center text-sm gap-2 text-gray-600 dark:text-gray-300">
                                            {contact.email}
                                            <button
                                                onClick={() => handleCopy(contact.email, "Email")}
                                                className="p-1 hover:scale-110 transition-transform focus:outline-none cursor-pointer"
                                                title="Copy Phone"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="20px"
                                                    viewBox="0 -960 960 960"
                                                    width="20px"
                                                    fill="currentColor"
                                                    className="text-gray-500 dark:text-gray-300"
                                                >
                                                    <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center text-sm gap-2 text-gray-600 dark:text-gray-300 mt-1">
                                            {contact.phone}
                                            <button
                                                onClick={() => handleCopy(contact.phone, 'Phone')}
                                                className="p-1 hover:scale-110 transition-transform focus:outline-none cursor-pointer"
                                                title="Copy Phone"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="20px"
                                                    viewBox="0 -960 960 960"
                                                    width="20px"
                                                    fill="currentColor"
                                                    className="text-gray-500 dark:text-gray-300"
                                                >
                                                    <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-sm text-muted mt-2">
                                            Shared by:
                                            <span className="font-medium ml-1">{contact.user_id?.username}</span>
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Shared on: {moment(contact.createdAt).format("DD MMM YYYY, hh:mm A")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SharedContacts;
