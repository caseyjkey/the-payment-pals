import React, { useEffect, useState, useContext } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Navbar, NavbarBrand, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export default ({gid, setGID}) => {

  const drizzleContext = useContext(DrizzleContext.Context);

  const [groupSizeDataKey, setGroupSizeDataKey] = useState(null);
  let groupDataKeys = [];
  const [GDKs, saveGDKs] = useState([]);
  let groupsTemp = {};
  const [groups, saveGroups] = useState({});

  const [nameDataKey, setNameDataKey] = useState(null);
  const [name, setName] = useState(null);
  const account = drizzleContext.drizzleState.accounts[0]; 

  const ContractStore = drizzleContext.drizzleState.contracts.PaymentHub;
  const contract = drizzleContext.drizzle.contracts.PaymentHub;

  // Get initial state
  useEffect(() => {
    if (drizzleContext.initialized) {
      setGroupSizeDataKey(contract.methods["getNumUserGroups"].cacheCall(account));
      setNameDataKey(contract.methods["userToMember"].cacheCall(account));
    }
  }, [drizzleContext.initialized]);

  // Get the name once datakey available 
  useEffect(() => {
    if (nameDataKey && ContractStore.userToMember[nameDataKey]) {
      setName(ContractStore.userToMember[nameDataKey].value);
    }
  }, [ContractStore.userToMember, nameDataKey]);

  // Get an array of keys for accessing each group for the current user
  useEffect(() => {
    if (ContractStore.getNumUserGroups[groupSizeDataKey]) {
      for(let i = 0; i < ContractStore.getNumUserGroups[groupSizeDataKey].value; i++) {
        let groupDataKey = contract.methods["userToGroups"].cacheCall(account, i);
        groupDataKeys.push(groupDataKey);
      } 
    }
    saveGDKs(groupDataKeys);
  }, [ContractStore.getNumUserGroups, groupSizeDataKey]);


  // Access each group and add to the list of groups
  useEffect(() => {
    if (GDKs.length > 0) {
      for (let groupDataKey of GDKs) {
        let group = ContractStore.userToGroups[groupDataKey];
        if (group) {
          group = group.value;
          groupsTemp[group.id] = group
          //groupsTemp.push(ContractStore.userToGroups[groupDataKey].value);
        } 
      }
    }
    saveGroups(groupsTemp);
  }, [ContractStore.userToGroups, GDKs]);


  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          {name && name.name}'s Group: {groups[gid] && groups[gid].name}
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown  nav>
            <DropdownToggle nav>
              Change Group
            </DropdownToggle>
            <DropdownMenu>
              { groups && 
                Object.keys(groups).map((currGid, index) => 
                  <DropdownItem active={parseInt(currGid) === gid} 
                                key={index} 
                                onClick={() => setGID(parseInt(currGid))}
                  >
                    {groups[currGid].name}
                  </DropdownItem> 
                )
              }
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    </div>
  );
};