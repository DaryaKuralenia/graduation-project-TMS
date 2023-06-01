import React, { useState, useContext } from "react";
import "./LogInPage.scss";
import { UserContext } from "../contexts/UserContext";

const LogInPage = () => {
  const user = {
    login: "dasha",
    password: "123456789",
  };

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const { isSignedIn, setIsSignedIn } = useContext(UserContext);

  const onSubmit = () => {
    if (userEmail === user.login && userPassword === user.password) {
      setIsSignedIn(true);
    }
  };

  return (
    <div className="log-in-container">
      <h1>Log In</h1>
      <h4>
        Please enter your Internet Archive email and password to access your
        Open Library account.
      </h4>
      <form onSubmit={(e) => e.preventDefault()}>
        <h3>Email</h3>
        <input
          type="text"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <h3>Password</h3>
        <input
          type="password"
          placeholder="Enter your password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <input type="submit" value="Log In" onClick={onSubmit} />
      </form>
      <h5>Forgot your password?</h5>
      <h5>
        Not a member of Open Library? <span>Sign up now.</span>
      </h5>
    </div>
  );
};

export default LogInPage;
