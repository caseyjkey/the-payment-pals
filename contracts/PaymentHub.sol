pragma experimental ABIEncoderV2;

contract PaymentHub {

    // Mapping for finding a user's groups
    mapping (address => Group[]) public userToGroups;
    mapping (address => int256) public userToBalance;
    mapping (address => Member) public userToMember;

    Group[] public groups; // The contract stores all groups, serves as a hub. Various groups will not interact with each other

    struct Member {
        string name;
        int balance;
        address addy;
    }

    struct Group {
        string name;
        Member[] friends;
        uint256 id;
    }

    constructor() public {
        // This data structure found at
        // https://bit.ly/3azD3fx
        createGroup("PayPals", "Creator");
    }

    function createGroup(string memory _groupName, string memory _groupOwnerName) public returns(uint) {
        uint groupID = groups.length++; // Must be compiled below 0.6 to increase length this way // Manually increase the groups array size
        Group storage group = groups[groups.length - 1];

        Member memory member = Member(_groupOwnerName, 0, msg.sender);
        group.friends.push(member); // Add the first member, which is the creator

        group.name = _groupName; // Manually set the group name
        group.id = groupID;

        userToGroups[msg.sender].push(group);
        userToMember[msg.sender] = member;

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
    function getFriendsInGroup(uint _gid) public view returns (Member[] memory) {
        return groups[_gid].friends;
    }

    function addFriend(Member memory _newFriend, uint _groupID) public {
        groups[_groupID].friends.push(_newFriend);
    }

    function payFriend(address _friend, int _amt) public {
        userToBalance[msg.sender] -= _amt;
        userToBalance[_friend] += _amt;
    }

    function getNumUserGroups(address _add) public view returns (uint){
        return userToGroups[_add].length;
    }

}
