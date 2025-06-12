import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import API from "../lib/api";
import { toast } from "react-toastify";

const ContactDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);
    const [error, setError] = useState(null);
    

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value);
        toast.success("Copied to clipboard!");
    };

    const getInitials = (name) => {
        return name
            ?.split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("")
            .slice(0, 2);
    };

    const fetchContact = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await API.get(`/contacts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setContact(response.data);
        } catch (err) {
            console.error(err);
            setError("Contact not found or failed to load.");
        }
    };

    useEffect(() => {
        fetchContact();
    }, [id]);

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    if (!contact) {
        return <div className="text-center mt-10 text-gray-500">Loading...</div>;
    }

    return (
        <>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 px-6 py-4">
                <button
                    className="mb-4 text-blue-600 dark:text-gray-800 font-medium bg-gray-100 p-2 rounded-lg hover:bg-indigo-50 cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800 shadow-custom rounded-xl p-6 space-y-4">
                    <h2 className="text-2xl font-bold">Contact Details</h2>

                    <div className="space-y-4">
                        <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 mb-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full overflow-hidden bg-indigo-600 text-white text-xl flex items-center justify-center font-bold">
                                    {contact.profilePicture ? (
                                        <img
                                            src={contact.profilePicture}
                                            alt={contact.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        getInitials(contact.name)
                                    )}
                                </div>
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white capitalize">
                                    {contact.name}
                                </h1>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Email ID:</strong> {contact.email}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(contact.email)}
                                    className="p-1 hover:scale-110 transition-transform focus:outline-none"
                                    title="Copy Email"
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
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Phone:</strong> {contact.phone}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(contact.phone)}
                                    className="p-1 hover:scale-110 transition-transform focus:outline-none"
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

                            {contact.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <strong className="text-gray-700 dark:text-gray-300">Tags:</strong>
                                    {contact.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-3 py-1 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center justify-between my-4">
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Address:</strong> {contact.address}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(contact.address)}
                                    className="p-1 hover:scale-110 transition-transform focus:outline-none"
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

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Notes:</strong> {contact.notes}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(contact.notes)}
                                    className="p-1 hover:scale-110 transition-transform focus:outline-none"
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
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Favorite:</strong> {contact.isFavorite ? "⭐ Yes" : "No"}
                                </span>
                            </div>
                        </div>

                        <div><strong>Created At:</strong> {moment(contact.createdAt).format("lll")}</div>
                        <div><strong>Updated At:</strong> {moment(contact.updatedAt).format("lll")}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactDetails;
