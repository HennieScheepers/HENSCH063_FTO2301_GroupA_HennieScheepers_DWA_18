import { useState, ChangeEvent, useEffect, useContext } from "react";
import supabase from "../../public/config/supabaseClient";
import { UserNameContext } from "../index";

const Login = (props: {
  setLoginOrSignUp: Function;
  isLoggedIn: boolean;
  setLoggedIn: Function;
}) => {
  const [error, setError] = useState("");
  interface IUser {
    created_at: string;
    id: number;
    password: string;
    username: string;
  }
  const [fetchUsers, setUsers] = useState<IUser[] | null>([]);
  const [username, setUsername] = useState("" as string);
  const [password, setPassword] = useState("" as string);

  const { globalUserName, setGlobalUsername } = useContext(UserNameContext);

  // Handles the "onChange" event for the username and sets it's new state accordingly
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setUsername(value);
  };

  // Handles the "onChange" event for the password and sets it's new state
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setPassword(value);
  };

  // Handles the event for the sign up button "click". This sets loginOrSignup to tell react what page
  // to display
  const handleSignUpClick = () => {
    props.setLoginOrSignUp("signup");
  };

  // useEffect to fetch the users from supabase
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("user").select();

      if (error) {
        setUsers(null);
        console.error("Could not fetch users");
      }

      if (data) {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  // Handles the onClick even for the login button
  const handleLoginclick = () => {
    if (fetchUsers !== null) {
      for (let i = 0; i < fetchUsers.length; i++) {
        const isCorrectUsername =
          fetchUsers[i].username === username ? true : false;
        const isCorrectPassword =
          fetchUsers[i].password === password ? true : false;
        if (isCorrectUsername) {
          if (isCorrectPassword) {
            setGlobalUsername(username);
            console.log(globalUserName);
            props.setLoggedIn(true);
          } else {
            setError("Username or password is incorrect.");
          }
        } else {
          setError("Username or password is incorrect.");
        }
      }
    }
  };
  return (
    <div className="login--main">
      <h1 className="podcast--title">Login</h1>
      <div className="login--container">
        <label className="login--details" htmlFor="username">
          Username:{" "}
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
          Password:{" "}
        </label>
        <input
          className="login--input"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(event) => handlePasswordChange(event)}
          placeholder="Password"
        />
      </div>
      <div className="button--container">
        <button className="login--button" onClick={handleLoginclick}>
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

export default Login;
