import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Notification from "./components/Notification";
import Messenger from "./components/Messenger";
import Users from "./components/Users";
import "./App.css";

import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { LOGIN } from "./mutations";
import { CURRENT_USER, USER_NUMBERS } from "./queries";

let notifyTimeout;

function App() {
  const [authorization, setAuthorization] = useState(
    window.localStorage.getItem("chat-token")
  );

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [login, userToken] = useMutation(LOGIN);
  const currentUser = useQuery(CURRENT_USER);

  const [testQuery, testData] = useLazyQuery(CURRENT_USER);
  const [testNumber, numberOfUsers] = useLazyQuery(USER_NUMBERS);

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
          login={login}
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
        currentUser={currentUser}
      />
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Messenger />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
