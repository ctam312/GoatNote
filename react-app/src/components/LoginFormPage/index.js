import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import logo from "../LoginFormPage/Goatnote.png"

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
      <div className="evernote-logo-container">
        <img
          src={logo}
          alt="Evernote Logo"
          className="evernote-logo"
        />
      </div>
        <p className="login-header">Remember everything important.</p>
        <ul className="error-message-list">
          {errors.map((error, idx) => (
            <li key={idx} className="error-message">{error}</li>
          ))}
        </ul>
        <label className="password-label">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
            placeholder="Email"
            required
          />
        </label>
        <label className="password-label">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
            required
          />
        </label>
        <button type="submit" className="login-button">Sign In</button>
        <div className="extra-links-container">
          <a href="/signup" className="forgot-password-link">Don't have an account?</a>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
