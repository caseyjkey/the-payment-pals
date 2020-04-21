pragma solidity >=0.4.21 <0.7.0;

contract ComplexStorage {
    mapping (address => Group) public userToGroup;

    Group[] public groupArray;
    Group public singleGroup;

    struct Group {
        string name;
        uint8 members;
    }

    constructor() public {
        address address1 = 0x5EE68F3BFa0b2cc8b1bED1e457F6825466dd6221;
        address address2 = 0xaee905FdD3ED851e48d22059575b9F4245A82B04;

        userToGroup[address1] = Group("Pay Pals", 4);
        userToGroup[address2] = Group("Hollowsesh", 3);
        singleGroup = Group("808 Mafia", 15);

        groupArray.push(userToGroup[address1]);
        groupArray.push(userToGroup[address2]);
    }
}
