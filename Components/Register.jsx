"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, registerUser } from "../utils/data";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const getUser = async () => {
    const currentUser = await getCurrentUser();
    console.log(currentUser.data);
    if (currentUser.data) {
      router.replace("/");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await registerUser(email, password);
      setMessage("Registration successful! Welcome to todo-app.");
      setTimeout(() => {
        router.push("/");

        window.location.reload(); // Force page to reload after successful login
      }, 2000); // Redirect to login page after 2 seconds
    } catch (error) {
      setMessage(error.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-950 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Register
        </button>
      </form>

      {message && (
        <p className="mt-4 text-blue-950 font-semibold">{message}</p>
      )}
    </div>
  );
};

export default Register;
