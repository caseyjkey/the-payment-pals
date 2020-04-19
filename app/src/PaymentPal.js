import React, { Component } from "react";

// This is the Payment Pals "main page"

class PaymentPal extends Component {
    render() {
        const imgStyle = {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "10%"
        };

        return (
            <div>
                <br />
                <h2 style={{ color: "DarkGreen", textAlign: "center" }}>
                    {" "}
                    Welcome to the Payment Pals App.
                </h2>
                <br />
                <img src="static/images/PaymentPals.png" style={imgStyle} width="400px" alt="Payment Pals Blockchain Payment App" />
                <br /> <br />
                <p style={{ textAlign: "center" }}>
                    This blockchain payment app allows you to ...
                </p>
                <hr />
            </div>
        );
    }
}

export default PaymentPal;