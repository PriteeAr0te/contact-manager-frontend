import React, { useRef } from 'react'

const ProfilePhotoUpload = ({ value, onChange }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            onChange(file, previewUrl);
        }
    };

    return (
        <>
            <div className="col-span-full">
                <label htmlFor="photo" className="block text-base font-medium dark:text-white text-gray-900">
                    Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                    <div aria-hidden="true" className="size-12 dark:text-gray-300 text-gray-700 border rounded-full place-items-center place-content-center dark:border-gray-300 border-primary">
                        {value ?

                            <img src={value} alt="Profile" className="rounded-full w-full h-full object-cover" />
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" /></svg>
                        }
                    </div>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="rounded-md cursor-pointer border-0 outline-none bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-inset hover:bg-gray-50"
                    >
                        Upload
                    </button>

                    <input id="file-upload" ref={fileInputRef} accept='image/*' onChange={handleFileChange} name="file-upload" type="file" className="sr-only" />
                </div>
            </div>
        </>
    )
}

export default ProfilePhotoUpload