import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";

import { Menu } from "semantic-ui-react";

function mapStateToProps(state) {
    return {
    };
}

// This renders the navbar on the webpage

class NavBar extends Component {
    render() {
        return (
            <div>
                <div style={{ textAlign: "center" }}>
                    <h2>I'll Pay you Back Later</h2>
                </div>

                <Menu style={{ marginTop: "10px", backgroundColor: "Green", padding: "5px", display: "flex"}}>

                    <Menu.Item>
                        <Link to={{ pathname: "/correct path name here" }}>
                            <Button primary>Some Button</Button>
                        </Link>
                    </Menu.Item>

                    <Menu.Item>
                        <Link to={{ pathname: "/correct path name here" }}>
                            <Button primary>Another Button</Button>
                        </Link>
                    </Menu.Item>
                </Menu>

                <hr />

            </div>
        );
    }
}

export default connect(mapStateToProps)(NavBar);
