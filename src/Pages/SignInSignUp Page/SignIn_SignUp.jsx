import React, { useState, useEffect } from "react";
import "./SignIn_SignUp.scss";
import swal from "sweetalert";
import PIC from "../../../src/user.png";
import {
  signInWithGoogle,
  auth,
  createUserProfileDocument,
} from "../../Firebase/firebase.utils";
import Swal from "@sweetalert/with-react";
import { useHistory } from "react-router-dom";
const SignIn_SignUp = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signup_password, set_signup_password] = useState("");
  const [signup_username, set_signup_username] = useState("");
  const [signup_email, set_signup_email] = useState("");
  const history = useHistory();
  let SignUpbtn = () => {
    let x = document.getElementById("SignIn");
    let y = document.getElementById("SignUp");
    let z = document.getElementById("btn");
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "130px";
  };
  let SignInbtn = () => {
    let x = document.getElementById("SignIn");
    let y = document.getElementById("SignUp");
    let z = document.getElementById("btn");
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
  };
  let reDirectToHome = () => {
    history.push("/");
  };

  let handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        signup_email,
        signup_password
      );
      await createUserProfileDocument(user, { signup_username });

      reDirectToHome();
      Swal(
        <div
          style={{
            backgroundImage: `url(${PIC})`,
            backgroundSize: "100% 100%",
          }}
        >
          <h2>
            WElC😍ME <h1>{signup_username.toUpperCase()}</h1>
          </h2>
          <p>Now you can acces all features</p>
        </div>
      );
      set_signup_password("");
      set_signup_email("");

      set_signup_username("");
    } catch (err) {
      alert("something went wrong" + err.message);
    }
  };
  let handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      reDirectToHome();
      Swal(
        <div
          style={{
            backgroundImage: `url(${PIC})`,
            backgroundSize: "100% 100%",
          }}
        >
          <h2>
            WElC😍ME <h3>{email}</h3>
          </h2>
          <p>Now you can acces all features</p>
        </div>
      );
      setEmail("");
      setPassword("");
    } catch (err) {
      Swal(
        <div>
          <h4>
            <i class="fas fa-user-lock"></i> Please check your Enteries
            <i class="fas fa-key"></i>
          </h4>
          <h6 style={{ color: "#ff6b6b" }}>
            Either{" "}
            <b>
              <u>Email</u>
            </b>{" "}
            or{" "}
            <b>
              <u>Password</u>{" "}
            </b>{" "}
            is Wrong
          </h6>
        </div>
      );
    }
  };

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <div className="buttonBox">
          <div id="btn"></div>
          <button onClick={SignInbtn} className="toggle_btn">
            Sign In
          </button>
          <button onClick={SignUpbtn} className="toggle_btn">
            Sign Up
          </button>
        </div>
        <form id="SignIn" onSubmit={handleSignIn}>
          <input
            className="input"
            type="email"
            name="useremail"
            id="useremail"
            placeholder="Enter em@il Id "
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="handle">
            <input
              className="inputcheck"
              type="checkbox"
              name="remember-password"
              id="remember-password"
            />
            &nbsp; <span style={{ fontSize: "13px" }}>Remember Password</span>{" "}
          </div>
          <button className="buttonss" type="submit">
            Login
          </button>
          <div
            style={{
              margin: "auto",
            }}
            className='or'
          >
            or{" "}
          </div>
          <button onClick={signInWithGoogle} className="googlebtn ">
            Google{" "}
            <i
              style={{ padding: "2px 3px",fontSize:"20px" }}
              class="fab fa-google-plus-square"
            ></i>
          </button>
        </form>
        <form id="SignUp" onSubmit={handleSignUp}>
          <input
            className="input"
            type="email"
            name="useremail"
            id="signup_email"
            placeholder=" Enter em@il  Id"
            required
            value={signup_email}
            onChange={(e) => {
              set_signup_email(e.target.value);
            }}
          />
          <input
            className="input"
            type="text"
            name="signup_username"
            id="signup_username"
            placeholder="Enter UserName"
            required
            value={signup_username}
            onChange={(e) => {
              set_signup_username(e.target.value);
            }}
          />
          <input
            className="input"
            type="password"
            name="signup-password"
            id="signup_password"
            placeholder="Enter Password"
            required
            value={signup_password}
            onChange={(e) => {
              set_signup_password(e.target.value);
              console.log(signup_password);
            }}
          />
          <div className="handle">
            <input
              className="inputcheck"
              type="checkbox"
              name="remember-password"
              id="remember-password"
              required
            />
            <span className="span">I agree to the terms and condition</span>{" "}
          </div>
          <button className="buttonss" type="submit">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn_SignUp;
