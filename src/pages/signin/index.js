import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import { useStateValue } from "../../contextAPI/StateProvider";
import ErrorNot from "../../components/LoginError";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";

function SignIn() {
  const history = useHistory();
  const [{}, dispatch] = useStateValue();
  const [error, setError] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post("http://localhost:9000/users/signin", {
        email,
        password,
      });
      dispatch({
        type: "SET_USER",
        user: loginRes.data.user,
        token: loginRes.data.token,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/home");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const signup = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  return (
    <div className="login">
      <h1 className="home__title">Wiki Food</h1>

      <div className="login__container">
        <h1>Sign in</h1>
        {error && <ErrorNot msg={error} clear={() => setError(undefined)} />}
        <form>
          <div className="input__container">
            <EmailIcon className="input__icon" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="signin__input"
              placeholder="Email"
            />
          </div>
          <div className="input__container">
            <LockIcon className="input__icon" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="signin__input"
              placeholder="Password"
            />
          </div>

          <button onClick={login} type="submit" className="login__signInButton">
            Log In
          </button>
        </form>
        <button onClick={signup} className="login__registerButton">
          Create your account
        </button>
      </div>
    </div>
  );
}

export default SignIn;
