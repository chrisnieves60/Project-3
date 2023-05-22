import React, { useEffect, useState } from "react";
import { loginUser } from "../utils/data";
import { getCurrentUser } from "../utils/data";
import { useRouter } from "next/navigation";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(undefined);

  const router = useRouter();

  const getUser = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser.success) {
      setError(currentUser.error);
      return;
    }

    if (!currentUser.data) {
      setUser(null);
      return;
    }
    if (currentUser) {
      setTimeout(() => {
        router.push("/");

        window.location.reload(); // Force page to reload after successful login
      }, 2000); // Redirect to login page after 2 seconds
    }
    setUser(currentUser.data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await loginUser(email, password);
      const currentUser = await getCurrentUser();

      if (currentUser.data) {
        setMessage("Login successful!");
        getUser();
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>

          {user && (
            <div className="mt-2 text-sm text-center text-blue-950">
              <p>Logged in as:</p>
              <p>Email: {user.email}</p>
            </div>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-2 text-center text-sm text-blue-950">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
