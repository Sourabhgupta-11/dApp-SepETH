import hre from "hardhat";
import {ethers} from "ethers"

/*const provider= new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/e64830f85de44253a17bcb4e51cb189f`   //here it is rpc of sepolia network 
);
*/
const {ethers} =await hre.network.connect();


async function getbalance(address){
  const balance = await ethers.provider.getBalance(address);  //getBalance is property of ether
  return ethers.formatEther(balance);
}

async function consoleBalances(addresses){
    let cnt=1;
    for(const address of addresses){
        console.log(`Address ${cnt} balance:`, await getbalance(address))
        cnt++;
    }
}

async function consoleMemos(memos){
    for(const memo of memos){
        let name=memo.name;
        let msg=memo.message;
        let time=memo.timestamp;
        let from=memo.from;
        console.log(`At ${time}, name: ${name}, address: ${from}, message: ${msg}`);
    }
}
async function main() {
  const { ethers } = await hre.network.connect("localhost");  
  //ethers here is hardhat-wrapped ethers, it is already connected to hardhat network,knows about hardhat accounts 

  const chai = await ethers.getContractAt(
    "chai",                                        //contract name
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"  //when we deploy it shows contract address where it is deployed
  );

  const [owner,from1,from2] = await ethers.getSigners();  //here ethers had already hardhat accounts, from there it gets account
  //when we deploy to local development node- it gives us 20 accounts, owner is 1st account

  const addresses=[owner.address,from1.address,from2.address]
  console.log("Balances of accounts Before buying chai: ")
  await consoleBalances(addresses);

  const tx = await chai.connect(from1).buyChai("Sourabh","hello", {
  value: ethers.parseEther("2"),
  });
  await tx.wait();

  const tx2 = await chai.connect(from2).buyChai("Rishit","Yellow", {
  value: ethers.parseEther("5"),
  });
  await tx2.wait();

  console.log("Balances of accounts after buying chai: ")
  await consoleBalances(addresses);

  console.log("Memos:");
  const memos=await chai.getMemos();
  await consoleMemos(memos);

  //here i pass my public id that is in sepolia network so that the rpc(provider) look for that id in sepolia network to get balance of my account
  
  /*const balance=await provider.getBalance("0x6854406766C7C0769ed637A8c690Bf461C145E72")  
  const balanceEther=ethers.formatEther(balance);
  console.log("Account Balance",balanceEther)*/
}

await main();
