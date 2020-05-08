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
      //setSelectedFriend(friends[0].addy);
    }
    if (!modal) {
      setMessage(null);
    }
  }, [modal, friends]);

  const toggleModal = () => {
    setSelectedFriend(null);
    setModal(!modal);
  }
  
  const onClick = (event) => {
    let addy = event.target.value;
    console.log("Clicked ", addy);
    setSelectedFriend(addy ? addy : null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let weiValue = drizzle.web3.utils.toWei(total.toString(), 'ether');
    console.log(weiValue, "wei or ", total, "ether to ", selectedFriend);
    try {
      setStackId(drizzle.contracts.PaymentHub.methods["payFriend"]
                  .cacheSend(selectedFriend, gid, {from: drizzleState.accounts[0], 
                                                    value: weiValue,
                                                    to: selectedFriend}));
      
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
          <ModalHeader>Pay Friend</ModalHeader>
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
            <label htmlFor="friends" className="mr-2">Friend:</label>
            <select id="friends" 
                    name="friendlist" 
                    form="friendform"
                    onClick={onClick}
            >
              <option value="" selected disabled hidden>Choose a friend</option>
            {friends && friends.map((friend, index) => { 
              return (
                <option value={friend.addy} 
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
                    disabled={(selectedFriend === null)}
            >
              Submit
            </Button>
          </ModalFooter>
        </Modal>
    </div>
  ); 
};