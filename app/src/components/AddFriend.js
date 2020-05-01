import React, { Component } from "react";
import { Header, Button, Icon, Modal, Form, Message } from "semantic-ui-react";

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
            await this.props.drizzle.contracts.PaymentHub.methods["addFriend"]
                .cacheCall({ name: this.state.name, balance: 0, addy: this.state.address }, this.props.groupId);
            this.setState({
                loading: false,
                message: "New friend added!"
            });
        } catch(err) {
            this.setState({
                loading: false,
                errorMessage: err.message,
                message: "User rejected transaction or friend could not be added."
            });
        }
    };

    render() {
        return(
            <Modal
                trigger={
                    <Button primary onClick={this.handleOpen}>
                        Add friend
                    </Button>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}>
                <Header icon="browser" content="Add a friend to the group" />
                <Modal.Content>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label>Friend name</label>
                            <input
                                placeholder={"Name"}
                                onChange={event =>
                                    this.setState({ name: event.target.value })
                                }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Friend address</label>
                            <input
                                placeholder={"Address"}
                                onChange={event =>
                                    this.setState({ address: event.target.value })
                                }/>
                        </Form.Field>
                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <Button primary type="submit" loading={this.state.loading}>
                            <Icon name="check" />
                            Add friend
                        </Button>
                        <hr />
                        <h2>{this.state.message}</h2>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" onClick={this.handleClose} inverted>
                        <Icon name="cancel" /> Close
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}