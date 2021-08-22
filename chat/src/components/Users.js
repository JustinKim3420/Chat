import React, { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";

import { ADD_FRIEND, DELETE_FRIEND } from "../mutations";
import { useMutation } from "@apollo/client";

const Users = ({ allUsers, user, notify }) => {
  const [linkedUsers, setLinkedUser] = useState([]);

  const [addFriend, userAfterAdd] = useMutation(ADD_FRIEND, {
    onError: (error) => {
      console.log(error.graphQLErrors);
      notify(error.graphQLErrors[0].message, "danger");
    },
  });

  //Deletes friend and the messages sent.
  const [deleteFriend, userAfterDelete] = useMutation(DELETE_FRIEND, {
    onError: (error) => {
      console.log(error.graphQLErrors);
      notify(error.graphQLErrors[0].message, "danger");
    },
  });

  const handleAddClick = (event, friendUsername) => {
    event.preventDefault();
    const newLinkedUserList = linkedUsers.concat(friendUsername);
    setLinkedUser(newLinkedUserList);
    addFriend({ variables: { friendUsername } });
  };

  const handleDeleteClick = (event, friendUsername) => {
    event.preventDefault();
    const newLinkedUserList = linkedUsers.filter(
      (username) => username !== friendUsername
    );
    setLinkedUser(newLinkedUserList);
    deleteFriend({ variables: { friendUsername } });
  };

  useEffect(() => {
    if (user.linked) {
      if (user.linked.length > 0) {
        const linkedUsers = user.linked.map((linkedUser) => {
          return linkedUser.user.username;
        });
        setLinkedUser(linkedUsers);
      }
    }
  }, [user]);

  return (
    <div className="container">
      <ListGroup>
        {
          //allUsers is the saved state from the query of getting all the users.
          allUsers.map((userFromList) => {
            if (userFromList.username === user.username) {
              return null;
            }
            //linkedUsers is a list of the usernames that are linked with the current user.
            if (linkedUsers.includes(userFromList.username)) {
              return (
                <ListGroup.Item
                  key={userFromList.username}
                  className="flex align-center"
                >
                  <span>{userFromList.username}</span>
                  <div className="ms-auto">
                    <Button
                      className="mx-2"
                      onClick={(event) => {
                        handleDeleteClick(event, userFromList.username);
                      }}
                    >
                      Delete friend
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            }
            return (
              <ListGroup.Item
                key={userFromList.username}
                className="flex align-center"
              >
                <span>{userFromList.username}</span>
                <div className="ms-auto">
                  <Button
                    className="mx-2"
                    onClick={(event) =>
                      handleAddClick(event, userFromList.username)
                    }
                  >
                    Add friend
                  </Button>
                </div>
              </ListGroup.Item>
            );
          })
        }
      </ListGroup>
    </div>
  );
};

export default Users;
