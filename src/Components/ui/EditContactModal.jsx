import React, { useEffect, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import InputComponent from './InputComponent'
import ButtonComponent from './ButtonComponent'
import API from '../../lib/api'
import { toast } from 'react-toastify'
import TextareaComponent from './TextareaComponent'
import ProfilePhotoUpload from './ProfilePhotoUpload'
import CheckboxComponent from './CheckboxComponent'
import DropdownComponent from './DropdownComponent'
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary'

const options = [
    { label: 'Primary', value: 'Primary' },
    { label: 'Work', value: 'Work' },
    { label: 'Family', value: 'Family' },
    { label: 'Friends', value: 'Friends' },
    { label: 'College', value: 'College' },
];

const getInitialFormData = (contact) => ({
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    address: contact?.address || '',
    isFavorite: contact?.isFavorite || false,
    tags: contact?.tags && contact.tags.length > 0
        ? [contact.tags[0]]
        : [],
    notes: contact?.notes || '',
    profilePicture: contact?.profilePicture || null,
});

const EditContactModal = ({ isOpen, setIsOpen, contact, fetchContacts, currentPage }) => {
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [profilePhoto, setProfilePhoto] = useState({
        file: null,
        previewUrl: contact?.profilePicture || null,
    })

    const [formData, setFormData] = useState(getInitialFormData(contact));

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prevData => ({
            ...prevData,
            [name]: newValue,
        }))
    }

    const validate = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Name is required.";
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            errors.name = "Only letters and spaces allowed.";
        }
        if (!formData.email.trim()) {
            errors.email = "Email ID is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid email address.";
        }
        if (!formData.phone.trim()) {
            errors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = "Phone number must be 10 digits.";
        }
        if (formData.address && formData.address.length < 5) {
            errors.address = "Address is too short.";
        } else if (formData.address && formData.address.length > 200) {
            errors.address = "Address can't exceed 200 characters.";
        }
        if (formData.notes && formData.notes.length > 500) {
            errors.notes = "Notes can't exceed 500 characters.";
        }
        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        setError('');

        let imageUrl = formData.profilePicture || '';
        let publicId = formData.profilePicturePublicId || '';

        if (profilePhoto?.file) {
            const result = await uploadImageToCloudinary(profilePhoto.file);
            imageUrl = result.url;
            publicId = result.public_id;
        }

        const payload = {
            ...formData,
            tags: formData.tags[0] || '',
            profilePicture: imageUrl,
            profilePicturePublicId: publicId,
        };

        try {
            const response = await API.put(`/contacts/${contact._id}`, payload);

            if (response.status === 200 && response.data) {
                toast.success("Contact updated successfully!");
                setIsOpen(false);
                fetchContacts(currentPage);
                setFormData(getInitialFormData(null));
                setProfilePhoto({ file: null, previewUrl: null });
            } else {
                setError("Failed to update contact. Please try again.");
            }
        } catch (err) {
            console.error("❌ Error updating contact:", err);
            setError("Failed to update contact. Please try again.");
        }
    };

    useEffect(() => {
        if (contact) {
            setFormData(getInitialFormData(contact));
            setProfilePhoto({
                file: null,
                previewUrl: contact?.profilePicture || null,
            });
        }
    }, [contact]);


    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full h-full sm:max-w-xl rounded-xl bg-white dark:bg-dark-background p-6 shadow-lg min-h-[100vh-30px] scrollbar overflow-y-scroll" id="style-7">
                    <DialogTitle className="text-lg font-bold flex justify-between items-center dark:text-white text-gray-800 mb-4">
                        <span>Update Contact</span>
                        <div className="cursor-pointer text-gray-800 dark:text-gray-400 p-1 hover:bg-gray-50 dark:hover:text-gray-800  rounded-lg" onClick={() => setIsOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        </div>
                    </DialogTitle>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <InputComponent
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                            />
                            <p className='mt-2 text-red-600 text-sm'>{formErrors.name}</p>
                        </div>

                        <div>
                            <InputComponent
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                            <p className='mt-2 text-red-600 text-sm'>{formErrors.email}</p>
                        </div>

                        <div>
                            <InputComponent
                                label="Phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />
                            <p className='mt-2 text-red-600 text-sm'>{formErrors.phone}</p>
                        </div>

                        <div>
                            <TextareaComponent
                                label="Address"
                                name="address"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            <p className='text-red-600 mt-2, text-sm'>{formErrors.address}</p>
                        </div>

                        <div>
                            <ProfilePhotoUpload
                                value={profilePhoto.previewUrl}
                                onChange={(file, previewUrl) => {
                                    setProfilePhoto({ file, previewUrl });
                                    setFormData(prev => ({
                                        ...prev,
                                        profilePicture: previewUrl,
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <CheckboxComponent name="isFavorite" id="isFavorite" checked={formData.isFavorite} label="Mark as favorite" onChange={handleChange} />
                        </div>

                        <div>
                            <DropdownComponent
                                search={false}
                                label='Select Tag'
                                name="tags"
                                id="tags"
                                showCheckbox={false}
                                options={options}
                                selectedValue={formData.tags[0] || ''}
                                onChange={(selected) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        tags: [selected]
                                    }))
                                }}
                            />
                        </div>

                        <div>
                            <TextareaComponent
                                label="Notes"
                                name="notes"
                                id="notes"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                            <p className='text-red-600 mt-2, text-sm'>{formErrors.notes}</p>
                        </div>

                        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <ButtonComponent
                                label="Update Contact"
                                type="submit"
                                width="w-fit" />

                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )

}

export default EditContactModal