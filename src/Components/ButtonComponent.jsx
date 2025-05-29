const ButtonComponent = ({ label = "Submit", type = "submit", width = "full" }) => {
  return (
    <button
      type={type}
      className={`flex ${width ? width : 'w-full'} justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;