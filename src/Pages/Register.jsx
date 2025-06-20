import InputComponent from "../Components/ui/InputComponent";
import ButtonComponent from "../Components/ui/ButtonComponent";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../lib/api";
import Logo from '../assets/logo.png';

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
      const response = await API.post("/users/register", formData);
      console.log(response)
      navigate("/");
      toast.success("Registration Successfull ✅");
    } catch (err) {
      console.log("Registration Error: ", err);
      setError(err.response?.data?.message || "Something went wrong");
    }

  }

  return (
    <div className="bg-dark-background min-h-screen flex items-center justify-center text-white">

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8 rounded-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-md min-w-md">
          <div className="flex-shrink-0 flex items-center w-full justify-center mb-3">
            <img
              className="h-8 w-auto"
              width={200}
              height={60}
              src={Logo}
              alt="TalentDeck Logo"
            />
            <span className="ml-2 font-bold sm:text-lg text-white">Contact Book</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-w-md">
          <form className="space-y-6 text-left" onSubmit={handleSubmit} >
            <div>
              <InputComponent
                theme="dark"
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
                theme="dark"
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
                theme="dark"
                id="password"
                name="password"
                value={formData.password}
                label="Password"
                type="password"
                isPassword={true}
                onChange={handleChange}
                required
              />
              {formErrors.password && <p className="text-red-600 text-sm mt-2">{formErrors.password}</p>}
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex items-center justify-center w-full">
              <ButtonComponent
                width="w-full"
                label="Register"
                type="submit"
              />
            </div>

          </form>

          <p className="mt-6 text-center text-gray-200">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-100">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
