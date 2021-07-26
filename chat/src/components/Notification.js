import React from "react";
import { Alert } from "react-bootstrap";

const Notification = ({ message, variant }) => {

  if (message.length === 0) {
    return null;
  }

  return <Alert className='text-center' variant={variant}>{message}</Alert>;
};

export default Notification;
