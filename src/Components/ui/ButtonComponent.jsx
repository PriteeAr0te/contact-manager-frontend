const ButtonComponent = ({ label = "Submit", type = "submit", width = "full" }) => {
  return (
    <button
      type={type}
      className={`flex ${width ? width : 'w-full'} cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;