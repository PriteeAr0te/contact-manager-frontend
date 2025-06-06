import { useEffect, useRef, useState } from "react";

function DropdownComponent({
    name = "Dropdown",
    options = [],
    isLabel = true,
    selectedValue,
    onChange = () => { },
    showSearch = false,
    label = "Select Option"
}) {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredOptions(options);
        } else {
            setFilteredOptions(
                options.filter((opt) =>
                    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, options]);

    const handleSelect = (value) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <div>
            {isLabel &&
                <label className="block text-base font-medium mb-1 dark:text-white text-gray-900">{label}</label>
            }
            <details ref={dropdownRef} open={isOpen} className="relative">
                <summary
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen((prev) => !prev);
                    }}
                    className="cursor-pointer py-2.5 border border-[#D0D5DD] dark:border-gray-200 dark:focus:border-0 rounded-lg text-gray-900 dark:text-white dark:bg-dark-background flex justify-between items-center px-4 focus:outline-1 focus:outline-indigo-600"
                >
                    <span>
                        {
                            options.find(opt => opt.value === selectedValue)?.label ||
                            selectedValue ||
                            `Select ${name}`
                        }
                    </span>
                    <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                    </span>
                </summary>

                <div className="border border-[#D0D5DD] rounded-lg py-2 mt-2 max-h-[200px] absolute w-full top-11 bg-white dark:bg-dark-background shadow-md overflow-y-auto dark:border-gray-200 dark:text-white">
                    {showSearch && (
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            name={name}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="py-2 mb-4 w-full rounded border border-primary dark:bg-dark-background dark:text-white dark:border-gray-200"
                        />
                    )}
                    <ul className="list-none p-0 m-0">
                        {filteredOptions.map((item) => (
                            <li
                                key={item.value}
                                className="p-2 w-full hover:bg-background-hover cursor-pointer dark:text-white dark:bg-dark-background text-base"
                                onClick={() => handleSelect(item.value)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </details>
        </div>
    );
}

export default DropdownComponent;
