import React, { useState } from 'react'
import { toast } from 'react-toastify'
import InputComponent from '../Components/ui/InputComponent';
import TextareaComponent from '../Components/ui/TextareaComponent';
import ProfilePhotoUpload from '../Components/ui/ProfilePhotoUpload';
import CheckboxComponent from '../Components/ui/CheckboxComponent';
import DropdownComponent from '../Components/ui/DropdownComponent';
import ButtonComponent from '../Components/ui/ButtonComponent';
import API from '../lib/api';
import { uploadImageToCloudinary } from '../utils/uploadImageToCloudinary';
import { Navigate, useNavigate } from 'react-router-dom';


const options = [
    { label: 'Primary', value: 'Primary' },
    { label: 'Work', value: 'Work' },
    { label: 'Family', value: 'Family' },
    { label: 'Friends', value: 'Friends' },
    { label: 'College', value: 'College' },
]

const CreateContact = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const [formErrors, setFormErrors] = useState({});
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        isFavorite: false,
        tags: ['primary'],
        notes: '',
        profilePicture: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prevData => ({
            ...prevData,
            [name]: newValue
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

        let imageUrl = '';
        let publicId = '';

        try {
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
            }

            const response = await API.post("/contacts", payload, {
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // }
            });
            console.log("response", response);
            if (response.status === 201 && response.data) {
                toast.success("Contact created successfully!");
                navigate("/");
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    isFavorite: false,
                    tags: ['primary'],
                    notes: '',
                    profilePicture: null
                });
            } else {
                setError("Failed to create contact. Please try again.");
            }
        } catch (err) {
            console.error("Error creating contact:", err);
            setError("Failed to create contact. Please try again.");
            return;
        }
    }

    return (
        <>
            <div className='bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 px-2 sm:px-6 xl:px-20 py-6'>
                <button
                    className="mb-4 text-blue-600 dark:text-gray-800 font-medium bg-gray-100 p-2 rounded-lg hover:bg-indigo-50 cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
                <div className="flex items-center justify-center
             flex-col p-4">
                    <div className="w-full h-full sm:max-w-xl rounded-xl bg-white dark:bg-dark-background p-6 shadow-lg">
                        <div className="text-lg font-bold flex justify-between items-center dark:text-white text-gray-800 mb-4" >
                            <span>Create New Contact</span>
                        </div>

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
                                    value={profilePhoto?.previewUrl}
                                    onChange={(file, previewUrl) => {
                                        setProfilePhoto({ file, previewUrl });
                                        setFormData(prev => ({
                                            ...prev,
                                            profilePicture: file
                                        }))
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
                                    name="Tag"
                                    id="tags"
                                    showCheckbox={false}
                                    options={options}
                                    selectedValue={formData.tags[0] || ""}
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
                                <ButtonComponent
                                    label="Create Contact"
                                    type="submit"
                                    width="w-fit" />

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateContact