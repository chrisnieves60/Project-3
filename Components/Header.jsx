"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, logout } from "../utils/data";
import { useState, useEffect } from "react";
import Logo from "../images/tasks.png";
import Image from "next/image";
import "../app/globals.css";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    await logout();
    setUser(null); // Update the user state to null after logout
    setIsLoggedIn(false);
  };

  useEffect(() => {
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

      setIsLoggedIn(true); // Update the login status
      setUser(currentUser.data);
    };
    getUser(); // Call the function to fetch the user data when the component mounts
  }, []);

  return (
    <nav className="flex items-center justify-between p-6 bg-blue-950 sticky top-0">
      <div className="text-white">
        <Link href="/">
          <Image src={Logo} width="35" alt="Logo" className="h-8" />
        </Link>
      </div>
      <div className="flex space-x-4">
        {isLoggedIn ? ( // Conditionally render the user's name if a user is logged in
          <span className="text-white flex flex-row">
            <p className="px-3">{user.email}</p>
            <button onClick={handleLogout} className="mr-2">
              Logout
            </button>
            <Link href={`/user/${user.id}/lists`}>myLists</Link>
          </span>
        ) : (
          <>
            <Link
              href="/register"
              className={`text-white hover:text-blue-300 ${
                router.pathname === "/register" ? "underline" : ""
              }`}
            >
              Register
            </Link>
            <Link
              href="/login"
              className={`text-white hover:text-blue-300 ${
                router.pathname === "/login" ? "underline" : ""
              }`}
            >
              Login
            </Link>
          </>
        )}
        <Link
          href="/lists"
          className={`text-white hover:text-blue-300 ${
            router.pathname === "/login" ? "underline" : ""
          }`}
        >
          Lists
        </Link>
      </div>
    </nav>
  );
};

export default Header;
