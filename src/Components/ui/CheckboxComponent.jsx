import React from 'react'

const CheckboxComponent = ({ name, checked, onChange, id, label }) => {
    return (
        <>
            <label className="inline-flex items-center space-x-2 cursor-pointer">
                <span className="text-base font-medium dark:text-white text-gray-700">{label}</span>
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    id={id}
                    onChange={onChange}
                    className="p-2 rounded border border-gray-300 dark:border-indigo-600 dark:bg-gray-700 dark:text-white focus:outline-none"
                    style={{ width: '20px', height: '20px' }} 
                />
                {/* <div className="w-5 h-5 rounded border border-primary peer-checked:bg-indigo-600 peer-checked:border-indigo-600 flex items-center justify-center">
                    <svg
                        className="w-3 h-3 text-white hidden peer-checked:inline"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div> */}
            </label>
        
        </>
    )
}

export default CheckboxComponent