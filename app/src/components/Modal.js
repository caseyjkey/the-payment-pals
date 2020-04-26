import React, { useEffect, useState, useContext } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const drizzleContext = useContext(DrizzleContext.Context);
    const [nameDataKey] = useState(null);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        const ContractStore = drizzleContext.drizzleState.contracts.PaymentHub;

        // If a user is not mapped to a member, show them the welcome modal
        if (ContractStore.userToMember[nameDataKey] == null) {
            setModal(true);
        }

    }, [drizzleContext.drizzleState]);

    return (
        <div>
            <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Welcome To PaymentPals</ModalHeader>
                <ModalBody>
                    It looks like you are not a part of a group yet. Would you like to join or create a group?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Join Group</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Create Group</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;