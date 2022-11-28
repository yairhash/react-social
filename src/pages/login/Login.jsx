import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../api-calls/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const { isFetching, dispatch } = useContext(AuthContext);
  const handleForm = async (e) => {
    e.preventDefault();
    const res = await loginCall(
      { email: emailRef.current.value, password: passwordRef.current.value },
      dispatch
    );
    if (!res) {
      console.log("somting went wrong");
    } else {
      navigate("/");
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
          <form className="loginBox" onSubmit={handleForm}>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              className="loginInput"
              required
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="loginInput"
              required
              minLength="6"
            />
            <button type="submit" className="loginButton">
              {isFetching ? <CircularProgress color="inherit" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
