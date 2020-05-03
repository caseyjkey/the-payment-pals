import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

export default ({drizzle, drizzleState, friends}) => {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [checkbox, setCheckbox] = useState(friends.map(() => false)) 

  const toggleModal = () => setModal(!modal);
  const toggleCheckbox = (index) => setCheckbox()
  
  const onClick = (event) => {
    let id = event.target.id;
    let newCheckbox = [...checkbox];
    newCheckbox[id] = !newCheckbox[id];
    setCheckbox(newCheckbox);
  };

  const onSubmit = () => {

  };

  return (
    <div>
        <Button color="primary" onClick={toggleModal}>Pay for Friends</Button>
        <Modal
            isOpen={modal}
            toggle={toggleModal}>
            <ModalHeader>Pay for Friends</ModalHeader>
            <ModalBody>
                <form onSubmit={onSubmit}>
                    {friends && friends.map((friend, index) => { 
                      return (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={index}
                                name={"friend" + index}
                                value={friend.addy}
                                onClick={onClick}
                            />
                            <label>&nbsp;{friend.name}</label>
                        </div>
                      );
                    })}
                    
                    <Button type="submit" 
                            onClick={onSubmit}
                            color="primary"
                    >
                      Submit
                    </Button>
                    <hr />
                    <h2>{message}</h2>
                </form>
            </ModalBody>
        </Modal>
    </div>
  ); 
};