import React, { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";

import { ADD_FRIEND, DELETE_FRIEND } from "../mutations";
import { useMutation } from "@apollo/client";

const Users = ({ allUsers, user, setUser, notify }) => {
  const [linkedUsers, setLinkedUser] = useState([]);
  console.log(linkedUsers)
  console.log(user)

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


  //Updating the user by taking the current user's info and updating the linked key
  useEffect(() => {
    if (userAfterAdd.data) {
      const updatedLinkUser = {...user};
      updatedLinkUser.linked = userAfterAdd.data.addFriend.linked;
      setUser(updatedLinkUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAfterAdd.data]);

  useEffect(() => {
    if (userAfterDelete.data) {
      const updatedLinkUser = {...user};
      updatedLinkUser.linked = userAfterDelete.data.deleteFriend.linked;
      setUser(updatedLinkUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAfterDelete.data]);

  useEffect(() => {
    if (user.linked) {
        const linkedUsers = user.linked.map((linkedUser) => {
          return linkedUser.user.username;
        });
        setLinkedUser(linkedUsers);
    }
  }, [user.linked]);

  const handleAddClick = (event, friendUsername) => {
    event.preventDefault();
    addFriend({ variables: { friendUsername } });
  };

  const handleDeleteClick = (event, friendUsername) => {
    event.preventDefault();
    deleteFriend({ variables: { friendUsername } });
  };

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
