import React, { useEffect, useState, useContext } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Contract } from "web3-eth-contract";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

const WelcomeModal = ({ drizzle, drizzleState }) => {

    const drizzleContext = useContext(DrizzleContext.Context);
    const [modal, setModal] = useState(false);
    const [userMember, setUserMember] = useState(true);
    const account = drizzleContext.drizzleState.accounts[0];
    const [nameDataKey, setNameDataKey] = useState()
    const [name, setName] = useState('');

    const toggle = () => setModal(!modal);

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('A name was submitted: ' + name);
        //TODO: Update Users Name in Contract
    }

    const createGroup = () => {
        //TODO: Create a new group
        alert('Create a Group');
    }

    const joinGroup = () => {
        //TODO: Join a group
        alert('Join a Group');
    }

   useEffect(() => {
        if (drizzleContext.initialized) {
            const contract = drizzleContext.drizzle.contracts.PaymentHub;
            const nameDataKey = contract.methods["userToMember"].cacheCall(account);
            setNameDataKey(nameDataKey);
        }
    }, [drizzleContext.initialized]);

    useEffect(() => {
        const ContractStore = drizzleContext.drizzleState.contracts.PaymentHub;
        setModal(true);
        toggle();
        
        /* // If a user is not mapped to a member, show them the welcome modal
        if (!ContractStore.userToMember[nameDataKey]) {
            setUserMember(false);
            setModal(true);
        }
        else {
            setUserMember(true);
            setModal(false);*/
        
    }, [drizzleContext.drizzleState]);

    // To test this Modal, change the below 'userMember' to true
    if (true) { //testing only!
        return (
            <div>
                <Modal isOpen={true} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Welcome To PaymentPals</ModalHeader>
                    <ModalBody>
                        Please enter your name.
                        <p>
                            <strong>Stored Value: </strong>
                            <ContractData
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="PaymentHub"
                                method="string1"
                                toUtf8
                            />
                        </p>
                        It looks like you are not a part of a group yet. Would you like to join or create a group?
                </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={joinGroup}>Join Group</Button>{' '}
                        <Button color="secondary" onClick={createGroup}>Create Group</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    else {
        return (<div />);
    }
}

export default WelcomeModal;