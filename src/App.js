import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Homepage from "./Pages/Homepage/Homepage";
import Board_Page from "./Pages/CreateBoardPage/Board_Page";
import MyBoard_Page from "./Pages/IndividualBoardPage/MyBoard";
import SignIn_SignUp_Page from "./Pages/SignInSignUp Page/SignIn_SignUp";
import { auth, createUserProfileDocument } from "./Firebase/firebase.utils"; //so that our appn listens to user state changes from firebase

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  let unSubscribeFromAuth = null;
  useEffect(() => {
    unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // setCurrentUser(user);
      // createUserProfileDocument(user);
      // console.log(user);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          // console.log(snapShot.data());
          setCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
    return () => {
      console.log("it works as component will unmount.");
      unSubscribeFromAuth(); //it will close the subscription
    };
  }, []);
  console.log(currentUser);
  return (
    <div className="App">
      <NavBar currentUser={currentUser} />
      <Switch>
        {/* <Route path="/signin" component={SignIn_SignUp_Page} /> */}
        <Route
          path="/"
          exact
          render={() =>
            <Homepage />
            // currentUser ? <Homepage /> : <Redirect to="/signin" />
          }
        />
        <Route
          path="/createboard"
          exact
          strict
          render={() =>
            <Board_Page />
            // currentUser ? <Board_Page /> : <Redirect to="/signin" />
          }
        />
        <Route
          path="/:boardName"
          render={() =>
            <MyBoard_Page />
            // currentUser ? <MyBoard_Page /> : <Redirect to="/signin" />
          }
        />
      </Switch>
    </div>
  );
};
export default App;
