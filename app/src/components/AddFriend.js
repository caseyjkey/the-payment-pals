import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

export default class AddFriend extends Component {
    state = {
        modalOpen: false,
        name: "",
        address: 0,
        message: "",
        errorMessage: "",
        loading: false
    };

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    onSubmit = async event => {
        event.preventDefault();
        this.setState({
            loading: true,
            errorMessage: "",
            message: "Waiting for blockchain transaction to complete..."
        });
        try{
            // Change this to use stackId so it updates to show processing
            await this.props.drizzle.contracts.PaymentHub.methods["addFriend"]
                .cacheSend({ name: this.state.name, balance: 0, addy: this.state.address }, 
                           this.props.groupId, 
                           {gas: 140000}
                           );
            this.setState({
                loading: false,
                message: "New friend added!"
            });
        } catch(err) {
            console.log(err);
            this.setState({
                loading: false,
                errorMessage: err.message,
                message: "User rejected transaction or friend could not be added."
            });
        }
    };

    render() {
        return(
            <div>
                <Button color="primary" onClick={this.handleOpen}>Add friend</Button>
                <Modal
                    isOpen={this.state.modalOpen}
                    toggle={this.handleClose}>
                    <ModalHeader>Add a friend to the group</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <label>Friend name:</label>
                                <input
                                    placeholder={"Name"}
                                    onChange={event =>
                                        this.setState({ name: event.target.value })
                                    }/>
                            </div>
                            <div>
                            <label>Friend address:</label>
                            <input
                                placeholder={"Address"}
                                onChange={event =>
                                    this.setState({ address: event.target.value })
                                }/>
                            </div>
                            <Button type="submit" onClick={this.onSubmit}>Submit</Button>
                            <hr />
                            <h2>{this.state.message}</h2>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}