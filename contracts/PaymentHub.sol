pragma solidity >=0.4.21 <0.7.0;

contract PaymentHub {

    // Mapping for finding a user's groups
    mapping (address => Group[]) public userToGroups;
    mapping (address => int256) public userToBalance;
    Group[] public userGroups;

    Group[] groups; // The contract stores all groups, serves as a hub. Various groups will not interact with each other

    struct Member {
        string name;
        int balance;
        address addy;
    }

    struct Group {
        string name;
        address[] friends;
        uint256 id;
    }

    constructor() public {
        // Change address1 to be the first address in your truffle development environment
        address address1 = 0x5EE68F3BFa0b2cc8b1bED1e457F6825466dd6221;

        // This data structure found at
        // https://bit.ly/2xOjH8Y
        Group memory group = Group("Pay Pals", new address[](0), 0);
        groups.push(group);
        groups[groups.length-1].friends.push(address1);
        userGroups.push(groups[groups.length-1]);

        userToGroups[address1] = userGroups;
    }

    function createGroup(string memory _groupName) public returns(uint) {
        uint groupID = groups.length++; // Must be compiled below 0.6 to increase length this way // Manually increase the groups array size
        groups[groupID].name = _groupName; // Manually set the group name
        groups[groupID].friends.push(msg.sender); // Add the first member, which is the creator
        groups[groupID].id = groupID;

        return groupID;
    }

    // Mainly for testing, can be removed later
    function getGroupSize() public view returns(uint) {
        return groups.length;
    }

    // Mainly for testing, can be removed later
    function getGroupName(uint _gid) public view returns (string memory) {
        return groups[_gid].name;
    }

    // Mainly for testing, can be removed later
    function getFriendsInGroup(uint _gid) public view returns (address[] memory) {
        return groups[_gid].friends;
    }

    function addFriend(address _newFriend, uint _groupID) public {
        groups[_groupID].friends.push(_newFriend);
    }

    function payFriend(address _friend, int _amt) public payable {
        userToBalance[msg.sender] -= _amt;
        userToBalance[_friend] += _amt;
    }

}
