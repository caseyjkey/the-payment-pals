import React from "react";
import Navigation from "./components/Navigation.js";

export default ({ drizzle, drizzleState }) => {
    // destructure drizzle and drizzleState from props
    
    return (
        <div className="App">
            <div className="header">
                <h1>I'll Pay You Back Later</h1>
            </div>
            <Navigation 
                drizzle={drizzle}
                drizzleState={drizzleState}
            />
        </div>
    );
};
