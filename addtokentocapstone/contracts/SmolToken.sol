pragma solidity ^0.5.0;

import "./BaseToken.sol";

contract SmolToken is BaseToken {
    constructor () BaseToken("James Workshop", "JWS", 18, 1000000) public {}
}