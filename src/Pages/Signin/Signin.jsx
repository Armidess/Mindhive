import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import baseURL from "../../baseURL";import './Signin.css'

const Signin = () => {
  const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();


  const toggleForm = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
    setEmail("");
    };

	const handleLogin = async (e) => {
		// e.preventDefault();
		dispatch(loginStart());
		try {
			const res = await axios.post(
				`
				${baseURL}/auth/signin`,
				{
					username,
					password,
				}
			);
			dispatch(loginSuccess(res.data));
			console.log(res.data);
			navigate("/");
		} catch (err) {
			dispatch(loginFailed());
			alert("Invalid Username Password");
		}
	};

	const handleSignup = async (e) => {
		// e.preventDefault();
		dispatch(loginStart());

		try {
			const res = await axios.post(`${baseURL}/auth/signup`, {
				username,
				email,
				password,
			});
			dispatch(loginSuccess(res.data));
			navigate("/");
		} catch (err) {
			dispatch(loginFailed());
		}
	};

  const handleSubmit = async (e)=>{
    e.preventDefault();
    isLogin ? handleLogin() : handleSignup();
  }


  return (
    <div className="auth-container">
      <div className="content-wrapper">
        <div className="left-section">
          <svg className="green-circle" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="greenGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(139, 195, 74, 0.8)" />
                <stop offset="40%" stopColor="rgba(139, 195, 74, 0.6)" />
                <stop offset="70%" stopColor="rgba(139, 195, 74, 0.3)" />
                <stop offset="100%" stopColor="rgba(139, 195, 74, 0.1)" />
              </radialGradient>
              <filter id="blur">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>
            <circle cx="150" cy="150" r="150" fill="url(#greenGrad)" filter="url(#blur)" />
          </svg>
          
          <div className="welcome-section">
            <div className="welcome-text">Welcome To</div>
            <div className="hive-mind-text">HIVE MIND</div>
          </div>
        </div>

        <div className="auth-form-container">
          <div>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="form-input"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button onClick={handleSubmit} className="submit-btn">
              {isLogin ? 'Log in' : 'Sign up'}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="toggle-text">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="toggle-link" onClick={toggleForm}>
                {isLogin ? 'Sign up' : 'Log in'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;