// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IdentityContract {
    struct Identity {
        string name;
        string email;
        bool isVerified;
    }

    mapping(address => Identity) public identities;

    function registerIdentity(string memory _name, string memory _email) public {
        identities[msg.sender] = Identity(_name, _email, false);
    }

    function verifyIdentity(address _user) public {
        identities[_user].isVerified = true;
    }

    function getIdentity(address _user) public view returns (Identity memory) {
        return identities[_user];
    }
}
