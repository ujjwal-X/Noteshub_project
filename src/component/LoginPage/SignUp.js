import axios from "axios";
import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      };

      await axios.post(`${API_BASE_URL}/api/auth/signup`, payload);

      // Show success toast
      toast.success("Signup successful! Please login", {
        position: "top-right",
        autoClose: 3000,
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect after toast
      setTimeout(() => {
        navigate("/login");
      }, 3200);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong.";
      setError(message);
      // Show error toast
      toast.error(message, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <ToastContainer /> {/* Toast notification container */}
      {/* Background grid */}
      {Array.from({ length: 300 }).map((_, i) => (
        <span key={i}></span>
      ))}
      {/* Sign Up Form */}
      <div className="signin">
        <div className="content">
          <h2>Sign Up</h2>

          <div className="form">
            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <div className="inputBox">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <i>Full Name</i>
            </div>

            <div className="inputBox">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <i>Email</i>
            </div>

            <div className="inputBox">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <i>Username</i>
            </div>

            <div className="inputBox">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i>Password</i>
            </div>

            <div className="inputBox">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <i>Confirm Password</i>
            </div>

            <div className="links">
              <Link to="/login">Already have an account? Login</Link>
            </div>

            <div className="inputBox">
              <input
                type="submit"
                value={loading ? "Registering..." : "Register"}
                onClick={handleSubmit}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
