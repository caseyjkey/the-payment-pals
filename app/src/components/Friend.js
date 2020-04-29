import Card from "react-bootstrap/Card";
import React from "react";

export default class Friend extends React.Component {
    render() {
        return <Card style={{ width: '18rem', height: '18rem' }}>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Text>Address: {this.props.address}</Card.Text>
            <Card.Text>Balance: {this.props.balance}</Card.Text>
        </Card>
    }
}