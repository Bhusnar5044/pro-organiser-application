import React from "react";
import Style from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import { auth } from "../../Firebase/firebase.utils";
import swal from "sweetalert";
const NavBar = ({ currentUser }) => {
  let handleSignOut = () => {
    swal({
      title: "Are you sure?",
      text: " Do you Want to Sign Out??",
      icon: "warning",
      buttons: ["NO!", "YES!"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        auth.signOut();
      } else {
        return;
      }
    });
  };
  return (
    <div className={Style.container}>
      <h2 className={Style.brand}>
        Pro-Organizer
      </h2>
      <ul>
        <NavLink
          to="/"
          exact
          activeClassName={Style.active}
          style={{ textDecoration: "none" }}
        >
          <li
            onClick={() => {
              !currentUser &&
                swal(
                  "You haven't Signed In!",
                  "Please Sign In with registered Email or with Google",
                  "info"
                );
            }}
            className={Style.item1}
          >
            HOME
          </li>
        </NavLink>
        <NavLink
          to="/createboard"
          activeClassName={Style.active}
          style={{ textDecoration: "none" }}
        >
          <li
            onClick={() => {
              !currentUser &&
                swal(
                  "You haven't Signed In!",
                  "Please Sign In with registered Email or with Google",
                  "info"
                );
            }}
          >
            CREATE BOARD
          </li>
        </NavLink>
        {currentUser ? (
          <li onClick={handleSignOut}>SIGN OUT</li>
        ) : (
          <NavLink
            to="/signin"
            exact
            activeClassName={Style.active}
            style={{ textDecoration: "none" }}
          >
            <li className={Style.item1}>SIGN IN</li>
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
