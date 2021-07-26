import React, { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Notification from "./components/Notification";
import { Switch, Route } from "react-router-dom";

let notifyTimeout;

function App() {
  const [authenication, setAuthentication] = useState(
    localStorage.getItem("chat-token")
  );

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const notify = (message, variant) => {
    setMessage(message);
    setVariant(variant);
    clearTimeout(notifyTimeout)
    notifyTimeout = setTimeout(() => {
      setMessage("");
      setVariant("");
    }, 5000);
  };

  if (authenication === null) {
    return (
      <div>
        <Navbar />
        <Notification message={message} variant={variant} />
        <Switch>
          <Route path="/signup">
            <SignUp notify={notify}/>
          </Route>
          <Route path="/login">
            <div className="container">
              <Login notify={notify}/>
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
