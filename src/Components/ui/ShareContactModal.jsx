import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import InputComponent from "./InputComponent";
import { toast } from "react-toastify";
import API from "../../lib/api";

const ShareContactModal = ({ contactId, shareModal, setShareModal }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [_, setSelectedUser] = useState(null);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const res = await API.get(`/users/search?query=${query}`);
            setResults(res.data);
            if (res.status === 200) {
                console.log("query success")
            }
        } catch (err) {
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async (user) => {
        try {
            const res = await API.post(`/contacts/${contactId}/share`, { user });
            setShareModal(false);
            toast.success("Contact shared successfully ✅");
            setSelectedUser(null);
            setQuery("");
            setResults([]);
        } catch (err) {
            console.error("Share failed:", err?.response?.data || err.message);
            toast.error("Failed to share. Try again ❌");
        }
    };

    return (
        <>

            <Dialog open={shareModal} onClose={() => setShareModal(false)} className="relative z-10">
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full h-fit sm:max-w-xl rounded-xl bg-white dark:bg-dark-background p-6 shadow-lg min-h-fit" id="style-7">
                        <DialogTitle className="text-lg font-bold flex justify-between items-center dark:text-white text-gray-800 mb-4">
                            <span>Share Contact</span>
                            <div className="cursor-pointer text-gray-800 dark:text-gray-400 p-1 hover:bg-gray-50 dark:hover:text-gray-800  rounded-lg" onClick={() => setShareModal(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                            </div>
                        </DialogTitle>

                        <div className="flex flex-col gap-3">
                            <InputComponent
                                placeholder="Search by name, email or phone"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            />
                            <button className={`flex cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                onClick={handleSearch} disabled={loading}>
                                {loading ? "Searching..." : "Search"}
                            </button>
                            {results.length > 0 && (
                                <div className="mt-2 space-y-2">
                                    {results.map((user) => (
                                        <div
                                            key={user._id}
                                            className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
                                            onClick={() => handleShare(user)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
                                                    {user.profilePhoto ? (
                                                        <img src={user.profilePhoto} alt={user.username} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span>{user.username.charAt(0).toUpperCase()}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-gray-800 dark:text-gray-100">{user.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                            <button
                                                className="flex cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-500"
                                            >
                                                Share
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}


                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}

export default ShareContactModal;
