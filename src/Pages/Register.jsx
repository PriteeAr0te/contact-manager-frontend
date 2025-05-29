import InputComponent from "../Components/InputComponent";
import ButtonComponent from "../Components/ButtonComponent";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../lib/api";

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  }

  const validate = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.username)) {
      errors.username = "Only letters and spaces allowed."
    }

    if (!formData.email.trim()) {
      errors.email = "Email ID is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required"
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.password)
    ) {
      errors.password = "Password must be 8+ chars, include uppercase, lowercase, number & special char";
    }

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return
    }

    try {
      const response = await API.post("users/register", formData);
      console.log(response)
      toast.success("Registration Successfull");
      navigate("/");
    } catch (err) {
      console.log("Registration Error: ", err);
      setError(err.response?.data?.message || "Something went wrong");
    }

  }

  return (
    <>
      <ToastContainer position="top-right" transition={Slide} className="z-50" autoClose={6000} closeButton={true} pauseOnHover={true} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8 bg-white rounded-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-md min-w-md">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-w-md">
          <form className="space-y-6 text-left" onSubmit={handleSubmit} >
            <div>
              <InputComponent
                id="name"
                name="username"
                label="Full Name"
                required
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
              {formErrors.username && <p className="text-red-600 text-sm mt-2">{formErrors.username}</p>}
            </div>

            <div>
              <InputComponent
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && <p className="text-red-600 text-sm mt-2">{formErrors.email}</p>}
            </div>

            <div>
              <InputComponent
                id="password"
                name="password"
                value={formData.password}
                label="Password"
                type="password"
                isPassword={true}
                onChange={handleChange}
                required />
              {formErrors.password && <p className="text-red-600 text-sm mt-2">{formErrors.password}</p>}
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <ButtonComponent
              label="Register"
              type="submit"
            />

          </form>

          <p className="mt-6 text-center text-sm/6 text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-700 hover:text-indigo-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
