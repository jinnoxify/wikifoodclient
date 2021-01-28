import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "../../contextAPI/StateProvider";

function Header({ fav }) {
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();

  let token1 = localStorage.getItem("auth-token");

  const logout = () => {
    history.push("/");
    localStorage.setItem("auth-token", "");
    dispatch({
      type: "SET_USER",
      token: undefined,
      user: undefined,
    });
  };

  useEffect(() => {
    if (!token1) history.push("/");
  }, []);
  return (
    <>
      {fav ? (
        <div>
          <div className="header">
            <Link to="/home">
              <img
                className="header__logo"
                src="https://i.imgur.com/JJ1ET4g.png"
                alt=""
              />
            </Link>
          </div>
          <div className="header__bar">
            <div className="header__right">
              <h4 className="header__titles2">Hello, {user?.username}</h4>
              <Avatar />
            </div>
            <div className="header__titles">
              <Link to="/home">
                <h3 className="header__titles1">Home</h3>
              </Link>
              <Link>
                <h3 className="header__titlesLogout" onClick={logout}>
                  Log out
                </h3>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="header">
            <Link to="/home">
              <img
                className="header__logo"
                src="https://i.imgur.com/JJ1ET4g.png"
                alt=""
              />
            </Link>
          </div>
          <div className="header__bar">
            <div className="header__right">
              <h4 className="header__titles2">Hello, {user?.username}</h4>
              <Avatar />
            </div>
            <div className="header__titles">
              <Link to="/home/profile">
                <h3 className="header__titles1">Profile</h3>
              </Link>
              <Link>
                <h3 className="header__titlesLogout" onClick={logout}>
                  Log out
                </h3>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
