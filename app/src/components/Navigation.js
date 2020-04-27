import React, { useEffect, useState, useContext } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Contract } from "web3-eth-contract";
import { Navbar, NavbarBrand, NavbarToggler, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export default () => {

  const [toggle, setToggle] = useState(false);

  const drizzleContext = useContext(DrizzleContext.Context);
  const [groupsDataKey, setGroupsDataKey] = useState(null);
  const [groupSizeDataKey, setGroupSizeDataKey] = useState(null);
  const [groups, setGroups] = useState(null);
  const [nameDataKey, setNameDataKey] = useState(null);
  const [name, setName] = useState(null);
  const account = drizzleContext.drizzleState.accounts[0]; 

  const web3 = drizzleContext.drizzle.web3;

  useEffect(() => {
    if (drizzleContext.initialized) {
      const contract = drizzleContext.drizzle.contracts.PaymentHub;

      const groupsDataKey = contract.methods["userToGroups"].cacheCall(account, 0);
      setGroupsDataKey(groupsDataKey);

      const groupSizeDataKey = contract.methods["getNumUserGroups"].cacheCall(account);
      setGroupSizeDataKey(groupSizeDataKey);
    
      const nameDataKey = contract.methods["userToMember"].cacheCall(account);
      setNameDataKey(nameDataKey);
    }
  }, [drizzleContext.initialized]);

  useEffect(() => {
    const ContractStore = drizzleContext.drizzleState.contracts.PaymentHub;
    console.log("yo");
    console.log("aye", groupsDataKey);
    console.log(ContractStore.userToGroups[groupsDataKey]);
    // Use the saved 'dataKey' to get the return value from earlier.
    if (groupsDataKey) {
      console.log("before poop");
      setGroups(ContractStore.userToGroups[groupsDataKey].value);
      console.log("poop");
      console.log(groups);
    }
    if (nameDataKey && ContractStore.userToMember[nameDataKey]) {
      setName(ContractStore.userToMember[nameDataKey].value);
    }
  }, [drizzleContext.drizzleState]);

  console.log("outside");
  
  return (

    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{name && name.name}'s Group: {groups && groups.name}</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar className="clearfix">
              <DropdownToggle nav caret className="float-right">
                Groups
              </DropdownToggle>
              <DropdownMenu right>
                {groups && groups.map}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
      </Navbar>
      <h2>{name && name.name}'s Group: {groups && groups.name}</h2>
    </div>
  );
};