import React from "react";
import { ListGroup, Button } from "react-bootstrap";

const Users = () => {
  const handleAddClick = (event) => {};

  return (
    <div className='container'>
      <ListGroup>
        <ListGroup.Item className='flex align-center'>
          <span>User1</span>
          <Button className="ms-auto">Add</Button>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Users;
