import React, { useContext } from "react";
import * as firebase from "firebase/app";
import app from "./base.js";
import { AuthContext } from "./Auth.js";

const Header = () => {

  var provider = new firebase.auth.GoogleAuthProvider();
  const { currentUser } = useContext(AuthContext);

  return (
    <header className="app-header">
      <span className="app-header__logo">
        <img src={ require('./images/logo.png') } width="100"/>
      </span>
      <span className="app-header__login">
        {
          currentUser
            ? <span>Hello, {currentUser.displayName} </span>
            : <span></span>
        }
        {
          currentUser
            ? <a onClick={() => app.auth().signOut()}>Sign out</a>
            : <button onClick={() => app.auth().signInWithPopup(provider)}>Sign in with Google</button>
        }
      </span>
    </header>
  );
};

export default Header;
