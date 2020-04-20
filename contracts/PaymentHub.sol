pragma solidity >=0.4.21 <0.7.0;

contract PaymentHub {

    struct Member {
        string name;
        uint256 balance;
        address add;
    }

    struct Group {
        string name;
        Member[] friends;
        uint256 id;
    }

    Group[] groups; // The contract stores all groups, serves as a hub. Various groups will not interact with each other

    function createGroup (string memory _groupName, string memory _groupOwnerName) public {
        uint256 groupID = groups.length++; // Manually increase the groups array size
        groups[groupID].name = _groupName; // Manually set the group name
        groups[groupID].friends.push(Member(_groupOwnerName, 0, msg.sender)); // Add the first member, which is the creator
        groups[groupID].id = groupID;
    }

    //function addFriend

}
