import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import ErrorNot from "../../components/LoginError";
import { useStateValue } from "../../contextAPI/StateProvider";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function SignUp() {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState();

  const login = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, username };
      await axios.post("http://localhost:9000/users/signup", newUser);
      const login = await axios.post("http://localhost:9000/users/signin", {
        email,
        password,
      });

      dispatch({
        type: "SET_USER",
        user: login.data.user,
        token: login.data.token,
      });
      localStorage.setItem("auth-token", login.data.token);

      history.push("/home");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="login">
      <h1 className="home__title">Wiki Food</h1>

      <div className="login__container">
        <h1>Sign Up</h1>
        {error && <ErrorNot msg={error} clear={() => setError(undefined)} />}
        <form>
          <div className="input__container">
            <AccountCircleIcon className="input__icon" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="signup__input"
              placeholder="Username"
            />
          </div>
          <div className="input__container">
            <EmailIcon className="input__icon" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="signup__input"
              placeholder="Email"
            />
          </div>
          <div className="input__container">
            <LockIcon className="input__icon" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="signup__input"
              placeholder="Password"
            />
          </div>
          <div className="input__container">
            <LockIcon className="input__icon" />
            <input
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              type="password"
              className="signup__input"
              placeholder="Confirm Password"
            />
          </div>

          <button
            onClick={signup}
            type="submit"
            className="login__signInButton"
          >
            Sign Up
          </button>
        </form>
        <p>If you signed up already, please sign in</p>
        <button onClick={login} className="login__registerButton">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignUp;
