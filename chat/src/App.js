import React, { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Notification from "./components/Notification";
import { Switch, Route } from "react-router-dom";

function App() {
  const [authenication, setAuthentication] = useState(
    localStorage.getItem("chat-token")
  );

  if (authenication === null) {
    return (
      <div>
        <Navbar />
        <Notification/>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <div className="container">
              <Login />
            </div>
          </Route>
          <Route path="/">
            <div className="container">
              <Login />
            </div>
          </Route>
        </Switch>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <div className="container">
            <Login />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
