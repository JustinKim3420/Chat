import React, { useState, useEffect } from "react";

import { SEND_MESSAGE } from "../mutations";
import { useMutation } from "@apollo/client";

const Messages = ({ currentUser, focusedUser }) => {
  const [message, setMessage] = useState("");
  const [arrayOfMessages, setArrayOfMessages] = useState([]);

  const [sendMessage, sentMessage] = useMutation(SEND_MESSAGE, {
    onError: (error) => {
      console.log(error);
    },
  });
  console.log(sentMessage)

  const handleSendButtonClick = (event, message, friendUsername) => {
    event.preventDefault();
    sendMessage({ variables: { message, friendUsername } });
    setMessage("");
  };

  useEffect(() => {
    if (sentMessage.data) {
      console.log('sentMessage setarrayofmessagtes')
      console.log(sentMessage.data)
      setArrayOfMessages([...arrayOfMessages, sentMessage.data.sendMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentMessage.data]);

  useEffect(() => {
    if (currentUser.linked && focusedUser) {
      const linkedUser = currentUser.linked.find(
        (linkedUsers) => linkedUsers.user.username === focusedUser
      );
      if(linkedUser.messages){
        setArrayOfMessages(linkedUser.messages);
      }
    }
  }, [currentUser, focusedUser]);

  useEffect(() => {
    if (focusedUser.length > 0) {
      const chatElement = document.querySelector(".chat");
      chatElement.scrollTo(0, chatElement.scrollHeight);
    }
  }, [currentUser, focusedUser, arrayOfMessages]);

  if (!focusedUser.length > 0) {
    return (
      <div>
        Please select a friend to talk to. If you currently have no friends,
        like me. Please go to the users section to add a few.
      </div>
    );
  }

  return (
    <div className="full-height messages ps-3">
      <h4 className='message-header'>Messages with {focusedUser}</h4>
      <div className="chat">
        {arrayOfMessages.map((message) => {
          if (message.sentUser._id === currentUser._id) {
            return <div key={message._id} className="sent-message">{message.message}</div>;
          }
          return <div key={message._id} className="received-message">{message.message}</div>;
        })}
      </div>
      <div className="send-message-area">
        <textarea
          className="message-input"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          value={message}
        ></textarea>
        <button
          className="send-button"
          onClick={(event) => {
            handleSendButtonClick(event, message, focusedUser);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
