// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

//Address 0xFc5ba1E455e6DEa67ea701c347d825C4DA410A7e
import "hardhat/console.sol";

contract GatekeeperTwo {

  address public entrant;

  modifier gateOne() {
    console.log("Start of Gate 1");
    require(msg.sender != tx.origin);
    console.log("End of Gate 1");
    _;
  }

  modifier gateTwo() {
    console.log("Start of Gate 2");
    uint x;
    assembly { x := extcodesize(caller()) }
    console.log("The size of the contract is: %s", x);
    require(x == 0);
    console.log("End of Gate 2");
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
    console.log("Start of Gate 3");
    require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == uint64(0) - 1);
    console.log("End of Gate 3");
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}