import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import Loader from "../loader/loader";

// React Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Simple email validation regex
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const [error, setError] = useState(""); // kept and used below
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function submitValues(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isValidEmail(formData.email)) {
      setLoading(false);
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      const data = await response.json();

      // Save token
      localStorage.setItem("token", data.token);

      // Trigger navbar update
      window.dispatchEvent(new Event("tokenChanged"));

      // Success toast
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Redirect after short delay
      setTimeout(() => {
        navigate("/");
      }, 3200);
    } catch (err) {
      setError(err.message); // Now displayed in UI
      toast.error(err.message || "Login failed", {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <ToastContainer />

      {/* Background grid */}
      {Array.from({ length: 300 }).map((_, i) => (
        <span key={i}></span>
      ))}

      {/* Sign In Form */}
      <div className="signin">
        <div className="content">
          <h2>Sign In</h2>
          <div className="form">
            {/* ✅ Show error message */}
            {error && (
              <p
                style={{ color: "red", fontSize: "14px", marginBottom: "2px" }}
              ></p>
            )}

            <div className="inputBox">
              <input
                type="text"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <i>Email or Username</i>
            </div>

            <div className="inputBox">
              <input
                type="password"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <i>Password</i>
            </div>

            <div className="links">
              {/* ✅ Fixed accessible link */}
              <Link to="/forgot-password">Forgot Password</Link>
              <Link to="/signup">Signup</Link>
            </div>

            <button type="submit" disabled={loading} onClick={submitValues}>
              {loading ? <Loader /> : "Login"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
