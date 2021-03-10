pragma solidity ^0.5.0;

import "./Token.sol";

contract SmolToken is Token {
    constructor () Token("Your Token Name", "YTN", 18, 1000000) public {}
}
