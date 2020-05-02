pragma experimental ABIEncoderV2;

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
		
        Member memory member = Member(_groupOwnerName, 0, msg.sender, false);
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
    }

    function payFriend(address _friend, int _amt) public {
        userToBalance[msg.sender] -= _amt;
        userToBalance[_friend] += _amt;
    }

    function getNumUserGroups(address _add) public view returns (uint){
        return userToGroups[_add].length;
    }

	function isNameSet() public view returns(bool){
		Member memory member = userToMember[msg.sender];
		return member.nameSet;
	}


    // consider renaming to payForFriends
    function transaction(address _payer, address[] memory _payedFor, int[] memory _amounts, int _total) public {
        for (uint i = 0; i < _payedFor.length; i++) {
            userToBalance[_payedFor[i]] -= _amounts[i];
        }
        userToBalance[_payer] += _total; // We can take out having an input based total, and just keep a running total if we wish.
    }

}
