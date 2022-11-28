import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
const Register = () => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordAgainRef = useRef(null);
  const currentCityRef = useRef(null);
  const originallyFromRef = useRef(null);
  const relationshipRef = useRef(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (passwordAgainRef.current.value !== passwordRef.current.value) {
      setIsError(true);
    } else {
      const user = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        passwordAgain: passwordAgainRef.current.value,
        city:currentCityRef.current.value,
        from:originallyFromRef.current.value,
        relationship:relationshipRef.current.value,
      };
      try {
        await axios.post("http://localhost:8800/api/auth/register", user);
        navigate("/login");
      } catch (err) {
        throw err;
      }
      setIsError(false);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleRegister}>
            <input
              ref={usernameRef}
              placeholder="Username"
              className="loginInput"
              type="text"
              required
            />
            <input
              ref={emailRef}
              placeholder="Email"
              className="loginInput"
              type="email"
              required
            />
            <input
              ref={passwordRef}
              placeholder="Password"
              className="loginInput"
              type="password"
              required
              minLength="6"
            />
            <input
              ref={passwordAgainRef}
              placeholder="Password Again"
              className="loginInput"
              type="password"
              required
            />
            <input
              ref={currentCityRef}
              placeholder="Current city"
              className="loginInput"
              type="text"
              required
            />
            <input
              ref={originallyFromRef}
              placeholder="Originally from"
              className="loginInput"
              type="text"
              required
            />
            <input
              ref={relationshipRef}
              placeholder="Relationship"
              className="loginInput"
              type="text"
              required
            />
            <span className="error">
              {isError && "Passwords don't match.Please try agian"}
            </span>
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="loginRegisterButton"
            >
              Log into Account{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
