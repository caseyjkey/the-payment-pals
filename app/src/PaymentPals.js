import React, { useState } from "react";
import Navigation from "./components/Navigation.js";
import AddFriend from "./components/AddFriend.js";
import Friends from "./components/Friends.js";

export default ({ drizzle, drizzleState }) => {
    // destructure drizzle and drizzleState from props
    const [groupID, setGroupID] = useState(0);


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
            <h2>Current GID: {groupID}</h2>
            <AddFriend drizzle={drizzle} groupId={groupID}/>
            <Friends 
                drizzle={drizzle}
                drizzleState={drizzleState}
                gid={groupID}
            />
        </div>
    );
};
