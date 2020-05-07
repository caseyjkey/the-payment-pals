import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Navigation from "./components/Navigation.js";
import AddFriend from "./components/AddFriend.js";
import Friends from "./components/Friends.js";
import PayForFriend from "./components/PayForFriend.js";
import PayFriend from "./components/PayFriend.js";

export default ({ drizzle, drizzleState }) => {
    // destructure drizzle and drizzleState from props
    const [groupID, setGroupID] = useState(0);
    const [friends, saveFriends] = useState([]);

    // AddFriend changes the state, but this state change
    // Isn't reflcected in Friends, so monitor drizzleState,
    // In AddFriend and see what changes, then add that to the
    // Apppropriate Hook to trigger a reload of Friends

    return (
        <div className="App">
            <div className="header">
                <h1>I'll Pay You Back Later</h1>
            </div>
            <Navigation 
                drizzle={drizzle}
                drizzleState={drizzleState}
                gid={groupID}
                setGID={setGroupID}
            />
            <Container>
                <Row className="my-3 mx-3">
                    <Col>
                        <PayForFriend 
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            friends={friends}
                        />       
                    </Col>
                    <Col>
                        <AddFriend drizzle={drizzle} groupId={groupID}/>
                    </Col>
                    <Col>
                        <PayFriend 
                            drizzle={drizzle} 
                            drizzleState={drizzleState}
                            friends={friends}
                            gid={groupID}
                        />
                    </Col>
                </Row>
            </Container>
            <Friends 
                drizzle={drizzle}
                drizzleState={drizzleState}
                gid={groupID}
                friends={friends}
                saveFriends={saveFriends}
            />
        </div>
    );
};
