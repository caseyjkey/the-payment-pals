pragma solidity >=0.4.21 <0.7.0;

contract PaymentHub {

    mapping (address => Group[]) public userToGroups;
    Group[] groups; // The contract stores all groups, serves as a hub. Various groups will not interact with each other

    struct Member {
        string name;
        uint256 balance;
        address addy;
    }

    struct Group {
        string name;
        Member[] friends;
        uint256 id;
    }

    constructor() public {
        // Change this to be the first address in your truffle development environment
        address address1 = 0x5EE68F3BFa0b2cc8b1bED1e457F6825466dd6221;
        address address2 = 0x6EE68F3BFa0b2cc8b1bED1e457F6825466dd6221;
        address address3 = 0x7EE68F3BFa0b2cc8b1bED1e457F6825466dd6221;

        // Can't have dynamic in-memory arrays
        Member[] friends = new Member[](10);
        friends.push(Member("Casey", 20, address1));
        groupArray.push(Group("Pay Pals", friends, 0));

        friends = new Member[](10);
        friends.push(Member("Casey", 20, address1));
        friends.push(Member("Adam", 30, address2));
        friends.push(Member("Brian", 50, address3));
        groupArray.push(Group("Green Team", friends, 1));
        
        userToGroups[address1] = groupArray;
    }

    function createGroup (string memory _groupName, string memory _groupOwnerName) public returns(uint) {
        uint groupID = groups.length++; // Manually increase the groups array size
        groups[groupID].name = _groupName; // Manually set the group name
        groups[groupID].friends.push(Member(_groupOwnerName, 0, msg.sender)); // Add the first member, which is the creator
        groups[groupID].id = groupID;

        return groupID;
    }

    //function addFriend

}
