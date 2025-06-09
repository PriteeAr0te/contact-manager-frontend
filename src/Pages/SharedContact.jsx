import { useEffect, useState } from "react";
import API from "../lib/api";

const SharedContactsPage = () => {
    const [sharedContacts, setSharedContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSharedContacts = async () => {

            try {
                const token = localStorage.getItem('token');
                const res = await API.get("/contacts/shared", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Shared Contact: ", res.data)
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
        <div className="p-4 max-w-4xl mx-auto dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Shared Contacts</h1>

            {loading ? (
                <p>Loading shared contacts...</p>
            ) : sharedContacts.length === 0 ? (
                <div className="text-center text-gray-500 mt-12">
                    <p>No contacts have been shared with you yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sharedContacts.map((contact) => (
                        <div key={contact._id} className="p-4 border rounded-xl bg-white dark:bg-dark-background shadow-md flex items-start gap-4">
                            <div className="relative">
                                <img
                                    src={contact.profilePhoto || "/default-avatar.png"}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">{contact.name}</h2>
                                <p className="text-sm text-gray-500">{contact.email}</p>
                                <p className="text-sm text-gray-500">{contact.phone}</p>
                                <p className="text-xs text-muted">Shared by: {contact.createdBy?.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SharedContactsPage;
