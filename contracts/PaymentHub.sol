pragma experimental ABIEncoderV2;

// Uncomment for console.log support
import "@nomiclabs/buidler/console.sol";


contract PaymentHub {

    // Mapping for finding a user's groups
    mapping (address => Group[]) public userToGroups;
    mapping (address => int256) public userToBalance;
    mapping (address => Member) public userToMember;

    Group[] public groups; // The contract stores all groups, serves as a hub. Various groups will not interact with each other

	string public memberName = string(userToMember[msg.sender].name);

    struct Member {
        string name;
        int balance;
        address addy;
		bool nameSet;
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
        createGroup("PaymentPals", "Creator");
        Member memory member = Member("Cofounder", 200, address(0x6A46eF78714f530e995369B03BB9F471583D114D), false);
        Member memory member2 = Member("Investor", 10000, address(0x2C10f237735e65e777D33348475000d9FAe0b7Dd), false);
        addFriend(member, 0);
        addFriend(member, 2); // For some reason PaymentPals is group 2, not 1?
        addFriend(member2, 2);
    }

	function getName() view external returns(string memory){
		Member memory member = userToMember[msg.sender];
		return member.name;
	}

	function setName(string memory _name) public {
		Member memory member = userToMember[msg.sender];
		member.name = _name;
		member.nameSet = true;
		userToMember[msg.sender] = member;
	}

    function createGroup(string memory _groupName, string memory _groupOwnerName) public returns(uint) {
        groups.length++;
        Group storage group = groups[groups.length - 1];
		
        Member memory member = Member(_groupOwnerName, 0, msg.sender, true);
		userToMember[msg.sender] = member;
        group.friends.push(member); // Add the first member, which is the creator

        group.name = _groupName; // Manually set the group name
        group.id = groups.length - 1;

        userToGroups[msg.sender].push(group);

        groups.push(group);
    }

    function getGroup(uint _gid) public view returns (uint) {
        return groups[_gid].id;
    }

    // Mainly for testing, can be removed later
    function getGroupSize() public view returns (uint) {
        return groups.length;
    }

    // Mainly for testing, can be removed later
    function friendInGroup(uint _gid, uint _fid) public view returns (Member memory) {
        return groups[_gid].friends[_fid];
    }

    // Mainly for testing, can be removed later
    function numFriendsInGroup(uint _gid) public view returns (uint) {
        return groups[_gid].friends.length;
    }

    function addFriend(Member memory _newFriend, uint _groupID) public {
        groups[_groupID].friends.push(_newFriend);
        userToMember[_newFriend.addy] = _newFriend;
    }

    function payFriend(address payable  _friend) external payable {
        _friend.transfer(msg.value);
        userToBalance[msg.sender] -= int(msg.value/1000000000000000000);
        userToBalance[_friend] += int(msg.value/1000000000000000000);
    }

    function getNumUserGroups(address _add) public view returns (uint){
        return userToGroups[_add].length;
    }

	function isNameSet() public view returns(bool){
		Member memory member = userToMember[msg.sender];
		return member.nameSet;
	}

    function updateMember(Member memory member, uint _gid) internal returns (bool) {
        for (uint i = 0; i < groups[_gid].friends.length; i++) {
            if(groups[_gid].friends[i].addy == member.addy) {
                groups[_gid].friends[i] = member;
                userToMember[member.addy] = member;
                return true;
            }
        }
        return false;
    }


    // consider renaming to payForFriends a
    function transaction(address[] memory _payedFor, int[] memory _amounts, uint _gid) public {
        int total = 0;
        Member memory member;
        for (uint i = 0; i < _payedFor.length; i++) {
            member = userToMember[_payedFor[i]];
            member.balance -= _amounts[i];
            updateMember(member, _gid);
            total += _amounts[i];
        }
        member = userToMember[msg.sender];
        member.balance += total;
        //console.log("Total being added to sender's balance", total);
        //console.log("Sender:", member.name, member.balance);
        bool result = updateMember(member, _gid);
        //console.log("Result of updating member", result);
    }

}
