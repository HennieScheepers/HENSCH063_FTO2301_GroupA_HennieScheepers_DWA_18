import supabase from "../config/supabaseClient";
import { useState, useEffect, ChangeEvent } from "react";

const SignUp = (props: {
  setLoginOrSignUp: Function;
  isLoggedIn: boolean;
  setLoggedIn: Function;
}) => {
  interface IUser {
    created_at: string;
    id: number;
    password: string;
    username: string;
  }
  const [error, setError] = useState("");
  const [username, setUsername] = useState("" as string);
  const [fetchUsers, setUser] = useState<IUser[] | null>();
  const [password, setPassword] = useState("" as string);
  const [confirmPassword, setConfirmPassword] = useState("" as string);

  // Handles the onChange event for the username and sets it's new state accordingly
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setUsername(value);
  };

  // Handles the onChange event for the password and sets it's state accordingly
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setPassword(value);
  };

  // Handles the onChange event for the confirm password field and sets it's state accordingly
  const handleConfimrPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setConfirmPassword(value);
  };

  // Allows the user to switch between the login and signup pages
  const handleLoginClick = () => {
    props.setLoginOrSignUp("login");
  };

  useEffect(() => {
    const pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );
    const isPasswordSafe = pattern.test(password);

    if (isPasswordSafe) {
      if (password !== confirmPassword) {
        setError("The password provided do not match. Please try again.");
      } else {
        setError("");
      }
    } else {
      setError("Password must contain A-Z, a-z, 0-9, special characters");
    }
  }, [password, confirmPassword]);

  // Handles the logic for the Sign up button and allows the user to create a new account
  const handleSignUpClick = async () => {
    const getUsers = async () => {
      const { data, error } = await supabase.from("user").select();

      if (data) {
        setUser(data);
      } else {
        throw error;
      }
    };
    const doPasswordsMatch = password === confirmPassword ? true : false;

    if (doPasswordsMatch) {
      try {
        const { data, error } = await supabase
          .from("user")
          .insert([{ username: username.toLowerCase(), password: password }])
          .then(props.setLoggedIn(true));
      } catch (error) {
        throw error;
      }
    } else {
      setError("The password provided do not match. Please try again.");
    }
  };
  return (
    <div className="login--main">
      <h1 className="podcast--title">Sign Up</h1>
      <div className="login--container">
        <label className="login--details" htmlFor="username">
          Username:
        </label>
        <input
          className="login--input"
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(event) => handleUsernameChange(event)}
          placeholder="Username"
        />
      </div>
      <div className="login--container">
        <label className="login--details" htmlFor="password">
          Password:
        </label>
        <input
          className="login--input"
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={(event) => handlePasswordChange(event)}
          placeholder="Password"
        />
      </div>
      <div className="login--container">
        <label className="login--details" htmlFor="confirm--password">
          Confirm:{" "}
        </label>
        <input
          className="login--input"
          type="text"
          name="confirm--password"
          id="confirm--password"
          value={confirmPassword}
          onChange={(event) => handleConfimrPasswordChange(event)}
          placeholder="Confirm Password"
        />
      </div>
      <div className="button--container">
        <button className="login--button" onClick={handleLoginClick}>
          Login
        </button>
        OR
        <button className="signup--button" onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>
      <h3 className="podcast--description error">{error}</h3>
    </div>
  );
};

export default SignUp;
