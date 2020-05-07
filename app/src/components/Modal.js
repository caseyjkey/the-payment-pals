import React, { useEffect, useState, useContext } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Contract } from "web3-eth-contract";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

const WelcomeModal = ({ drizzle, drizzleState }) => {

    const drizzleContext = useContext(DrizzleContext.Context);
    const [modal, setModal] = useState(false);
    const account = drizzleContext.drizzleState.accounts[0];
    const [nameDataKey, setNameDataKey] = useState();

    const toggle = () => setModal(!modal);

    const createGroup = () => {
        //TODO: Create a new group
        alert('Create a Group');
    }

    const joinGroup = () => {
        //TODO: Join a group
        alert('Join a Group');
    }

    const ContractStore = drizzleContext.drizzleState.contracts.PaymentHub;
    const contract = drizzleContext.drizzle.contracts.PaymentHub;

    useEffect(() => {
        if (drizzleContext.initialized) {
            const nameDataKey = contract.methods["userToMember"].cacheCall(account);
            setNameDataKey(nameDataKey);
        }
    }, [drizzleContext.initialized]);

    useEffect(() => {
        // If a user is not mapped to a member, show them the welcome modal
        if (!ContractStore.userToMember[nameDataKey]) {
            setModal(true);
        }
        else {
            setModal(false);
        }
    }, [drizzleContext.drizzleState]);

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Welcome To PaymentPals</ModalHeader>
                <ModalBody>
                    <p><b>Please update your name.</b></p>
                    <strong>Name on file: </strong>
                    <ContractData
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="PaymentHub"
                        method="getName"
                    />
                    <ContractForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="PaymentHub"
                        method="setName"
                        labels={['Enter your name']}
                    />
                    <p>It looks like you are not a part of a group yet. <br />
                        Would you like to join or create a group?</p>
            </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={joinGroup}>Join Group</Button>{' '}
                    <Button color="secondary" onClick={createGroup}>Create Group</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default WelcomeModal;