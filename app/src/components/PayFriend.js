import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default ({drizzle, drizzleState, friends, gid}) => {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null) 
  const [total, setTotal] = useState(null);

  const [stackId, setStackId] = useState(null);
  let state = drizzle.store.getState();

  // Reset state on modal toggle
  useEffect(() => {
    if (friends[0]) {
      setSelectedFriend(friends[0].addy);
    }
    if (!modal) {
      setMessage(null);
    }
  }, [modal, friends]);

  const toggleModal = () => setModal(!modal);
  
  const onClick = (event) => {
    let addy = event.target.value;
    setSelectedFriend(addy);
  };

  const onSubmit = async (event) => {
    let weiValue = drizzle.web3.utils.toWei(total.toString(), 'ether');
    try {
      setStackId(drizzle.contracts.PaymentHub.methods["payFriend"]
                  .cacheSend(selectedFriend, gid), {value: weiValue});
    } catch (err) {
      setMessage("Transaction failure. Error: " + err);
    }
  };

  useEffect(() => {
    if (stackId !== null && state.transactionStack[stackId]) {
      const txHash = state.transactionStack[stackId]
      if(state.transactions[txHash]) {
        setMessage(state.transactions[txHash].status)
      }
    }
  }, [stackId, state.transactions]);


  return (
    <div>
        <Button color="primary" onClick={toggleModal}>Pay Friend</Button>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader>Pay for Friends</ModalHeader>
          <ModalBody>
            <form onSubmit={onSubmit}>
              <label htmlFor="total" className="mr-2">Amount to pay friend:</label>
              <input type="number"
                      step="0.01"
                      id="total"
                      defaultValue={total || 0}
                      onChange={(event) => setTotal(Number(event.target.value))}
              />
              Ether
            </form>
            <label htmlFor="friends">Choose a friend:</label>
            <select id="friends" name="friendlist" form="friendform">
            {friends && friends.map((friend, index) => { 
              return (
                <option value={friend.addy} 
                        onClick={onClick}
                        key={index}
                >
                  {friend.name}
                </option> 
              );
            })}
            </select>
          </ModalBody>
          <ModalFooter>
            <span className="mr-auto">Transaction status: {message}</span>
            <Button type="submit" 
                    onClick={onSubmit}
                    color="primary"
            >
              Submit
            </Button>
          </ModalFooter>
        </Modal>
    </div>
  ); 
};