import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Notification from "./components/Notification";
import Messenger from "./components/Messenger";
import Users from "./components/Users";
import "./App.css";

import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "./mutations";
import { CURRENT_USER, ALL_USERS } from "./queries";

let notifyTimeout;

function App() {
  const [authorization, setAuthorization] = useState(
    window.localStorage.getItem("chat-token")
  );
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const [login, userToken] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
      notify(error.graphQLErrors[0].message, "danger");
    },
  });

  const currentUser = useQuery(CURRENT_USER);
  const allUsernames = useQuery(ALL_USERS);

  //Whenever the data from the server is received, updates the local state to include all Users
  useEffect(()=>{
    if(allUsernames.data){
      setAllUsers(allUsernames.data.allUsers)
    }
  },[allUsernames.data])

  //When the userToken or currentUser are updated, updates the currentUser local state
  useEffect(() => {
    if (currentUser.data) {
      setUser(currentUser.data.me);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.data]);

  //Updates the token when the userToken local state when the token is updated and received
  useEffect(() => {
    if (window.localStorage.getItem("chat-token")) {
      setAuthorization(window.localStorage.getItem("chat-token"));
    }
    if (userToken.called) {
      if (userToken.data) {
        const token = `bearer ${userToken.data.login.value}`;
        setAuthorization(token);
        window.localStorage.setItem("chat-token", token);
        currentUser.refetch()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken.called, userToken.data]);

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
        setUser = {setUser}
        currentUser={user}
        currentUserQuery = {currentUser}
      />
      <Switch>
        <Route path="/users">
          <Users allUsers={allUsers} user={user} setUser={setUser} notify={notify}/>
        </Route>
        <Route path="/">
          <Messenger currentUser={user}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
