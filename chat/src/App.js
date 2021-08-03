import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Notification from "./components/Notification";
import Messenger from "./components/Messenger";
import "./App.css";

import { useMutation } from "@apollo/client";
import { LOGIN } from "./mutations";

let notifyTimeout;

function App() {
  const [authorization, setAuthorization] = useState(
    window.localStorage.getItem("chat-token")
  );
  console.log(authorization);

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [login, userToken] = useMutation(LOGIN);

  useEffect(() => {
    if (window.localStorage.getItem("chat-token")) {
      setAuthorization(window.localStorage.getItem("chat-token"));
    }
    if (userToken.data && !userToken.loading) {
      const token = `bearer ${userToken.data.login.value}`;
      setAuthorization(token);
      window.localStorage.setItem("chat-token", token);
    }
  }, [userToken.data, userToken.loading]);

  const notify = (message, variant) => {
    setMessage(message);
    setVariant(variant);
    clearTimeout(notifyTimeout);
    notifyTimeout = setTimeout(() => {
      setMessage("");
      setVariant("");
    }, 5000);
  };

  if (!authorization) {
    return (
      <div className="app">
        <Navbar
          authorization={authorization}
          setAuthorization={setAuthorization}
        />
        <Notification message={message} variant={variant} />
        <Switch>
          <Route path="/signup">
            <SignUp notify={notify} />
          </Route>
          <Route path="/login">
            <div className="container">
              <Login notify={notify} login={login} />
            </div>
          </Route>
          <Route path="/">
            <div className="container">
              <Login notify={notify} login={login} />
            </div>
          </Route>
        </Switch>
      </div>
    );
  }

  return (
    <div className="app full-height">
      <Navbar
        authorization={authorization}
        setAuthorization={setAuthorization}
      />
      <Switch>
        <Route path="/">
          <Messenger />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
