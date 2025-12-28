import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Track logged-in user info
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // 🔹 Helper to decode JWT from token string
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  // 🔹 Check for token in localStorage and decode it
  useEffect(() => {
    const updateUserFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = decodeJWT(token);
        if (decoded) {
          setUser({
            firstName: decoded.sub,
            profilePicUrl: "/default-profile.png",
          });
        }
      } else {
        setUser(null);
      }
    };

    // Run at mount
    updateUserFromToken();

    // Listen for custom event
    window.addEventListener("tokenChanged", updateUserFromToken);

    return () => {
      window.removeEventListener("tokenChanged", updateUserFromToken);
    };
  }, []);

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    navigate("/"); // redirect to home
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 🔹 Profile dropdown for desktop
  const renderProfileDropdown = () => (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setDropdownOpen((o) => !o)}
      >
        <img
          src={user.profilePicUrl || "/default-profile.png"}
          alt="profile"
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            marginRight: 8,
            objectFit: "cover",
          }}
        />
        <span className="text-white font-semibold mr-2">{user.firstName}</span>
        <svg
          width={12}
          height={12}
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-white"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 
            1 0 111.414 1.414l-4 4a1 1 0 
            01-1.414 0l-4-4a1 1 0 
            010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {dropdownOpen && (
        <ul
          className="absolute right-0 mt-2 w-40 bg-white rounded shadow-md py-2 z-50"
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <li>
            <button
              className="block px-4 py-2 w-full text-left text-black hover:bg-gray-100"
              onClick={() => {
                setDropdownOpen(false);
                navigate("/profile");
              }}
            >
              My Profile
            </button>
          </li>
          <li>
            <button
              className="block px-4 py-2 w-full text-left text-black hover:bg-gray-100"
              onClick={() => {
                setDropdownOpen(false);
                navigate("/favourites");
              }}
            >
              My Fav
            </button>
          </li>
          <li>
            <button
              className="block px-4 py-2 w-full text-left text-black hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );

  return (
    <nav className="relative bg-black dark:bg-gray-900 border-b-4 border-logoColor">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-20 relative">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={"/Notes-Hub transparent.png"}
            className="h-16"
            alt="notes"
          />
        </Link>

        {/* Center: Nav Links */}
        <ul className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <li>
            <Link
              to="/"
              className="text-white hover:text-logoColor font-extrabold text-base"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/school"
              className="text-white hover:text-logoColor font-extrabold text-base"
            >
              School
            </Link>
          </li>
          <li>
            <Link
              to="/college"
              className="text-white hover:text-logoColor font-extrabold text-base"
            >
              College
            </Link>
          </li>
          <li>
            <Link
              to="/Compitative"
              className="text-white hover:text-logoColor font-extrabold text-base"
            >
              Competitive
            </Link>
          </li>
        </ul>

        {/* Right Side — Show either Login or Profile dropdown */}
        <div className="hidden md:flex items-center">
          {!user ? (
            <Link
              to="/login"
              className="bg-logoColor text-black font-bold px-4 py-2 rounded hover:bg-opacity-90 hover:bg-black hover:text-white transition hover:shadow-[0_0_10px_2px_white]"
            >
              Login
            </Link>
          ) : (
            renderProfileDropdown()
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-400 hover:text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-2 text-white">
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-logoColor font-extrabold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/school"
                className="block py-2 hover:text-logoColor font-extrabold"
              >
                School
              </Link>
            </li>
            <li>
              <Link
                to="/college"
                className="block py-2 hover:text-logoColor font-extrabold"
              >
                College
              </Link>
            </li>
            <li>
              <Link
                to="/Compitative"
                className="block py-2 hover:text-logoColor font-extrabold"
              >
                Competitive
              </Link>
            </li>

            {!user ? (
              <li>
                <Link
                  to="/login"
                  className="block py-2 hover:text-logoColor font-extrabold"
                >
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <button
                    className="block w-full py-2 text-left hover:text-logoColor font-extrabold"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/profile");
                    }}
                  >
                    My Profile
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full py-2 text-left hover:text-logoColor font-extrabold"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/favourites");
                    }}
                  >
                    My Fav
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full py-2 text-left hover:text-logoColor font-extrabold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
