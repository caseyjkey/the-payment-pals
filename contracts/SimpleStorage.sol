pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {

    event StorageSet(string _message);

    uint256 public storedData;
	string public data = "Test";

	function getData() view external returns(string memory){
		return data;
	}

	function setData(string calldata _data) external {
		data = _data;
	}

    function set(uint256 x) public {
        storedData = x;

        emit StorageSet("Data stored successfully!");
    }
}
