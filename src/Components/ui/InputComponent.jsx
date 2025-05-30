import { useState } from "react";

const InputComponent = ({
  id,
  name,
  value,
  label,
  type = "text",
  placeholder = "",
  theme = "",
  required = false,
  onChange
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <label htmlFor={id} className={`block text-sm/6 font-medium ${theme === "dark" ? "text-white" : " text-gray-900"}`}>
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
          placeholder={placeholder}
          autoComplete={id}
          className={`block w-full rounded-md px-3 py-2.5 text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'} outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"`}
        />
        {isPassword && (
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputComponent;
