import React from 'react'

const TextareaComponent = ({ label, name, id, value, onChange }) => {
    return (
        <>
            <label htmlFor={id} className="block text-base font-medium dark:text-white text-gray-900 ">
                {label}
            </label>
            <div className="mt-2">
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    autoComplete={name}
                    onChange={onChange}
                    rows={3}
                    placeholder={label}
                    required={false}
                    className="block w-full rounded-md bg-white dark:bg-transparent px-3 py-1.5 text-base dark:text-white text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
        </>
    )
}

export default TextareaComponent