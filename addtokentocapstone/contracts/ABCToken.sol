pragma solidity ^0.5.0;

import "./BaseToken.sol";

contract ABCToken is BaseToken {
    constructor () BaseToken("Abject Before Coin", "ABC", 18, 1000000) public {}
}