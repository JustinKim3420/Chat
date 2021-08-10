import React, { useEffect } from "react";

const Messages = () => {
  useEffect(() => {
      const chatElement = document.querySelector(".chat");
    chatElement.scrollTo(0, chatElement.scrollHeight);
  }, []);

  return (
    <div className="full-height messages ps-3">
      <div className="chat">
        <div className="received-message">
           Maecenas magna turpis, interdum sed tristique
          pharetra, egestas in arcu. Quisque hendrerit, nisi vitae viverra
          luctus, nulla urna rhoncus tellus, non feugiat nibh metus ut velit.
          Nullam semper tellus sit amet egestas efficitur. Aliquam interdum
          pharetra semper. In at lacinia nisi. Etiam dapibus placerat leo sed
          dapibus.
        </div>
        <div className="sent-message">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lorem
          mi, egestas blandit urna at, pretium malesuada massa. 
        </div>
      </div>
      <div className="send-message-area">
        <textarea className="message-input"></textarea>
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Messages;
