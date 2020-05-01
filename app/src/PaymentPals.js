import React, { useState } from "react";
import Navigation from "./components/Navigation.js";
import AddFriend from "./components/AddFriend.js";

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
            <AddFriend drizzle={drizzle} groupId={0} userAddress={0xaB32fa021cb7e72d2155497eB4e9De67fe09e035}/>
        </div>
    );
};
