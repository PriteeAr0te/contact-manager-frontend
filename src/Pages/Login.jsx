import InputComponent from "../Components/ui/InputComponent";
import ButtonComponent from "../Components/ui/ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hookes/useAuth";
import { useEffect, useState } from "react";
import API from "../lib/api";
import { toast, ToastContainer, Slide } from "react-toastify";
import Logo from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [_, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formErrors, setFormErrors] = useState({})

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const validate = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email ID is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.password)
    ) {
      errors.password = "Incorrect password format.";
    }

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setLoading(true);

    try {
      const response = await API.post("/users/login", formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      login(token, user);
      navigate("/");
      toast.dismiss();
      toast.success("Login Successful! ✅");
    } catch (err) {
      console.log("Login Error: ", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bg-dark-background min-h-screen flex items-center justify-center text-white">
        <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-10 lg:px-8 rounded-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-lg sm:min-w-md">
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
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:w-full sm:max-w-lg sm:min-w-md">
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
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
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  isPassword={true}
                  required
                />
                {formErrors.password && <p className="text-red-600 text-sm mt-2">{formErrors.password}</p>}
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div className="flex items-center justify-center w-full">
                <ButtonComponent
                  width="w-full"
                  label="Sign in"
                />
              </div>

            </form>

            <p className="mt-6 text-center text-gray-200">
              Not a member?{' '}
              <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-100">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
