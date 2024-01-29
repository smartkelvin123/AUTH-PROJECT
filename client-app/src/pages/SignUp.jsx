import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-9">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex  flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          name="username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg  uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "sign up"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>have an account ?</p>
        <Link to="/sign-In">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
    </div>
  );
};

export default SignUp;
