pragma solidity >=0.4.21 <0.7.0;

contract ComplexStorage {
    mapping (address => Group[]) public userToGroups;

    Group[] public groupArray;
    Group public singleGroup;

    struct Group {
        string name;
        uint8 members;
    }

    constructor() public {
        address address1 = 0x5EE68F3BFa0b2cc8b1bED1e457F6825466dd6221;

        groupArray.push(Group("Pay Pals", 4));
        groupArray.push(Group("Green Team", 9));
        
        userToGroups[address1] = groupArray;
    }
}
