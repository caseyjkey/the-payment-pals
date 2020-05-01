import React, { useEffect, useState, useContext } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Container, Row, Col } from "reactstrap";
import Friend from './Friend.js';

export default ({ gid }) => {
  const drizzleContext = useContext(DrizzleContext.Context);

  const [friendDataKeys, setFriendDataKeys] = useState([]);
  const [GDK, setGDK] = useState(null);
  const [group, saveGroup] = useState(null);
  const [numFriendsDataKey, setNumFriendsDataKey] = useState(null);
  const [numFriends, setNumFriends] = useState(null);
  const [FDKs, saveFDKs] = useState([]);
  const [friends, saveFriends] = useState([]);

  const ContractStore = drizzleContext.drizzleState.contracts.PaymentHub;
  const contract = drizzleContext.drizzle.contracts.PaymentHub;

  // Set initial state
  useEffect(() => {
    if (drizzleContext.initialized) {
      setNumFriendsDataKey(contract.methods["numFriendsInGroup"].cacheCall(gid));
      setGDK(contract.methods["getGroupSize"].cacheCall());
    }
  }, [drizzleContext.initialized, gid]);

  // Get groupDataKey
  useEffect(() => {
    if (GDK && ContractStore.getGroupSize[GDK]) {
      console.log("Group", ContractStore.getGroupSize[GDK]);
    }
  }, [ContractStore.getGroup, GDK]);

  // Set numFriends once dataKey available
  useEffect(() => {
    if (numFriendsDataKey && ContractStore.numFriendsInGroup[numFriendsDataKey]) {
      setNumFriends(ContractStore.numFriendsInGroup[numFriendsDataKey].value);
    }
  }, [ContractStore.numFriendsInGroup, numFriendsDataKey]);

  // Get an array of keys for accessing each friend
  useEffect(() => {
    console.log(numFriends);
    if (numFriends) {
      for (let i = 0, FDKs = []; i < numFriends; i++) {
        FDKs.push(contract.methods["friendInGroup"].cacheCall(gid, i));
        setFriendDataKeys(FDKs);
      }
    }
  }, [numFriends]);

  // Add each friend to array of friends
  useEffect(() => {
    let friendsTemp = [];
    if (friendDataKeys.length > 0 && friendDataKeys.length == numFriends) {
      for (let friendDataKey of friendDataKeys) {
        let friend = ContractStore.friendInGroup[friendDataKey];
        if (friend && friend.value) {
          friendsTemp.push(friend.value);
        }
      }
      saveFriends(friendsTemp);
    }
  }, [gid, ContractStore.friendInGroup, friendDataKeys])


  return (
    <div>
      <h3>There are {numFriends} friends in this group.</h3>
      <Container>
        <Row xs="1" sm="2" lg="4">
          {friends && friends.map((friend, index) => {
            return (
              <Col key={index}>
                <Friend name={friend.name}
                        address={friend.addy}
                        balance={friend.balance}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}