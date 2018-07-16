pragma solidity ^0.4.23;

import "../erc/ERC20Interface.sol"
import "../erc/ERC223Interface.sol"
import "../erc/ERC223ReceivingContract.sol";
import "../lib/SafeMath.sol";



function allowance(address _owner, address _spender) public view returns (unit) {
return allowed[_owner][_spender]
}

function approve(address _spender, unit _value) public returns (bool){
allowed[msg.sender][_spender] = _value;
emit Approval(msg.sender, _spender, _value);
return true;
}

function balanceOf(address _owner) public view returns (uint) {
//lookup _owner in balances map and return value
return balances[_owner]
}

function transfer(address _to, uint _value) public returns (bool) {
require(_to != 0x0);
require(_to != address(this));

require(balances[msg.sender] >= _value);

uint codeLength 
bytes memory empty;

// this is the recommended way to check whethrt the _to is a contract or a address to asseble the code 

assembly{
//Retreive the size og the code on target address, this needs assembly.
codeLength := extcodesize(_to)
}

balances[msg.sender] = balances[msg.sender].sub(_value);
balances[_to] = balances[_to].add(_value);

if(codeLength > 0)
 // address was contract
            ERC223ReceivingContract receiver = ERC223ReceivingContract(_to);
            receiver.tokenFallback(msg.sender, _value, empty);
        }
        
        emit Transfer(msg.sender, _to, _value);

        return true; 
    }

    /// @notice Send `_value` tokens to `_to` from `msg.sender`.
    /// @dev transfer sender's tokens to a given address, return sucess. 
    /// @param _to Address of token receiver. 
    /// @param _value Number of token to transer. 
    /// @param _data Data to be sent to tokenFallback
    /// @return Returns success of function call.  
    function transfer(address _to, uint _value, bytes _data ) public returns (bool) {
          // ensure certain conditions are met
        require(_to != 0x0); 
        require(_to != address(this));
        require(balances[msg.sender] >= _value);

        uint codeLength;
        
        // The recommended way to check whether the _to is a contract or an address is 
        // to assemble the code of _to. If there is no code in _to, then this is an externally
        // owned address, otherwise it's a contract.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            // Retrieve the size of the code on target address, this needs assembly.
            codeLength := extcodesize(_to)
        }

        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
          
        if (codeLength > 0) {
            // address was contract
            ERC223ReceivingContract receiver = ERC223ReceivingContract(_to);
            receiver.tokenFallback(msg.sender, _value, _data);
        }
        
        emit Transfer(msg.sender, _to, _value, _data);

        return true;
    }

    /// @notice Transfer `_value` tokens from `_from` to `_to` if `msg.sender` is allowed.
    /// @dev Allows for an approved third party to transfer tokens from one
    /// address to another. Returns success.
    /// @param _from Address from where tokens are withdrawn.
    /// @param _to Address to where tokens are sent.
    /// @param _value Number of tokens to transfer.
    /// @return Returns success of function call
    function transferFrom(address _from, address _to, uint _value) public returns (bool) {
        require(_from != 0x0);
        require(_to != 0x0);
        require(_to != address(this));
        require(balances[_from] >= _value); 
        require(allowed[_from][msg.sender] >= _value);

        balances[_to] = balances[_to].add(_value);
        balances[_from] = balances[_from].sub(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);

        emit Transfer(_from, _to, _value);

        return true;
    }
}

