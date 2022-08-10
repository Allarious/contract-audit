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
    //"0x77e352f34178AfC444B0CB2aa1CF4a72d87c2392"
    console.log(uint64(bytes8(keccak256(abi.encodePacked("0x867BeC235CF95beeF8f1dFf907DB2BdcfC154869")))) ^ uint64(_gateKey));
    console.log(uint64(0) - 1);
    console.logBytes8(bytes8(uint64(bytes8(keccak256(abi.encodePacked("0x867BeC235CF95beeF8f1dFf907DB2BdcfC154869")))) ^ (uint64(0) - 1)));
    // console.log(uint64(bytes8(0x198fde8d32ec8b70)));
    require(uint64(bytes8(keccak256(abi.encodePacked("0x867BeC235CF95beeF8f1dFf907DB2BdcfC154869")))) ^ uint64(_gateKey) == uint64(0) - 1);
    console.log("End of Gate 3");
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    console.log(entrant);
    return true;
  }
}