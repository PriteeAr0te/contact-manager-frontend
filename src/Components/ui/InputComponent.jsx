import { useState, useEffect } from "react";

const InputComponent = ({
  id,
  name,
  value,
  label,
  type = "text",
  placeholder = "",
  theme = "",
  required = false,
  onChange,
  isPassword = false,
  disabled
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ label: "", level: 0, color: "" });

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  useEffect(() => {
    if (isPassword) {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
  }, [value]);

  function checkPasswordStrength(password) {
    if (!password) return { label: "", level: 0, color: "" };

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const length = password.length;

    let score = 0;
    if (hasLower) score += 1;
    if (hasUpper) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;
    if (length >= 8) score += 1;

    if (score <= 2) return { label: "Weak", level: 30, color: "bg-red-500" };
    if (score === 3 || score === 4) return { label: "Medium", level: 60, color: "bg-yellow-500" };
    return { label: "Strong", level: 100, color: "bg-green-600" };
  }

  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-base font-medium dark:text-white ${theme === "dark" ? "text-white" : "text-gray-900"
          }`}
      >
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          id={id}
          name={name}
          onChange={onChange}
          type={inputType}
          value={value}
          required={required}
          disabled={!!disabled}
          placeholder={placeholder}
          autoComplete={id}
          className={`block w-full rounded-md px-3 py-2.5 text-base dark:text-gray-200 ${theme === "dark" ? "text-gray-200" : "text-gray-900"
            } outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 ${disabled ? "cursor-not-allowed opacity-60" : ""
            } focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
        />
        {disabled && (
          <span className="absolute inset-y-0 right-2 flex items-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            {/* Your SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#9ca3af"
            >
              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z" />
            </svg>
          </span>
        )}
        {isPassword && (
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ?
              <><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg></>
              :
              <><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg></>}
          </span>
        )}
      </div>

      {/* Password Strength Progress Bar */}
      {isPassword && passwordStrength.label && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className={`h-2 rounded ${passwordStrength.color}`}
              style={{ width: `${passwordStrength.level}%` }}
            ></div>
          </div>
          <p className="mt-1.5 text-base font-medium text-gray-300 dark:text-gray-300">
            Strength: {passwordStrength.label}
          </p>
        </div>
      )}
    </div>
  );
};

export default InputComponent;
