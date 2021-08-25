import React from "react";

const FriendsList = ({ linkedUsers , setFocusedUser }) => {

  const handleFriendButtonClick = (event)=>{
    event.preventDefault()
    setFocusedUser()
  }

  return (
    <ul className=" friends-list full-height px-3">
      {linkedUsers.map((linkedUser) => {
        return (
          <li key={linkedUser.user.username} className="friend">
            <button className="btn-circle my-1" onClick={(event)=>{handleFriendButtonClick(event)}}>
              <span>{linkedUser.user.username.substring(0,3)}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default FriendsList;
