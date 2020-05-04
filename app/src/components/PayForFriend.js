import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default ({drizzle, drizzleState, friends, gid}) => {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [checkboxes, setCheckboxes] = useState([]) 
  const [amounts, setAmounts] = useState([])
  const [total, setTotal] = useState(null);

  const [stackId, setStackId] = useState(null);
  let state = drizzle.store.getState();

  useEffect(() => {
    if (friends) {
      setCheckboxes(friends.map(() => false));
    }
  }, [friends]);

  const toggleModal = () => setModal(!modal);
  
  const onClick = (event) => {
    let id = event.target.id;
    let addy = event.target.value;
    let newCheckboxes = [...checkboxes];
    newCheckboxes[id] = newCheckboxes[id] ? false : addy;
    setCheckboxes(newCheckboxes);
    updateAmounts();
  };

  const updateAmount = (event) => {
    let amount = event.target.value;
    let id = event.target.id;
    let newAmounts = [...amounts];
    newAmounts[id] = amount;
    setAmounts(newAmounts);
  }

  const updateAmounts = () => {
    let newAmounts = friends.map(() => 0);
    for (let i = 0; i < friends.length; i++) {
      if (checkboxes[i]) {
        newAmounts[i] = total / numChecked();
      }
    }
    setAmounts(newAmounts);
  }

  useEffect(() => {
    updateAmounts();
  }, [total, checkboxes])

  const onSubmit = async (event) => {
    let addresses = [];
    let amountsTemp = [];
    for (let i = 0; i < friends.length; i++) {
      if (checkboxes[i] !== false && amounts[i] != 0) {
        addresses.push(checkboxes[i]);
        amountsTemp.push(amounts[i]);
      }
    }

    try {
      setStackId(drizzle.contracts.PaymentHub.methods["transaction"]
                  .cacheSend(addresses, amountsTemp, gid));
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

  const numChecked = () => checkboxes.filter(x => x !== false).length;

  return (
    <div>
        <Button color="primary" onClick={toggleModal}>Pay for Friends</Button>
        <Modal
            isOpen={modal}
            toggle={toggleModal}>
            <ModalHeader>Pay for Friends</ModalHeader>
            <ModalBody>
                <form onSubmit={onSubmit}>
                    <label htmlFor="total" className="mr-2">Total amount:</label>
                    <input type="number"
                          step="0.01"
                          id="total"
                          defaultValue={total || 0}
                          onChange={(event) => setTotal(Number(event.target.value))}
                    />
                    {friends && friends.map((friend, index) => { 
                      return (
                        <div key={index}>
                            <input type="checkbox"
                                   id={index}
                                   name={"checkbox" + index}
                                   value={friend.addy}
                                   onClick={onClick}
                            />
                            <label>&nbsp;{friend.name}</label>
                            {checkboxes[index] &&
                              <input className="ml-2"
                                     type="number"
                                     id={index}
                                     name={"amount" + index}
                                     value={amounts[index]}
                                     min="0"
                                     max={total}
                                     onChange={updateAmount}
                                     step={0.01}
                                     readOnly
                              />
                            }
                        </div>
                      );
                    })}
                    
                    
                </form>
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