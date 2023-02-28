import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import logo from "../LoginFormPage/Goatnote.png"

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="signup-form-page">
      <form onSubmit={handleSubmit} className="signup-form">
      <div className="evernote-logo-container">
        <img
          src={logo}
          alt="Evernote Logo"
          className="evernote-logo"
          />
      </div>
          <p>Remember everything important.</p>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <input
            type="email"
            placeholder="Enter an Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-inputs"
            maxLength="50"
          />
        </label>
        <label>
          <input
            type="text"
            value={username}
            placeholder="Enter a Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-inputs"
            maxLength="20"
            minLength="5"
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            placeholder="Enter a Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength="20"
            minLength="5"
            className="signup-inputs"
          />
        </label>
        <label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            maxLength="20"
            minLength="5"
            className="signup-inputs"
          />
        </label>
        <button type="submit">Sign Up</button>
        <div className="extra-links-container">
          <a href="/login" className="forgot-password-link">Already have an account?</a>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
