import "./app.scss";
import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/home/";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import { useStateValue } from "./contextAPI/StateProvider";
import Profile from "./pages/profile";

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    const logInCheck = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:9000/users/isToken",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:9000/users", {
          headers: { "x-auth-token": token },
        });
        dispatch({
          type: "SET_USER",
          user: userRes.data,
          token,
        });
      }
    };
    logInCheck();
  }, []);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/home/profile" component={Profile} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/home" component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
