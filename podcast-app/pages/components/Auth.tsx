import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
const Auth = (props: { isLoggedIn: boolean; setLoggedIn: Function }) => {
  const [loginOrSignup, setLoginOrSignUp] = useState("login");

  // Decides which component to display (Login or Signup)
  const displayComponent =
    loginOrSignup === "login" ? (
      <Login
        setLoginOrSignUp={setLoginOrSignUp}
        isLoggedIn={props.isLoggedIn}
        setLoggedIn={props.setLoggedIn}
      />
    ) : (
      <SignUp
        setLoginOrSignUp={setLoginOrSignUp}
        isLoggedIn={props.isLoggedIn}
        setLoggedIn={props.setLoggedIn}
      />
    );
  return <div>{displayComponent}</div>;
};

export default Auth;
