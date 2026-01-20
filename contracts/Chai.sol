// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.2 <0.9.0;

contract chai{
    address payable owner;
    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;

    constructor(){
        owner=payable(msg.sender);
    }

    function buyChai(string memory name, string memory message) public payable {
        require(msg.value>0,"Please pay greater than 0 ether");
        (bool success, ) = owner.call{value: msg.value}("");  //send eth,do not call any function
        /*(bool success,bytes memory data)=receiver.call{value:msg.value}(
            abi.encodeWithSignature("f(uint)", 5)  //call function f with parameter as 5 and then return data

            //abi.encodeWithSignature() converts a function name + parameter types + values into low-level calldata that the EVM understands. So the EVM knows which function to run and with what arguments

            //better alternative:
            abi.encodeCall(Receiver.f, (5));

            //how to get decoded value from data
            uint value = abi.decode(data, (uint));

            //if function f does not return anything then in data there is nothing (data store returned value in bytes format)
        )*/
        require(success, "ETH transfer failed");

        memos.push(Memo(name,message,block.timestamp,msg.sender));
    }

    function getMemos() public view returns(Memo[] memory){
        return memos;
    }
}