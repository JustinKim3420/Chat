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

  const handleSendButtonClick = (event, message, friendUsername) => {
    event.preventDefault();
    sendMessage({ variables: { message, friendUsername } });
  };

  useEffect(() => {
    if (currentUser.linked) {
      const messagesWithFocusedUser = currentUser.linked.find(
        (linkedUsers) => linkedUsers.user.username === focusedUser
      );
      setArrayOfMessages(messagesWithFocusedUser);
    }
  }, [currentUser, focusedUser]);

  useEffect(() => {
    if (focusedUser.length > 0) {
      const chatElement = document.querySelector(".chat");
      chatElement.scrollTo(0, chatElement.scrollHeight);
    }
  }, [focusedUser]);

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
      <h4>Messages with {focusedUser}</h4>
      <div className="chat">
        <div className="received-message">
          Maecenas magna turpis, interdum sed tristique pharetra, egestas in
          arcu. Quisque hendrerit, nisi vitae viverra luctus, nulla urna rhoncus
          tellus, non feugiat nibh metus ut velit. Nullam semper tellus sit amet
          egestas efficitur. Aliquam interdum pharetra semper. In at lacinia
          nisi. Etiam dapibus placerat leo sed dapibus.
        </div>
        <div className="sent-message">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lorem
          mi, egestas blandit urna at, pretium malesuada massa.
        </div>
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
