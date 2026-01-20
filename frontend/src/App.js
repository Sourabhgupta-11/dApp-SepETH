import abi from "./contracts/chai.json"
import { useEffect, useState } from 'react';
import './App.css';
import { ethers } from "ethers";
import Buy from "./components/buy.js";
import Memos from "./components/memos.js";

function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
const [account, setAccount] = useState(null);

  useEffect(()=>{
    const connectWallet=async()=>{
      const contractAddress="0x9Bd524FCb8a31Ec4725D6969E378F42E367613c3";
      const contractAbi=abi.abi;
      try {
        if (!window.ethereum) {
          alert("MetaMask not installed");
          return;
        }

        await window.ethereum.request({  //force to connect to sepolia network
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }], // 11155111 in hex
        });

      
        const provider = new ethers.BrowserProvider(window.ethereum);  //MetaMask injects an Ethereum provider into the browser at window.ethereum
        await provider.send("eth_requestAccounts", []); 
        const signer=await provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        setAccount(address);
        setState({provider,signer,contract});
      } catch (error) {
        console.log(error);
      }
    }
    connectWallet()
  },[])

  return (
    <div className="app-bg">
    <div className="container py-4">
      <div className="wallet-bar">
        {account ? (
          <span>
            Connected:{" "}
            <code>
              {account.slice(0, 6)}...{account.slice(-4)}
            </code>
          </span>
        ) : (
          <span className="text-danger">No wallet connected</span>
        )}
      </div>

      <Buy state={state} />
      <Memos state={state} />
    </div>
  </div>
  );
}

export default App;
