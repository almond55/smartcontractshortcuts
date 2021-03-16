pragma solidity ^0.5.0;

import "./BaseToken.sol";

contract Token is BaseToken {
    constructor () BaseToken("DApp Token", "DAPP", 18, 1000000) public {}
}