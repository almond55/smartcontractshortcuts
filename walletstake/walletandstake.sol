pragma solidity ^0.5.0;
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Golett {
    using SafeMath for uint256;

    mapping (address => uint256) public wallet;
    mapping (uint256 => _Package) public package;
    mapping (uint256 => address) public packageOwnership;
    mapping (uint256 => bool) public expiredPackage;
    
    uint256 public packageCount;
      
    struct _Package {
        uint256 id;
        string packageName;
        uint256 price;
        uint256 reward;
        uint256 timestamp;
    }
    
    event Create(address indexed user);
    event Deposit(address indexed user, uint256 amount, uint256 balance);
    event Withdrawal(address indexed user, uint256 amount, uint256 balance);
    event Transfer(address indexed sender, address indexed receiver, uint256 amount);
    event Package(
        uint256 id, 
        string packageName, 
        uint256 price, 
        uint256 reward,
        address user,
        uint256 timestamp
    );
    event Reward(
        uint256 id, 
        string packageName, 
        uint256 price, 
        uint256 reward,
        address user,
        uint256 timestamp
    );
    event Expire(
        uint256 id, 
        string packageName, 
        uint256 price, 
        uint256 reward,
        uint256 timestamp
    );
    event TransferPackage(
        uint256 id, 
        string packageName, 
        uint256 price, 
        uint256 reward,
        address owner,
        address newOwner,
        uint256 timestamp
    );

    function createWallet(uint256 _initial) public {
        address user = address(uint256(keccak256(abi.encode(now))));
        wallet[user] = _initial;
        emit Create(user);
    }

    function _addAmount(address _user, uint256 _amount) private {
        require(_user != address(0));
        wallet[_user] = wallet[_user].add(_amount);
        emit Deposit(_user, _amount, wallet[_user]);
    }

    function _removeAmount(address _user, uint256 _amount) private {
        require(_user != address(0));
        wallet[_user] = wallet[_user].sub(_amount);
        emit Withdrawal(_user, _amount, wallet[_user]);
    }

    function _transferAmount(address _sender, address _receiver, uint256 _amount) private {
        require(_sender != address(0));
        require(_receiver != address(0));
        wallet[_sender] = wallet[_sender].sub(_amount);
        wallet[_receiver] = wallet[_receiver].add(_amount);
        emit Transfer(_sender, _receiver, _amount);
    }

    function deposit(address _user, uint256 _amount) public returns (bool success) {
        _addAmount(_user, _amount);
        return true;
    }

    function withdraw(address _user, uint256 _amount) public returns (bool success) {
        require(wallet[_user] >= _amount);
        _removeAmount(_user, _amount);
        return true;
    }   

    function transfer(
        address _sender, address _receiver, uint256 _amount
    ) public returns (bool success) {
        require(wallet[_sender] >= _amount);
        _transferAmount(_sender, _receiver, _amount);
        return true;
    }

    function createPackage(
        address _user, string memory _packageName, uint256 _price, uint256 _reward
    ) public {
        require(withdraw(_user, _price));
        packageCount = packageCount.add(1);
        package[packageCount] = _Package(
            packageCount,
            _packageName,
            _price,
            _reward,
            now
        );
        packageOwnership[packageCount] = _user;

        emit Package(
            packageCount,
            _packageName,
            _price,
            _reward,
            _user,
            now
        );
    }

    function releaseReward(uint256 _id) public {
        require(_id > 0 && _id <= packageCount);
        require(!expiredPackage[_id]);
        _Package storage _package = package[_id];
        address user = packageOwnership[_id];
        deposit(user, _package.reward);

        emit Reward(
            _package.id,
            _package.packageName,           
            _package.price,
            _package.reward,
            user,
            now
        );
    }

    function packageExpire(uint256 _id) public {
        require(_id > 0 && _id <= packageCount);
        require(!expiredPackage[_id]);
        _Package storage _package = package[_id];
        expiredPackage[_package.id] = true;

        emit Expire(
            _package.id,
            _package.packageName,
            _package.price,
            _package.reward,
            now
        );
    }

    function transferPackage(uint256 _id, address _owner, address _newOwner) public {
        require(_id > 0 && _id <= packageCount);
        require(!expiredPackage[_id]);
        require(packageOwnership[_id] == _owner);
        packageOwnership[_id] = _newOwner;
        _Package storage _package = package[_id];

        emit TransferPackage(
            _package.id,
            _package.packageName,
            _package.price,
            _package.reward,
            _owner,
            _newOwner,
            now
        );

    }
}