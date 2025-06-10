import React, { useEffect, useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import InputComponent from '../Components/ui/InputComponent';
import TextareaComponent from '../Components/ui/TextareaComponent';
import ButtonComponent from '../Components/ui/ButtonComponent';
import ProfilePhotoUpload from '../Components/ui/ProfilePhotoUpload';
import { uploadImageToCloudinary } from '../utils/uploadImageToCloudinary';
import API from '../lib/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [error, setError] = useState('');
    const [user, setUser] = useState([]);
    const [editMode, setEditMode] = useState(false)
    const [formErrors, setFormErrors] = useState({});
    const [profilePhoto, setProfilePhoto] = useState({
        file: null,
        previewUrl: user?.profilePhoto || null
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        profilePhoto: null
    });

    const navigate = useNavigate();

    useEffect(() => {
        const getProfileData = async () => {

            try {
                const response = await API.get('/users/me')
                const data = response.data;
                setUser(data)
                setFormData({
                    name: data.username,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    profilePhoto: data.profilePhoto
                });
                localStorage.setItem('user', JSON.stringify(response.data));

                setProfilePhoto({
                    file: null,
                    previewUrl: data.profilePhoto || null
                });

            } catch (err) {
                console.log("Error in fetching profile data: ", err);
            }

        }
        getProfileData();

    }, [])

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
        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitting")
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({});
        setError('');

        let imageUrl = '';
        let publicId = ''

        try {
            if (profilePhoto?.file) {
                const result = await uploadImageToCloudinary(profilePhoto.file);
                imageUrl = result.url;
                publicId = result.public_id
            }

            const payload = {
                ...formData,
                profilePhoto: imageUrl,
                profilePicturePublicId: publicId
            }
            console.log("payload", payload)

            const response = await API.put("/users/me", payload);

            console.log(response);
            if (response.status === 200 && response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));

                await toast.success("Profile Edited Successfully");

                console.log("Profile Uploaded Successfully")
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    profilePhoto: null
                });
            } else {
                setError("Failed to edit profile. Please try again.");
            }
        } catch (err) {
            console.error("Error editing profile:", err);
            setError("Failed to edit profile. Please try again.");
            return;
        }
        console.log("Profile Updated");
    }

    return (
        <>
            <ToastContainer position="top-right" transition={Slide} className="z-50" autoClose={6000} closeButton={true} pauseOnHover={true} />
            <div className='bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 px-2 sm:px-6 xl:px-20 py-6'>
                  <button
                    className="mb-6 text-blue-600 dark:text-gray-800 font-medium bg-gray-100 p-2 rounded-lg hover:bg-indigo-50 cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
                <div className="flex items-center justify-center p-4">
                    <div className="w-full h-full sm:max-w-xl rounded-xl bg-white dark:bg-dark-background p-6 shadow-lg">
                        {!editMode ?
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    {user.profilePhoto ? (
                                        <img src={user.profilePhoto} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-2xl font-semibold text-white">
                                            {user.username?.[0]?.toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.username}</h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-300">{user.email}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    <p><strong>Phone:</strong> {user.phone}</p>
                                    <p><strong>Address:</strong> {user.address}</p>
                                    <p><strong>Created:</strong> {moment(user.createdAt).format('Do MMM YYYY, h:mm A')}</p>
                                    <p><strong>Last Updated:</strong> {moment(user.updatedAt).format('Do MMM YYYY, h:mm A')}</p>

                                </div>
                                <div className="flex justify-end">
                                    <button className={`flex cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-none focus-visible:outline-indigo-600`} onClick={() => setEditMode(true)}>
                                        Edit
                                    </button>
                                </div>
                            </div>
                            :
                            <>
                                <div className="text-lg font-bold bg-dark-background flex justify-between items-center dark:text-white text-gray-800 mb-4" >
                                    <span>Edit Profile</span>
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
                                            disabled={true}
                                            placeholder="Enter email"
                                        />
                                        <p className='mt-2 text-red-600 text-sm'>{formErrors.email}</p>
                                    </div>

                                    <div>
                                        <InputComponent
                                            label="Phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone || ''}
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
                                            value={formData.address || ''}
                                            onChange={handleChange}
                                        />
                                        <p className='text-red-600 mt-2, text-sm'>{formErrors.address}</p>
                                    </div>

                                    <div>
                                        <ProfilePhotoUpload
                                            label="Profile Photo"
                                            value={profilePhoto?.previewUrl || ''}
                                            onChange={(file, previewUrl) => {
                                                setProfilePhoto({ file, previewUrl });
                                                setFormData(prev => ({
                                                    ...prev,
                                                    profilePhoto: file
                                                }))
                                            }}
                                        />
                                    </div>

                                    {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

                                    <div className="flex justify-end gap-2 pt-4">
                                        <ButtonComponent
                                            label="Edit Profile"
                                            type="submit"
                                            width="w-fit" />

                                    </div>
                                </form>
                            </>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile