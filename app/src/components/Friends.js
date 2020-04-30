import React, { useEffect, useState, useContext } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";

const Friends = (props) => {
  const drizzleContext = useContext(DrizzleContext.Context);

  const [numberOfFriendsDataKey, setNumberOfFriendsDataKey] = useState(null);
  const [FDKs, saveFDKs] = useState([]);
  const [friends, saveFriends] = useState([]);

  // Set initial state
  useEffect(() => {

  }, [drizzleContext.initialized]);

  return (
    <div>
      Friends
    </div>
  )
}