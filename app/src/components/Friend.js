import {Card, CardTitle, CardText} from "reactstrap";
import React from "react";

export default class Friend extends React.Component {
    render() {
        return <Card style={{ width: '18rem', height: '18rem' }}>
            <CardTitle>{this.props.name}</CardTitle>
            <CardText>Address: {this.props.address}</CardText>
            <CardText>Balance: {this.props.balance}</CardText>
        </Card>
    }
}