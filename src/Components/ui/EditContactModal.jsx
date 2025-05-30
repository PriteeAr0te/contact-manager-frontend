import React, { useEffect, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import InputComponent from './InputComponent'
import ButtonComponent from './ButtonComponent'
import API from '../../lib/api'
import { toast } from 'react-toastify'

const EditContactModal = ({isOpen, setIsOpen, contact}) => {
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

 useEffect(() => {
  if (contact) {
    setFormData({
      name: contact.name || '',
      email: contact.email || '',
      phone: contact.phone || '',
    });
  }
}, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ 
            ...prevData,
            [name]: value
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
        return errors;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitting.....")
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({});
        // setError('');

        try {
            const response = await API.put(`/contacts/${contact._id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log("parsed data: ", formData);
            console.log("updated data: ", response.data);
            if (response.status === 200 && response.data) {
                await toast.success("Contact updated successfully!");
                setIsOpen(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                });
            } else {
                setError("Failed to update contact. Please try again.");
            }
        } catch (err) {
            console.error("Error updating contact:", err);  
            setError("Failed to update contact. Please try again.");
            return;
        }
        console.log("Contact Updated Successfully");
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                    <DialogTitle className="text-lg font-bold text-gray-800 mb-4">
                        Update Contact
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

                        {/* <InputComponent
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                        /> */}

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